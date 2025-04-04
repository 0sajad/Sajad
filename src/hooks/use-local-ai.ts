
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { pipeline, env } from '@huggingface/transformers';

// تعيين وضع التشغيل للذكاء الاصطناعي المحلي
env.useBrowserCache = true;
env.allowLocalModels = true;

type AIModel = {
  name: string;
  id: string;
  task: 'text-generation' | 'text-classification' | 'feature-extraction';
  size: 'small' | 'medium' | 'large';
  status: 'loaded' | 'loading' | 'error' | 'not-loaded';
};

type DeviceType = 'cpu' | 'webgl' | 'webgpu';

const LOCAL_MODELS_KEY = 'octa-network-local-ai-models';
const LOCAL_KNOWLEDGE_KEY = 'octa-network-local-ai-knowledge';

export function useLocalAI() {
  const { t } = useTranslation();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentModel, setCurrentModel] = useState<AIModel | null>(null);
  const [availableModels, setAvailableModels] = useState<AIModel[]>([]);
  const [localKnowledge, setLocalKnowledge] = useState<string[]>([]);
  const [textGenerationPipeline, setTextGenerationPipeline] = useState<any>(null);
  const [deviceType, setDeviceType] = useState<DeviceType>('cpu');

  // التحقق من قدرات الجهاز
  useEffect(() => {
    const checkDeviceCapabilities = async () => {
      try {
        // التحقق من دعم WebGPU
        if (typeof navigator !== 'undefined' && 'gpu' in navigator) {
          const adapter = await (navigator as any).gpu.requestAdapter();
          if (adapter) {
            setDeviceType('webgpu');
            console.log('Using WebGPU for AI models');
            return;
          }
        }
        
        // التحقق من دعم WebGL
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2');
        if (gl) {
          setDeviceType('webgl');
          console.log('Using WebGL for AI models');
          return;
        }
        
        // استخدام وحدة المعالجة المركزية كخيار أخير
        setDeviceType('cpu');
        console.log('Using CPU for AI models');
      } catch (error) {
        console.error('Error detecting device capabilities:', error);
        setDeviceType('cpu');
      }
    };
    
    checkDeviceCapabilities();
  }, []);

  // تحميل النماذج المحفوظة
  useEffect(() => {
    const loadSavedModels = () => {
      try {
        const savedModels = localStorage.getItem(LOCAL_MODELS_KEY);
        if (savedModels) {
          const parsedModels = JSON.parse(savedModels) as AIModel[];
          setAvailableModels(parsedModels);
          
          // تعيين النموذج الافتراضي
          const defaultModel = parsedModels.find(m => m.id === 'distilgpt2');
          if (defaultModel) {
            setCurrentModel(defaultModel);
          }
        } else {
          // تعيين النماذج الافتراضية
          const defaultModels: AIModel[] = [
            {
              name: 'DistilGPT2 (خفيف)',
              id: 'distilgpt2',
              task: 'text-generation',
              size: 'small',
              status: 'not-loaded'
            },
            {
              name: 'BART (متوسط)',
              id: 'facebook/bart-base',
              task: 'text-generation',
              size: 'medium',
              status: 'not-loaded'
            }
          ];
          setAvailableModels(defaultModels);
          setCurrentModel(defaultModels[0]);
          localStorage.setItem(LOCAL_MODELS_KEY, JSON.stringify(defaultModels));
        }
      } catch (error) {
        console.error('Error loading saved models:', error);
        toast.error(t('ai.loadingModelsError', 'خطأ في تحميل نماذج الذكاء الاصطناعي'));
      }
    };
    
    const loadLocalKnowledge = () => {
      try {
        const savedKnowledge = localStorage.getItem(LOCAL_KNOWLEDGE_KEY);
        if (savedKnowledge) {
          setLocalKnowledge(JSON.parse(savedKnowledge));
        }
      } catch (error) {
        console.error('Error loading local knowledge:', error);
      }
    };
    
    loadSavedModels();
    loadLocalKnowledge();
    setIsInitialized(true);
  }, [t]);

  // تحميل نموذج الذكاء الاصطناعي
  const loadModel = async (modelId: string) => {
    setIsProcessing(true);
    
    try {
      const model = availableModels.find(m => m.id === modelId);
      if (!model) {
        throw new Error(`Model ${modelId} not found`);
      }
      
      // تحديث حالة النموذج
      const updatedModels = availableModels.map(m => 
        m.id === modelId ? { ...m, status: 'loading' as const } : m
      );
      setAvailableModels(updatedModels);
      localStorage.setItem(LOCAL_MODELS_KEY, JSON.stringify(updatedModels));
      
      toast.info(t('ai.loadingModel', 'جاري تحميل نموذج الذكاء الاصطناعي...'));
      
      // تحميل النموذج مع التكيف مع نوع الجهاز
      const transformersDevice = deviceType === 'webgl' ? 'gpu' : deviceType;
      
      // حذفنا خيار quantized غير المدعوم واستخدمنا فقط device
      const generator = await pipeline(
        'text-generation',
        modelId,
        { device: transformersDevice }
      );
      
      setTextGenerationPipeline(generator);
      
      // تحديث حالة النموذج بعد التحميل
      const finalModels = availableModels.map(m => 
        m.id === modelId ? { ...m, status: 'loaded' as const } : m
      );
      setAvailableModels(finalModels);
      localStorage.setItem(LOCAL_MODELS_KEY, JSON.stringify(finalModels));
      
      setCurrentModel(finalModels.find(m => m.id === modelId) || null);
      
      toast.success(t('ai.modelLoaded', 'تم تحميل نموذج الذكاء الاصطناعي بنجاح'));
    } catch (error) {
      console.error('Error loading AI model:', error);
      
      // تحديث حالة النموذج في حالة الخطأ
      const errorModels = availableModels.map(m => 
        m.id === modelId ? { ...m, status: 'error' as const } : m
      );
      setAvailableModels(errorModels);
      localStorage.setItem(LOCAL_MODELS_KEY, JSON.stringify(errorModels));
      
      toast.error(t('ai.modelLoadError', 'خطأ في تحميل نموذج الذكاء الاصطناعي'));
    } finally {
      setIsProcessing(false);
    }
  };

  // إضافة معرفة محلية
  const addLocalKnowledge = (knowledge: string) => {
    const newKnowledge = [...localKnowledge, knowledge];
    setLocalKnowledge(newKnowledge);
    localStorage.setItem(LOCAL_KNOWLEDGE_KEY, JSON.stringify(newKnowledge));
  };

  // مسح المعرفة المحلية
  const clearLocalKnowledge = () => {
    setLocalKnowledge([]);
    localStorage.removeItem(LOCAL_KNOWLEDGE_KEY);
  };

  // توليد نص باستخدام الذكاء الاصطناعي
  const generateText = async (prompt: string, maxLength: number = 100) => {
    if (!textGenerationPipeline) {
      toast.error(t('ai.noModelLoaded', 'لم يتم تحميل نموذج الذكاء الاصطناعي'));
      return null;
    }
    
    setIsProcessing(true);
    
    try {
      // إضافة المعرفة المحلية إلى السياق
      let context = '';
      if (localKnowledge.length > 0) {
        context = localKnowledge.join('\n') + '\n\n';
      }
      
      // توليد النص
      const result = await textGenerationPipeline(context + prompt, {
        max_new_tokens: maxLength,
        temperature: 0.7,
        do_sample: true,
        top_k: 50,
        top_p: 0.95,
        early_stopping: true
      });
      
      return result[0].generated_text;
    } catch (error) {
      console.error('Error generating text:', error);
      toast.error(t('ai.textGenerationError', 'خطأ في توليد النص'));
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isInitialized,
    isProcessing,
    currentModel,
    availableModels,
    localKnowledge,
    deviceType,
    loadModel,
    addLocalKnowledge,
    clearLocalKnowledge,
    generateText
  };
}
