
import { StateCreator } from 'zustand';
import { AppState, UIState } from './types';

/**
 * مخزن حالة واجهة المستخدم
 * يحتوي على الوظائف المتعلقة بدرج التنقل والصفحات النشطة والنوافذ المنبثقة
 */
export const createUISlice: StateCreator<
  AppState,
  [],
  [],
  UIState
> = (set) => ({
  // حالة واجهة المستخدم
  isDrawerOpen: false,
  activePage: 'home',
  lastVisitedPage: null,
  modals: {},
  
  // وظائف تعديل الحالة
  setDrawerOpen: (isOpen) => set({ isDrawerOpen: isOpen }),
  
  setActivePage: (page) => set(state => {
    // حفظ الصفحة السابقة قبل التغيير
    const lastVisitedPage = state.activePage;
    return {
      activePage: page,
      lastVisitedPage
    };
  }),
  
  setLastVisitedPage: (page) => set({ lastVisitedPage: page }),
  
  openModal: (modalId) => set(state => ({
    modals: {
      ...state.modals,
      [modalId]: true
    }
  })),
  
  closeModal: (modalId) => set(state => ({
    modals: {
      ...state.modals,
      [modalId]: false
    }
  })),
});
