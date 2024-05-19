import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/ui/Button';


const Products = ({user}) => {
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('default_avatar_url');


  

  const saveAS = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log('Erro ao gravar dado');
    }
  };

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
    const getData = async () => {
      const storedAvatar = await getAS('avatar');
      const storedName = await getAS('name');
      const storedEmail = await getAS('email');

      if (storedAvatar) setAvatar(storedAvatar);
      if (storedName) setName(storedName);
      if (storedEmail) setEmail(storedEmail);
    };

    getData();
  }, []);

  const handleSave = () => {
    saveAS('avatar', avatar);
    saveAS('name', name);
    saveAS('email', email);
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Editar Usuário</Text>
    <Image
        style={styles.avatar}
        source={{ uri: user ? user.avatar : 'https://avatars.githubusercontent.com/u/133153563?v=4' }}
    />
    <TextInput value={avatar} onChangeText={setAvatar} placeholder="Avatar URL" style={styles.input} />
    <TextInput value={name} onChangeText={setName} placeholder="Nome" style={styles.input} />
    <TextInput value={email} onChangeText={setEmail} placeholder="Email" style={styles.input} />
    <Button title="Salvar" onPress={handleSave} />
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
});

export default Products;