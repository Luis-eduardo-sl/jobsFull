import React, { useState } from 'react';
import { View, Text,  StyleSheet, Image, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/ui/Button';
import axios from 'axios';
// import jobStore from '../stores/jobStore'
import useJobStore from '../stores/jobStore';


const JobDetails = ({ route }) => {
  const { job } = route.params;
  const jobStore= useJobStore(state=>state);
  const [companyFunction, setCompanyFunction] = useState(job.companyFunction);
  const [companyName, setCompanyName] = useState(job.companyName);
  const [companyLocation, setCompanyLocation] = useState(job.companyLocation);
  const [salary, setSalary] = useState(job.salary);
  const [jobDescription, setJobDescription] = useState(job.jobDescription);

  const navigation = useNavigation();



async function handleEditJob() {
    const updatedJob = {
      id: job.id,
      companyFunction,
      companyName,
      companyLocation,
      salary,
      jobDescription
    };

    try {
      const userLogged = JSON.parse(await AsyncStorage.getItem('userLogged'));
      const token = userLogged.token; 
      
      const response = await axios.put(`http://localhost:3333/job/${updatedJob.id}`, updatedJob, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      jobStore.updateJob(response.data.job)
      
      navigation.navigate('Principal');


    } catch (error) {
      console.error('Failed to edit job:', error);
    }
  }

  // Função para lidar com a exclusão do trabalho
  async function handleDeleteJob() {
    try {
      
      const userLogged = JSON.parse(await AsyncStorage.getItem('userLogged'));
      const token = userLogged.token; 
  
      const response = await axios.delete(`http://localhost:3333/job/${job.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
  
      jobStore.removeJob(job.id)
      navigation.navigate('Principal');
  
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
}
  return (
    <View style={styles.container}>
     <View style={styles.logoContainer}>
      <Image source={{ uri: job.companyLogo ? job.companyLogo : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfmWh-XjegmLYmjrErivP95Nfsu4zkB3815Q&s' }} style={styles.logo} />
    </View>
      <ScrollView>
        <View style={styles.textContainer}>
          <View style={styles.titleLocationContainer}>
            <TextInput
              style={styles.title}
              value={companyFunction}
              placeholder='Função'
              onChangeText={setCompanyFunction}
            />
            <TextInput
              style={styles.companyLocation}
              value={companyLocation}
              placeholder='Cidade'
              onChangeText={setCompanyLocation}
            />
          </View>
          <TextInput
            style={styles.companyName}
            value={companyName}
            placeholder='Nome da empresa'
            onChangeText={setCompanyName}
          />
          <TextInput
            style={styles.salary}
            value={salary}
            onChangeText={setSalary}
            placeholder='Salário'
          />
          <TextInput
            style={styles.jobDescription}
            value={jobDescription}
            placeholder='Descrição da vaga'
            onChangeText={setJobDescription}
            multiline
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Excluir Vaga" onPress={handleDeleteJob} style={styles.deleteButton}/>
        <Button title="Editar Vaga" onPress={handleEditJob} style={styles.editButton}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FAFAFC',
        alignItems: 'center'
        
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
        borderColor: '#ddd',
        width: 220,
        padding:2
        
      },
      companyName: {
        fontSize: 20,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius:5,
        borderColor: '#ddd',
        width: 195,
        padding:2

      },
      companyLocation: {
        fontSize: 16,
        marginBottom: 10,
        marginLeft: 20,
        marginTop: 9,
        borderWidth: 1,
        borderRadius:5,
        borderColor: '#ddd',
        width: 100,
        padding:2
      },
      salary: {
        fontSize: 16,
        marginBottom: 10,
        color: "#123DDB",
        borderWidth: 1,
        borderRadius:5,
        borderColor: '#ddd',
        width: 100,
        padding:2
      },
      jobDescription: {
        fontSize: 14,
        marginBottom: 20,
        borderWidth: 1,
        borderRadius:5,
        borderColor: '#ddd',
        width: 350,
        height: 210,
        padding:2
      },
      titleLocationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: -10, 
        marginTop: 10
      },
      editButton: {
        padding: 10,
        // borderRadius: 5,
        textAlign: "center",
        fontSize: 16,
        margin: 10
      },
      deleteButton: {
        backgroundColor: "#B22222",
        padding: 10,
        // borderRadius: 5,
        textAlign: "center",
        fontSize: 16,
        margin: 10
      }
});

export default JobDetails;