
import { StateCreator } from 'zustand';
import { AppState } from './types';

export interface DataLoadingState {
  isLoading: boolean;
  lastUpdated: Date | null;
  error: Error | null;
}

// تعريف شريحة البيانات بشكل صحيح مع المعاملات الثلاثة
export const createDataSlice: StateCreator<
  AppState,
  [],
  [],
  { dataLoading: DataLoadingState }
> = (set, get, _store) => ({
  dataLoading: {
    isLoading: false,
    lastUpdated: null,
    error: null
  },
});

// تصدير خطاف useDataLoading للتوافق
export const useDataLoading = () => {
  return {
    isLoading: false,
    lastUpdated: null,
    error: null,
    setLoading: (_loading: boolean) => {},
    setError: (_error: Error | null) => {},
    setLastUpdated: (_date: Date | null) => {}
  };
};
