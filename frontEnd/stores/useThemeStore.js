import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from '../theme/theme';

const useThemeStore = create((set) => ({
  isDarkMode: false,
  theme: lightTheme,
  isTransitioning: false,
  toggleTheme: async () => {
    // Inicia a transição
    set({ isTransitioning: true });
    
    // Muda o tema imediatamente
    set((state) => {
      const newIsDarkMode = !state.isDarkMode;
      AsyncStorage.setItem('isDarkMode', JSON.stringify(newIsDarkMode));
      return {
        isDarkMode: newIsDarkMode,
        theme: newIsDarkMode ? darkTheme : lightTheme,
      };
    });

    // Espera a animação completar
    await new Promise(resolve => setTimeout(resolve, 300));
    set({ isTransitioning: false });
  },
  initializeTheme: async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('isDarkMode');
      const isDarkMode = savedTheme ? JSON.parse(savedTheme) : false;
      set({
        isDarkMode,
        theme: isDarkMode ? darkTheme : lightTheme,
        isTransitioning: false,
      });
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  },
}));

export default useThemeStore; 