import { Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import useThemeStore from '../../stores/useThemeStore';

const ThemeTransition = ({ children }) => {
  const { isTransitioning, isDarkMode } = useThemeStore();
  const backgroundColor = useRef(new Animated.Value(isDarkMode ? 1 : 0)).current;

  useEffect(() => {
    if (isTransitioning) {
      Animated.timing(backgroundColor, {
        toValue: isDarkMode ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isTransitioning, isDarkMode]);

  const interpolatedColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFFFFF', '#111827']
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: interpolatedColor,
        zIndex: 999,
      }}
    >
      {children}
    </Animated.View>
  );
};

export default ThemeTransition; 