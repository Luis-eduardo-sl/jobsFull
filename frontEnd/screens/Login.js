import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUserLoggedStore from '../stores/useUserLoggedStore';
import useThemeStore from '../stores/useThemeStore';
import { Ionicons } from '@expo/vector-icons';
import ThemeToggle from '../components/ui/ThemeToggle';

const Login = () => {
  const [txtEmail, setTxtEmail] = useState('');
  const [txtPass, setTxtPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const login = useUserLoggedStore(state => state.login);
  const { theme } = useThemeStore();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3333/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: txtEmail, pass: txtPass })
      });

      if (response?.ok) {
        const data = await response.json();
        try {
          await AsyncStorage.setItem('userLogged', JSON.stringify({ ...data.user, token: data.token }));
          login(data.user, data.token);
          navigation.navigate('Main');
        } catch (error) {
          console.log(error);
          alert('Erro ao gravar dados de login no dispositivo!');
        }
      } else {
        const data = await response.json();
        console.log(data);
        alert(data?.error ? data.error : "Erro ao logar!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.headerRight}>
        <ThemeToggle />
      </View>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.primary }]}>Job</Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Encontre seu próximo emprego
          </Text>
        </View>

        <View style={styles.form}>
          <View style={[styles.inputContainer, { backgroundColor: theme.colors.surface }]}>
            <Ionicons name="mail-outline" size={20} color={theme.colors.textSecondary} />
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              placeholder="Email"
              placeholderTextColor={theme.colors.textSecondary}
              onChangeText={setTxtEmail}
              value={txtEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={[styles.inputContainer, { backgroundColor: theme.colors.surface }]}>
            <Ionicons name="lock-closed-outline" size={20} color={theme.colors.textSecondary} />
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              placeholder="Senha"
              placeholderTextColor={theme.colors.textSecondary}
              onChangeText={setTxtPass}
              value={txtPass}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons 
                name={showPassword ? "eye-off-outline" : "eye-outline"} 
                size={20} 
                color={theme.colors.textSecondary} 
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: theme.colors.primary }]}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={[styles.registerText, { color: theme.colors.textSecondary }]}>
              Não tem uma conta?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Cadastrar')}>
              <Text style={[styles.registerLink, { color: theme.colors.primary }]}>
                Cadastre-se
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 12,
    height: 56,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  loginButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 4,
  },
  registerText: {
    fontSize: 14,
  },
  registerLink: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  headerRight: {
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 1,
  },
});

export default Login;
