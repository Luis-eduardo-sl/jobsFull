import React, { useState } from 'react';
import { View, Text,  StyleSheet, Image, ScrollView, TextInput } from 'react-native';
import Button from '../components/ui/Button';

const JobDetails = ({ route }) => {
  const { job } = route.params;

  // Adicione estados para cada campo que deseja tornar editável
  const [companyFunction, setCompanyFunction] = useState(job.companyFunction);
  const [companyName, setCompanyName] = useState(job.companyName);
  const [companyLocation, setCompanyLocation] = useState(job.companyLocation);
  const [salary, setSalary] = useState(job.salary);
  const [jobDescription, setJobDescription] = useState(job.jobDescription);

  // Função para lidar com a edição do trabalho
  const handleEditJob = () => {
    // Aqui você pode fazer a chamada API para editar o trabalho
  };

  // Função para lidar com a exclusão do trabalho
  const handleDeleteJob = () => {
    // Aqui você pode fazer a chamada API para excluir o trabalho
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={{ uri: job.companyLogo }} style={styles.logo} />
      </View>
      <ScrollView>
        <View style={styles.textContainer}>
          <View style={styles.titleLocationContainer}>
            <TextInput
              style={styles.title}
              value={companyFunction}
              onChangeText={setCompanyFunction}
            />
            <TextInput
              style={styles.companyLocation}
              value={companyLocation}
              onChangeText={setCompanyLocation}
            />
          </View>
          <TextInput
            style={styles.companyName}
            value={companyName}
            onChangeText={setCompanyName}
          />
          <TextInput
            style={styles.salary}
            value={salary}
            onChangeText={setSalary}
          />
          <TextInput
            style={styles.jobDescription}
            value={jobDescription}
            onChangeText={setJobDescription}
            multiline
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Editar Vaga" onPress={handleEditJob} />
        <Button title="Excluir Vaga" onPress={handleDeleteJob} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FAFAFC',
        
      },
      logoContainer: {
        alignItems: 'center',
        marginVertical: 30,
        marginTop: 100
    },
      logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
        borderRadius: 4,
      },
      textContainer: {
        alignItems: 'flex-start',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        borderWidth: 1,
        borderRadius:5,
        borderColor: '#ddd'
        
      },
      companyName: {
        fontSize: 20,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius:5,
        borderColor: '#ddd'

      },
      companyLocation: {
        fontSize: 16,
        marginBottom: 10,
        marginLeft: 20,
        marginTop: 9,
        borderWidth: 1,
        borderRadius:5,
        borderColor: '#ddd'
      },
      salary: {
        fontSize: 16,
        marginBottom: 10,
        color: "#123DDB",
        borderWidth: 1,
        borderRadius:5,
        borderColor: '#ddd'
      },
      jobDescription: {
        fontSize: 14,
        marginBottom: 20,
        borderWidth: 1,
        borderRadius:5,
        borderColor: '#ddd'
      },
      titleLocationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      buttonContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end', 
        marginBottom: -10, 
        marginTop: 10
      },
});

export default JobDetails;