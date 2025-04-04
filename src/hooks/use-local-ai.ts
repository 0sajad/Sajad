
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

interface UserInteraction {
  query: string;
  response: string;
  timestamp: Date;
  feedback?: 'positive' | 'negative' | null;
}

const LOCAL_MODELS_KEY = 'octa-network-local-ai-models';
const LOCAL_KNOWLEDGE_KEY = 'octa-network-local-ai-knowledge';
const USER_INTERACTIONS_KEY = 'octa-network-user-interactions';
const LEARNING_PATTERNS_KEY = 'octa-network-learning-patterns';

export function useLocalAI() {
  const { t } = useTranslation();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentModel, setCurrentModel] = useState<AIModel | null>(null);
  const [availableModels, setAvailableModels] = useState<AIModel[]>([]);
  const [localKnowledge, setLocalKnowledge] = useState<string[]>([]);
  const [textGenerationPipeline, setTextGenerationPipeline] = useState<any>(null);
  const [deviceType, setDeviceType] = useState<DeviceType>('cpu');
  const [userInteractions, setUserInteractions] = useState<UserInteraction[]>([]);
  const [learningPatterns, setLearningPatterns] = useState<Record<string, string[]>>({});
  const [isSelfLearningEnabled, setIsSelfLearningEnabled] = useState(true);

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

  // تحميل البيانات المحفوظة
  useEffect(() => {
    const loadSavedData = () => {
      try {
        // تحميل النماذج
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
        
        // تحميل المعرفة المحلية
        const savedKnowledge = localStorage.getItem(LOCAL_KNOWLEDGE_KEY);
        if (savedKnowledge) {
          setLocalKnowledge(JSON.parse(savedKnowledge));
        }
        
        // تحميل تفاعلات المستخدم
        const savedInteractions = localStorage.getItem(USER_INTERACTIONS_KEY);
        if (savedInteractions) {
          const parsedInteractions = JSON.parse(savedInteractions) as UserInteraction[];
          // تحويل النصوص إلى كائنات Date
          const interactions = parsedInteractions.map(interaction => ({
            ...interaction,
            timestamp: new Date(interaction.timestamp)
          }));
          setUserInteractions(interactions);
        }
        
        // تحميل أنماط التعلم
        const savedPatterns = localStorage.getItem(LEARNING_PATTERNS_KEY);
        if (savedPatterns) {
          setLearningPatterns(JSON.parse(savedPatterns));
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
        toast.error(t('ai.loadingDataError', 'خطأ في تحميل بيانات الذكاء الاصطناعي'));
      }
      
      setIsInitialized(true);
    };
    
    loadSavedData();
  }, [t]);

  // حفظ تفاعلات المستخدم وأنماط التعلم عند تغييرها
  useEffect(() => {
    if (userInteractions.length > 0) {
      localStorage.setItem(USER_INTERACTIONS_KEY, JSON.stringify(userInteractions));
    }
  }, [userInteractions]);

  useEffect(() => {
    if (Object.keys(learningPatterns).length > 0) {
      localStorage.setItem(LEARNING_PATTERNS_KEY, JSON.stringify(learningPatterns));
    }
  }, [learningPatterns]);

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

  // إضافة تفاعل مستخدم جديد
  const addUserInteraction = (query: string, response: string) => {
    if (!isSelfLearningEnabled) return;
    
    const newInteraction: UserInteraction = {
      query,
      response,
      timestamp: new Date(),
      feedback: null
    };
    
    setUserInteractions(prev => {
      // الحفاظ على آخر 100 تفاعل فقط لتجنب استهلاك الذاكرة
      const updated = [newInteraction, ...prev].slice(0, 100);
      localStorage.setItem(USER_INTERACTIONS_KEY, JSON.stringify(updated));
      return updated;
    });
    
    // تحليل التفاعل وتحديث أنماط التعلم
    analyzeAndLearnFromInteraction(query, response);
  };

  // إضافة ردود فعل المستخدم على الاستجابات
  const addFeedback = (interactionIndex: number, feedback: 'positive' | 'negative') => {
    if (!isSelfLearningEnabled) return;
    
    setUserInteractions(prev => {
      if (interactionIndex < 0 || interactionIndex >= prev.length) return prev;
      
      const updated = [...prev];
      updated[interactionIndex] = { ...updated[interactionIndex], feedback };
      localStorage.setItem(USER_INTERACTIONS_KEY, JSON.stringify(updated));
      
      // التعلم من التغذية الراجعة
      learnFromFeedback(updated[interactionIndex], feedback);
      
      return updated;
    });
  };

  // تحليل التفاعل والتعلم منه
  const analyzeAndLearnFromInteraction = (query: string, response: string) => {
    if (!isSelfLearningEnabled) return;
    
    try {
      // استخراج الكلمات المفتاحية من السؤال (مثال بسيط)
      const keywords = extractKeywords(query);
      
      // تحديث أنماط التعلم باستخدام الكلمات المفتاحية
      setLearningPatterns(prev => {
        const updated = { ...prev };
        
        keywords.forEach(keyword => {
          if (!updated[keyword]) {
            updated[keyword] = [];
          }
          
          // إضافة الإجابة إلى نمط التعلم إذا لم تكن موجودة بالفعل
          if (!updated[keyword].includes(response)) {
            updated[keyword] = [...updated[keyword], response].slice(0, 5); // الاحتفاظ بأحدث 5 إجابات
          }
        });
        
        localStorage.setItem(LEARNING_PATTERNS_KEY, JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error('Error while learning from interaction:', error);
    }
  };

  // التعلم من التغذية الراجعة
  const learnFromFeedback = (interaction: UserInteraction, feedback: 'positive' | 'negative') => {
    if (!isSelfLearningEnabled) return;
    
    try {
      const keywords = extractKeywords(interaction.query);
      
      if (feedback === 'positive') {
        // تعزيز هذه الإجابة لأسئلة مماثلة
        addLocalKnowledge(`سؤال: ${interaction.query}\nإجابة مفضلة: ${interaction.response}`);
      } else {
        // إزالة هذه الإجابة من أنماط التعلم للكلمات المفتاحية المرتبطة
        setLearningPatterns(prev => {
          const updated = { ...prev };
          
          keywords.forEach(keyword => {
            if (updated[keyword]) {
              updated[keyword] = updated[keyword].filter(r => r !== interaction.response);
            }
          });
          
          localStorage.setItem(LEARNING_PATTERNS_KEY, JSON.stringify(updated));
          return updated;
        });
      }
    } catch (error) {
      console.error('Error while learning from feedback:', error);
    }
  };

  // استخراج الكلمات المفتاحية من النص
  const extractKeywords = (text: string): string[] => {
    // تنظيف النص وتقسيمه إلى كلمات
    const words = text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]/gu, '')
      .split(/\s+/)
      .filter(word => word.length > 3); // تجاهل الكلمات القصيرة
    
    // إزالة الكلمات المتكررة
    return [...new Set(words)];
  };

  // البحث عن استجابات مشابهة من التفاعلات السابقة
  const findSimilarResponses = (query: string): string[] => {
    if (!isSelfLearningEnabled || Object.keys(learningPatterns).length === 0) {
      return [];
    }
    
    try {
      const keywords = extractKeywords(query);
      const matchingResponses: string[] = [];
      
      // جمع الاستجابات المرتبطة بالكلمات المفتاحية
      keywords.forEach(keyword => {
        if (learningPatterns[keyword]) {
          matchingResponses.push(...learningPatterns[keyword]);
        }
      });
      
      // إزالة التكرارات والاحتفاظ بأكثر 3 استجابات صلة
      return [...new Set(matchingResponses)].slice(0, 3);
    } catch (error) {
      console.error('Error finding similar responses:', error);
      return [];
    }
  };

  // تمكين أو تعطيل التعلم الذاتي
  const toggleSelfLearning = (enabled: boolean) => {
    setIsSelfLearningEnabled(enabled);
    localStorage.setItem('octa-network-self-learning-enabled', JSON.stringify(enabled));
  };

  // توليد نص باستخدام الذكاء الاصطناعي
  const generateText = async (prompt: string, maxLength: number = 100) => {
    if (!textGenerationPipeline) {
      toast.error(t('ai.noModelLoaded', 'لم يتم تحميل نموذج الذكاء الاصطناعي'));
      return null;
    }
    
    setIsProcessing(true);
    
    try {
      // البحث عن استجابات مشابهة من التفاعلات السابقة
      const similarResponses = findSimilarResponses(prompt);
      
      // إضافة المعرفة المحلية والاستجابات المشابهة إلى السياق
      let context = '';
      
      if (localKnowledge.length > 0) {
        context += localKnowledge.join('\n') + '\n\n';
      }
      
      if (similarResponses.length > 0) {
        context += 'استجابات مشابهة:\n' + similarResponses.join('\n') + '\n\n';
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
      
      const generatedText = result[0].generated_text;
      
      // حفظ التفاعل للتعلم منه
      addUserInteraction(prompt, generatedText.replace(context + prompt, '').trim());
      
      return generatedText;
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
    userInteractions,
    isSelfLearningEnabled,
    loadModel,
    addLocalKnowledge,
    clearLocalKnowledge,
    generateText,
    addFeedback,
    toggleSelfLearning
  };
}
