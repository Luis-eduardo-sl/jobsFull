import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/ui/Button';
import useUserLoggedStore from '../stores/useUserLoggedStore';
import axios from 'axios';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


const Perfil = () => {
  const userLogged = useUserLoggedStore(state=>state)
  const [avatar, setAvatar] = useState(userLogged.avatar);
  const [name, setName] = useState(userLogged.name);
  const [email, setEmail] = useState(userLogged.email);
  const [avatarUrl, setAvatarUrl] = useState(userLogged.avatar);
  const navigation = useNavigation();
  const logout = useUserLoggedStore(state => state.logout)

  
  const getAS = async (key) => {
    let dataFound = null;
    try {
      dataFound = await AsyncStorage.getItem(key);
    } catch (error) {
      console.log('Erro ao ler dado');
    }
    return dataFound;
  };

  useEffect(() => {
    setAvatar(userLogged.avatar);
    setName(userLogged.name);
    setEmail(userLogged.email);
  }, [userLogged]);

  const handleSave = async () => {
    try {

      const id = userLogged.id
      const updatedData= {name, email, avatar}
      const token = userLogged.token; 
      const response = await axios.put(`https://jobsfull.onrender.com/user/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`
      }})
       userLogged.login(response.data.user, token)
       const userLoggedString = JSON.stringify({...response.data.user, token: token});
      await AsyncStorage.setItem('userLogged', userLoggedString);
      if (response.status === 200) {
        console.log('Usuário atualizado com sucesso');
      } else {
        console.log('Erro ao atualizar o usuário');
      }
    } catch (error) {
      if(error.response){
        console.error('Erro ao fazer a requisição PUT', error.response);
      }
      AsyncStorage.removeItem('userLogged')
      userLogged.logout()
      navigation.pop()
      navigation.navigate('Login')
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userLogged')
      logout()
      navigation.pop()
      navigation.navigate('Login')
    } catch (error){
      console.log(error)
      alert('Erro ao fazer logout!')
    }
  }


  async function handleDelete() {
    try {
      
      const userLogged = JSON.parse(await AsyncStorage.getItem('userLogged'));
      const token = userLogged.token; 
  
      const response = await axios.delete(`https://jobsfull.onrender.com/user/${userLogged.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
  
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userLogged');
  
      navigation.navigate('Login');
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  }
  
  return (

  <View style={styles.container}>
       <View style={styles.titleAdd}>
          <Button title="Logout" onPress={handleLogout} />
        </View>
    <Text style={styles.title}>Editar Usuário</Text>
    <Image
        style={styles.avatar}
        source={{ uri: userLogged.avatar ? userLogged.avatar : 'https://avatars.githubusercontent.com/u/133153563?v=4' }}
    />
    <TextInput value={avatar} onChangeText={setAvatar} placeholder="Avatar URL" style={styles.input} />
    <TextInput value={name} onChangeText={setName} placeholder="Nome" style={styles.input} />
    <TextInput value={email} onChangeText={setEmail} placeholder="Email" style={styles.input} />
    <Button title="Salvar" onPress={handleSave} />
    <View style={styles.titleDelete}>
    <Button onPress={handleDelete} title="Deletar conta" style={styles.delete} />
        </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFC',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 7,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderRadius:5,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  titleAdd:{
    position: 'absolute',
    top: 10,
    right: 10,
  },
  delete:{
    backgroundColor: '#ED0600'
  },
  titleDelete:{
    position: 'absolute',
    bottom: 10,
    left: 10,
  }
});

export default Perfil;