import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useThemeStore from '../../stores/useThemeStore';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme, theme } = useThemeStore();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={{
        padding: 8,
        borderRadius: 20,
        backgroundColor: theme.colors.surface,
      }}
    >
      <Ionicons
        name={isDarkMode ? 'sunny-outline' : 'moon-outline'}
        size={24}
        color={theme.colors.primary}
      />
    </TouchableOpacity>
  );
};

export default ThemeToggle; 