import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useThemeStore from '../stores/useThemeStore';
import useUserLoggedStore from '../stores/useUserLoggedStore';
import { Ionicons } from '@expo/vector-icons';
import ThemeToggle from '../components/ui/ThemeToggle';

const CadastrarJob = () => {
  const navigation = useNavigation();
  const { theme } = useThemeStore();
  const userLogged = useUserLoggedStore(state => state);
  const [formData, setFormData] = useState({
    companyName: '',
    companyFunction: '',
    companyLocation: '',
    salary: '',
    companyLogo: '',
    jobDescription: '',
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3333/job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userLogged.token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        Alert.alert('Sucesso', 'Vaga cadastrada com sucesso!');
        navigation.navigate('Principal');
      } else {
        Alert.alert('Erro', data.message || 'Erro ao cadastrar vaga');
      }
    } catch (error) {
      console.error('Erro ao cadastrar vaga:', error);
      Alert.alert('Erro', 'Erro ao cadastrar vaga. Tente novamente.');
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.colors.text }]}>Cadastrar Vaga</Text>
          <ThemeToggle />
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.formSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Informações da Empresa</Text>
          
          <View style={[styles.inputContainer, { backgroundColor: theme.colors.surface }]}>
            <Ionicons name="business-outline" size={20} color={theme.colors.textSecondary} />
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              placeholder="Nome da Empresa"
              placeholderTextColor={theme.colors.textSecondary}
              value={formData.companyName}
              onChangeText={(text) => handleInputChange('companyName', text)}
            />
          </View>

          <View style={[styles.inputContainer, { backgroundColor: theme.colors.surface }]}>
            <Ionicons name="image-outline" size={20} color={theme.colors.textSecondary} />
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              placeholder="URL do Logo da Empresa"
              placeholderTextColor={theme.colors.textSecondary}
              value={formData.companyLogo}
              onChangeText={(text) => handleInputChange('companyLogo', text)}
            />
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Detalhes da Vaga</Text>
          
          <View style={[styles.inputContainer, { backgroundColor: theme.colors.surface }]}>
            <Ionicons name="briefcase-outline" size={20} color={theme.colors.textSecondary} />
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              placeholder="Cargo"
              placeholderTextColor={theme.colors.textSecondary}
              value={formData.companyFunction}
              onChangeText={(text) => handleInputChange('companyFunction', text)}
            />
          </View>

          <View style={[styles.inputContainer, { backgroundColor: theme.colors.surface }]}>
            <Ionicons name="location-outline" size={20} color={theme.colors.textSecondary} />
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              placeholder="Localização"
              placeholderTextColor={theme.colors.textSecondary}
              value={formData.companyLocation}
              onChangeText={(text) => handleInputChange('companyLocation', text)}
            />
          </View>

          <View style={[styles.inputContainer, { backgroundColor: theme.colors.surface }]}>
            <Ionicons name="cash-outline" size={20} color={theme.colors.textSecondary} />
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              placeholder="Salário"
              placeholderTextColor={theme.colors.textSecondary}
              value={formData.salary}
              onChangeText={(text) => handleInputChange('salary', text)}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Descrição e Requisitos</Text>
          
          <View style={[styles.textAreaContainer, { backgroundColor: theme.colors.surface }]}>
            <Ionicons name="document-text-outline" size={20} color={theme.colors.textSecondary} />
            <TextInput
              style={[styles.textArea, { color: theme.colors.text }]}
              placeholder="Descrição da vaga"
              placeholderTextColor={theme.colors.textSecondary}
              value={formData.jobDescription}
              onChangeText={(text) => handleInputChange('jobDescription', text)}
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Cadastrar Vaga</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  formSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  textAreaContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  textArea: {
    flex: 1,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 32,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CadastrarJob;