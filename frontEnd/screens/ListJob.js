import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ImageBackground, StatusBar,TouchableOpacity,Pressable, TextInput } from 'react-native';
import Body from '../components/Body';
import { useNavigation } from '@react-navigation/native';
import useUserLoggedStore from '../stores/useUserLoggedStore';
import useJobStore from '../stores/jobStore';



const ListJob = () => {
  const navigation = useNavigation();
  const {jobs, setJobs} = useJobStore(state=>state);
  const [searchTerm, setSearchTerm] = useState('');
  const name = useUserLoggedStore(state => state.name)



  const filteredJobs = jobs.filter(job => 
    job.companyFunction.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getJobs = async () => {
    try {
      const result = await fetch('http://localhost:3333/job');
      const data = await result.json();
      console.log(data.success);
      setJobs(data.jobs);
    } catch (error) {
      console.log('Error getJobs ' + error.message);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <View style={styles.container}>
      <Body />
      <View style={styles.boasVindas}>
        <Text style={styles.userName}>Olá {name?.split(" ")[0]}</Text>
        <Text style={styles.welcomeMessage}>Ache o emprego perfeito</Text>
      </View>
      <TextInput
        style={styles.input}
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Pesquisar"
      />
      <View style={{flex: 6}}> 
        <FlatList 
          data={filteredJobs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable onPress={() => navigation.navigate('JobDetails', { job: item })}>
              <View style={styles.card}>
                <Image  style={styles.image} 
                 source={{ uri: item.companyLogo ? item.companyLogo : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfmWh-XjegmLYmjrErivP95Nfsu4zkB3815Q&s' }}
                />
                <View style={styles.cardContent}>
                  <View style={styles.titleLocationContainer}>
                    <Text style={styles.title}>{item.companyFunction}</Text>
                    <Text style={styles.companyLocation}>{item.companyLocation}</Text>
                  </View>
                  <Text style={styles.companyName}>{item.companyName}</Text>
                  <Text style={styles.salary}>R$ {item.salary}</Text>
                </View>
              </View>
            </Pressable>
          )}
        />
      </View>
    </View>
  );}

const styles = StyleSheet.create({
  boasVindas: {
    backgroundColor: '#FAFAFC',
    marginBottom:20
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFAFC',
    padding: 15
  },
  userName: {
    fontSize: 15,
    fontWeight:"400",
    color: '#000',
    marginLeft: 10,
    marginRight: 10,
  },
  welcomeMessage: {
    fontSize: 22,
    fontWeight:"600",
    color: '#000',
    marginLeft: 10,
    marginRight: 10,
  },
  card: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#F5F5F7',
    borderRadius: 15,
    padding: 10,
    borderColor: '#a1b4f7',
    borderWidth: 2,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 7,
  },
  cardContent: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  companyName: {
    marginTop: 5,
  },
  companyLocation: {
    marginTop: 5,
  },
  salary: {
    marginTop: 5,
    color: "#123DDB"
  },
  jobDescription: {
    marginTop: 5,
  },
  titleLocationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    padding: 10,
    height: 40,
    width: 350,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignSelf:'center',
    borderColor:'#a1b4f7'
  },
});

export default ListJob;