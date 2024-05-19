import {View, Text, StyleSheet, TextInput, ImageBackground} from 'react-native'
//import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/ui/Button'
import { useNavigation } from '@react-navigation/native'
import H1 from '../components/ui/H1.js'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useUserLoggedStore from '../stores/useUserLoggedStore.js'


const Login = () => {

  const [txtEmail, setTxtEmail] = useState('')
  const [txtPass, setTxtPass] = useState('')
  const navigation = useNavigation()
  const login = useUserLoggedStore(state => state.login)


  const handleLogin = async () => {
    try{
      const response = await fetch('http://localhost:3333/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email: txtEmail, pass: txtPass })
      })

      if(response?.ok){
        const data = await response.json()
        try {
          await AsyncStorage.setItem('userLogged', JSON.stringify({...data.user, token: data.token}))
          login(data.user, data.token)
          navigation.navigate('Main')
        } catch (error){
          console.log(error)
          alert('Erro ao gravar dados de login no dispositivo!')
        }
      } else {
        const data = await response.json()
        console.log(data)
        alert(data?.error ? data.error : "Erro ao logar!")
      }
    }catch(error){
      console.log(error)
    }
  }

  return (
    <ImageBackground source={require('../assets/login.png')} style={styles.img}>
      <View style={styles.container}>
        <H1 style={styles.texto}>Entrar</H1>

        <TextInput 
          style={styles.input}
          placeholder='Email...'
          onChangeText={setTxtEmail}
          value={txtEmail}
          />
        <TextInput 
          style={styles.input}
          placeholder='Senha...'
          onChangeText={setTxtPass}
          value={txtPass}
          secureTextEntry={true}
        />

        <Button 
          title="           Login           "
          onPress={handleLogin}
        />
        <View style={styles.cadastrar}>
          <Text> Não tem conta? </Text>
          <Button 
            title="Cadastre-se"
            onPress={() => navigation.navigate('Cadastrar')}
            style={styles.btn}
            textStyle={styles.cadastroText}
          />
        </View>

      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: 150
  
    },
    input: {
        height: 40,
        width: '100%',
        backgroundColor: '#FFF',
        borderWidth: 1,
        marginBottom: 18,
        padding: 10,
        borderRadius:7,
        borderColor: '#ddd',
    }, 
    img:{
      width: '100%',
      height: '100%',
    },
    texto:{
      marginBottom:20,
      color: "#fff"
    },
    cadastrar: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20
    },
    btn: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      color: '#123DDB'
    },
    cadastroText: {
      color: '#123DDB', 
    },
})

export default Login
