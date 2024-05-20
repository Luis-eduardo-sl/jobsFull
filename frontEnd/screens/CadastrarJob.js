import React, { useState } from 'react';
import { View, TextInput, StyleSheet,Text } from 'react-native';
import Button from '../components/ui/Button';
import { useNavigation } from '@react-navigation/native';

const CadastrarJob = () => {
  const navigation = useNavigation();

  const [companyFunction, setcompanyFunction] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyLocation, setCompanyLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');

  const postJob = async () => {
    try {
      const result = await fetch('http://localhost:3333/job', {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          companyFunction: companyFunction,
          companyName: companyName,
          companyLocation: companyLocation,
          salary: salary,
          companyLogo: companyLogo,
          jobDescription: jobDescription
        })
      })
      const data = await result.json()
      console.log(data)
      if(data?.success){
        navigation.goBack()
      } else {
        alert(data.error)
      }
    } catch (error){
      console.log('Error postJob ' + error.message)
      alert(error.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crie uma nova vaga</Text>
      <TextInput value={companyFunction} onChangeText={setcompanyFunction} placeholder="Nome da Função" style={styles.input} />
      <TextInput value={companyName} onChangeText={setCompanyName} placeholder="Nome da Empresa" style={styles.input} />
      <TextInput value={companyLocation} onChangeText={setCompanyLocation} placeholder="Cidade da Empresa" style={styles.input} />
      <TextInput value={salary} onChangeText={setSalary} placeholder="Salário" style={styles.input} />
      <TextInput value={companyLogo} onChangeText={setCompanyLogo} placeholder="URL Logo da Empresa" style={styles.input} />
      <TextInput
        value={jobDescription}
        onChangeText={setJobDescription}
        placeholder="Resumo do Trabalho"
        style={styles.inputTxt}
        multiline={true}
        numberOfLines={4}
      />
    
      <Button title="Cadastrar Vaga" onPress={postJob} style={styles.btn}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FAFAFC',
    alignItems:'center'
  },
  input: {
    height: 40,
    // width: 370,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderRadius:5,
    borderColor: '#ddd',
  },
  inputTxt:{
    height: 100,
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
    textAlign: 'center',
  },
  btn:{
    width: '100%',
  }
});

export default CadastrarJob;