import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Octicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import useThemeStore from './stores/useThemeStore';
import ThemeTransition from './components/ui/ThemeTransition';
import ListJob from './screens/ListJob'
import Cadastrar from './screens/Cadastrar'
import Perfil from './screens/Perfil.js'
import Splash from './screens/Splash.js'
import Login from './screens/Login.js'
import CadastrarJob from './screens/CadastrarJob.js'
import JobDetails from './screens/JobDetails.js'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const UserNavigator = () => {
  const { theme } = useThemeStore();
  
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Principal"
        component={ListJob}
        options={{
          headerShown: false
        }} />
      <Stack.Screen
        name="JobDetails"
        component={JobDetails}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

const MainNavigator = () => {
  const { theme } = useThemeStore();
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Tab.Navigator screenOptions={{
        headerStyle: { backgroundColor: theme.colors.surface },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        headerTitleStyle: { color: theme.colors.text },
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
      }}>
        <Tab.Screen
          name="Users"
          component={UserNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Feather name="home" color={color} size={25} />
            )
          }}
        />
        <Tab.Screen 
          name="Perfil" 
          component={CadastrarJob} 
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Octicons name="diff-added" size={24} color={color} />
            )
          }}
        />
        <Tab.Screen 
          name="Teste" 
          component={Perfil} 
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Feather name="user" size={24} color={color} />
            )
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  )
}

export default function App() {
  const { initializeTheme } = useThemeStore();

  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <ThemeTransition>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
          name="Splash"
          component={Splash} 
          options={{
            headerShown: false
          }}
          />
          <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
          />
          <Stack.Screen
            name="Cadastrar"
            component={Cadastrar}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Main"
            component={MainNavigator}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeTransition>
  )
}
