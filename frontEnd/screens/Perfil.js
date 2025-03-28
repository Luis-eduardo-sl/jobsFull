import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useThemeStore from '../stores/useThemeStore';
import useUserLoggedStore from '../stores/useUserLoggedStore';
import { Ionicons } from '@expo/vector-icons';
import ThemeToggle from '../components/ui/ThemeToggle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Perfil = () => {
  const navigation = useNavigation();
  const { theme } = useThemeStore();
  const userLogged = useUserLoggedStore(state => state);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userLogged.name,
    email: userLogged.email,
    avatar: userLogged.avatar,
  });

  const handleSave = async () => {
    try {
      const id = userLogged.id;
      const token = userLogged.token;
      const response = await axios.put(`http://localhost:3333/user/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      userLogged.login(response.data.user, token);
      const userLoggedString = JSON.stringify({...response.data.user, token: token});
      await AsyncStorage.setItem('userLogged', userLoggedString);
      
      setIsEditing(false);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch (error) {
      if(error.response) {
        console.error('Erro ao fazer a requisição PUT', error.response);
        Alert.alert('Erro', 'Erro ao atualizar o perfil');
      }
      AsyncStorage.removeItem('userLogged');
      userLogged.logout();
      navigation.navigate('Login');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userLogged');
      userLogged.logout();
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Erro ao fazer logout!');
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir sua conta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const token = userLogged.token;
              const response = await axios.delete(`http://localhost:3333/user/${userLogged.id}`, {
                headers: {
                  Authorization: `Bearer ${token}`
                },
              });

              await AsyncStorage.removeItem('token');
              await AsyncStorage.removeItem('userLogged');
              navigation.navigate('Login');
            } catch (error) {
              console.error('Failed to delete user:', error);
              Alert.alert('Erro', 'Erro ao excluir a conta');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Perfil</Text>
        <ThemeToggle />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <View style={[styles.avatarContainer, { backgroundColor: theme.colors.surface }]}>
            {formData.avatar ? (
              <Image
                source={{ uri: formData.avatar }}
                style={styles.avatarImage}
              />
            ) : (
              <Ionicons name="person" size={40} color={theme.colors.textSecondary} />
            )}
          </View>
          {isEditing ? (
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              value={formData.avatar}
              onChangeText={(text) => setFormData({ ...formData, avatar: text })}
              placeholder="URL da imagem de perfil"
              placeholderTextColor={theme.colors.textSecondary}
            />
          ) : null}
        </View>

        <View style={styles.menuSection}>
          <View style={[styles.inputContainer, { backgroundColor: theme.colors.surface }]}>
            <Ionicons name="person-outline" size={20} color={theme.colors.textSecondary} />
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="Nome"
              placeholderTextColor={theme.colors.textSecondary}
              editable={isEditing}
            />
          </View>

          <View style={[styles.inputContainer, { backgroundColor: theme.colors.surface }]}>
            <Ionicons name="mail-outline" size={20} color={theme.colors.textSecondary} />
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              placeholder="Email"
              placeholderTextColor={theme.colors.textSecondary}
              editable={isEditing}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {isEditing ? (
            <TouchableOpacity
              style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Salvar Alterações</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.editButton, { backgroundColor: theme.colors.primary }]}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.buttonText}>Editar Perfil</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.deleteButton, { backgroundColor: theme.colors.error }]}
            onPress={handleDelete}
          >
            <Text style={styles.buttonText}>Excluir Conta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: theme.colors.error }]}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
            <Text style={styles.buttonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  menuSection: {
    gap: 12,
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
    borderRadius: 12,
    gap: 12,
  },
  saveButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  editButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  deleteButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Perfil;