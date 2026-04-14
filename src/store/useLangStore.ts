import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LangStore {
  lang: 'id' | 'en';
  setLang: (lang: 'id' | 'en') => void;
}

export const useLangStore = create<LangStore>()(
  persist(
    (set) => ({
      lang: 'id',
      setLang: (lang) => set({ lang }),
    }),
    { name: 'lang-storage' }
  )
);
