import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUserLoggedStore from '../stores/useUserLoggedStore';
import useThemeStore from '../stores/useThemeStore';

const { width } = Dimensions.get('window');

const Splash = () => {
  const navigation = useNavigation();
  const login = useUserLoggedStore(state => state.login);
  const { theme, initializeTheme } = useThemeStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    initializeTheme();
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 2,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    const checkUserLogged = async () => {
      try {
        const dataFound = await AsyncStorage.getItem('userLogged');
        if (dataFound) {
          const data = JSON.parse(dataFound);
          const { token } = data;
          const user = data;
          delete user.token;
          login(user, token);
          setTimeout(() => {
            navigation.navigate('Main');
          }, 2000);
        } else {
          setTimeout(() => {
            navigation.navigate('Login');
          }, 2000);
        }
      } catch (error) {
        console.log('Erro ao ler dado');
      }
    };
    checkUserLogged();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={[styles.title, { color: theme.colors.primary }]}>Job</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Encontre seu próximo emprego
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Splash;
