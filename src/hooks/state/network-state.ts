
import { StateCreator } from 'zustand';
import { AppState, NetworkState } from './types';

/**
 * مخزن حالة الشبكة
 * يحتوي على الوظائف المتعلقة بإدارة حالة الاتصال بالإنترنت
 */
export const createNetworkSlice: StateCreator<
  AppState,
  [],
  [],
  NetworkState
> = (set, get) => ({
  // حالة الشبكة
  isConnected: true,
  isOnline: true,
  lastCheck: null,
  
  networkStatus: {
    isConnected: true,
    isOnline: true,
    lastCheck: null
  },
  
  dataLoading: {
    isLoading: false,
    lastUpdated: null,
    error: null
  },
  
  // التحقق من حالة الشبكة
  checkNetworkStatus: async () => {
    try {
      // محاولة الاتصال بخدمة Google لاختبار الاتصال
      const response = await fetch('https://www.google.com/generate_204', {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-store',
      });
      
      // التحقق من وجود استجابة
      const isOnline = response.type === 'opaque' || response.ok;
      
      // تحديث حالة الشبكة
      set({
        isConnected: true,
        isOnline,
        lastCheck: new Date(),
        networkStatus: {
          isConnected: true,
          isOnline,
          lastCheck: new Date()
        }
      });
      
      return isOnline;
    } catch (error) {
      // إدارة حالة عدم الاتصال
      set({
        isConnected: false,
        isOnline: false,
        lastCheck: new Date(),
        networkStatus: {
          isConnected: false,
          isOnline: false,
          lastCheck: new Date()
        }
      });
      
      return false;
    }
  },
  
  // تحديث حالة الشبكة
  setNetworkStatus: (status) => set({
    isConnected: status.isConnected,
    isOnline: status.isOnline,
    lastCheck: new Date(),
    networkStatus: {
      ...get().networkStatus,
      ...status,
      lastCheck: new Date()
    }
  }),
  
  // معالجة حالة عدم الاتصال
  handleOfflineStatus: () => {
    set({
      isConnected: false,
      isOnline: false,
      networkStatus: {
        ...get().networkStatus,
        isConnected: false,
        isOnline: false
      }
    });
    
    // يمكن إضافة منطق إضافي هنا مثل إظهار إشعارات للمستخدم
  },
  
  // معالجة حالة الاتصال
  handleOnlineStatus: () => {
    set({
      isConnected: true,
      isOnline: true,
      networkStatus: {
        ...get().networkStatus,
        isConnected: true,
        isOnline: true
      }
    });
    
    // إعادة تحميل البيانات عند إعادة الاتصال مثلاً
  }
});
