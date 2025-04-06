
import { ModeFeatures } from "./types";
import { useToast } from "@/components/ui/use-toast";

export async function checkForSyncUpdates(
  binId: string | null,
  isSyncing: boolean,
  setIsSyncing: (value: boolean) => void,
  toast: ReturnType<typeof useToast>["toast"],
  setFeatures: (features: ModeFeatures) => void,
  setLastSyncTime: (time: Date) => void
): Promise<boolean> {
  if (isSyncing || !binId) return false;
  
  setIsSyncing(true);
  try {
    // محاولة الوصول إلى المزامنة عبر JSONBin.io العام
    const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error("فشل في الوصول إلى بيانات المزامنة");
    }
    
    const data = await response.json();
    
    // التحقق من وجود تحديثات
    const serverTimestamp = data.metadata?.createdAt || '';
    const localTimestamp = localStorage.getItem("octa-sync-timestamp") || '';
    
    if (serverTimestamp > localTimestamp) {
      // تطبيق التحديثات إذا كانت جديدة
      if (data.record && data.record.features) {
        setFeatures(data.record.features);
        localStorage.setItem("octa-sync-config", JSON.stringify(data.record));
        localStorage.setItem("octa-sync-timestamp", serverTimestamp);
        localStorage.setItem("octa-last-sync-time", new Date().toLocaleString());
        setLastSyncTime(new Date());
        
        toast({
          title: "تم تحديث التكوين",
          description: "تم تطبيق أحدث الإعدادات من المزامنة",
        });
        
        setIsSyncing(false);
        return true;
      }
    }
    
    setIsSyncing(false);
    return false;
  } catch (error) {
    console.error("خطأ في التحقق من التحديثات:", error);
    setIsSyncing(false);
    return false;
  }
}
