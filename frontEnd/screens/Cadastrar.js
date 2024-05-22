import { useState } from 'react'
import {View, TextInput, StyleSheet, ScrollView} from 'react-native'
import Button from '../components/ui/Button'
import { useNavigation, useRoute } from '@react-navigation/native'
import H1 from '../components/ui/H1.js'

const Cadastrar = () => {
    const navigation = useNavigation()

    const [txtName, setTxtName] = useState('')
    const [txtEmail, setTxtEmail] = useState('')
    const [txtAvatar, setTxtAvatar] = useState('')
    const [txtPass, setTxtPass] = useState('')

    const postUser = async () =>{
        try{
          //const result = await fetch('https://.onrender.com/user', {
          const result = await fetch('https://jobsfull.onrender.com/user', {
            method: "POST",
            headers:{
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name: txtName, email: txtEmail, pass: txtPass, avatar: txtAvatar})
          })
          const data = await result.json()
          console.log(data)
          if(data?.success){
            navigation.goBack()
          } else {
            alert(data.error)
          }
        } catch (error){
          console.log('Error postUser ' + error.message)
          alert(error.message)
        }
      } 

    return (
        <ScrollView>
            <View style={styles.form}>
                <TextInput 
                style={styles.input}
                placeholder='Nome...'
                onChangeText={setTxtName}
                value={txtName}
                />
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
                />
                <TextInput 
                style={styles.input}
                placeholder='Avatar...'
                onChangeText={setTxtAvatar}
                value={txtAvatar}
                />
                <Button 
                    title="Cadastrar Usuário"
                    onPress={postUser}
                    style={styles.button}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius:7
  },
  button: {
    height: 50,
    width: '100%',
    backgroundColor: '#123DDB',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})

export default Cadastrar
