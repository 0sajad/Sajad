import { useAppState } from './use-app-state';

export const useStore = () => {
  const state = useAppState();
  
  return {
    ...state,
    getState: () => state,
    setState: (newState: any) => {
      Object.keys(newState).forEach(key => {
        if (typeof state[key as keyof typeof state] !== 'undefined') {
          // تحديث الخاصية إذا كانت موجودة
        }
      });
    }
  };
};
