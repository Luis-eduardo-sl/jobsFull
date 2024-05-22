import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Octicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'
import ListUser from './screens/ListUser'
import Cadastrar from './screens/Cadastrar'
import Perfil from './screens/Perfil.js'
import Splash from './screens/Splash.js'
import Login from './screens/Login.js'
import CadastrarJob from './screens/CadastrarJob.js'
import JobDetails from './screens/JobDetails.js'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const UserNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Principal"
        component={ListUser}
        options={{
          headerShown: false
        }} />
      <Stack.Screen
        name="JobDetails"
        component={JobDetails}
        options={{
          headerShown: true,
          headerTransparent: true, 
          headerTitle: '', 
          headerTintColor: "#000" 
        }}
      />
    </Stack.Navigator>
  )
}



const MainNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerStyle: { backgroundColor: '#000' },
      tabBarActiveTintColor: "#123DDB",
      tabBarInactiveTintColor: "#000",
      headerTitleStyle: { color: "#FFF" },
      tabBarShowLabel: false,
    }}>
      <Tab.Screen
        name="Users"
        component={UserNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({color} ) => (
            <Feather name="home" color={color}  size={25} />
          )
        }}
      />
      <Tab.Screen name="Perfil" component={CadastrarJob} options={{
        headerShown: false,
        tabBarIcon: ({color} ) => (
          <Octicons name="diff-added" size={24} color={color}  />        
        )
      }}/>
      <Tab.Screen name="Teste" component={Perfil} options={{
        headerShown: false,
        tabBarIcon: ({color}) => (
          <Feather name="user" size={24} color={color} />
        )
      }} />

    </Tab.Navigator>
  )
}


export default function App() {
  return (
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
            title: "Cadastrar Usuario"
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
  )
}
