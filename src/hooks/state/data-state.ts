
import { StateCreator } from 'zustand';
import { AppState } from './types';

export interface DataLoadingState {
  isLoading: boolean;
  lastUpdated: Date | null;
  error: string | null;
}

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

// Export the useDataLoading hook for compatibility
export const useDataLoading = () => {
  return {
    isLoading: false,
    lastUpdated: null,
    error: null,
    setLoading: (_loading: boolean) => {},
    setError: (_error: string | null) => {},
    setLastUpdated: (_date: Date | null) => {}
  };
};
