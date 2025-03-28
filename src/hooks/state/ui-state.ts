
import { StateCreator } from 'zustand';
import { AppState } from './types';

/**
 * مخزن حالة واجهة المستخدم
 * يحتوي على الوظائف المتعلقة بإدارة حالة الواجهة
 */
export const createUISlice: StateCreator<
  AppState,
  [],
  [],
  Pick<AppState, 'isSidebarOpen' | 'isSettingsOpen' | 'isSearchOpen' | 'activeSection' | 
    'lastVisitedPage' | 'toggleSidebar' | 'toggleSettings' | 'toggleSearch' | 'setActiveSection'>
> = (set) => ({
  // حالة الواجهة
  isSidebarOpen: true,
  isSettingsOpen: false,
  isSearchOpen: false,
  activeSection: null,
  lastVisitedPage: '/',
  
  // وظائف تعديل الحالة
  toggleSidebar: () => set(state => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleSettings: () => set(state => ({ isSettingsOpen: !state.isSettingsOpen })),
  toggleSearch: () => set(state => ({ isSearchOpen: !state.isSearchOpen })),
  setActiveSection: (section) => set({ activeSection: section }),
});
