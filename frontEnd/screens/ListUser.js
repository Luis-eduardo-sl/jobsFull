import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ImageBackground, StatusBar,TouchableOpacity,Pressable } from 'react-native';
import Body from '../components/Body';
import { useNavigation } from '@react-navigation/native';


const ListUser = () => {
  const navigation = useNavigation();
  const [jobs, setJobs] = useState([]);

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
    <Text style={styles.userName}>Olá Luis</Text>
    <Text style={styles.welcomeMessage}>Ache o emprego perfeito</Text>
  </View>
  <View style={{flex: 6}}> 
    <FlatList 
      data={jobs}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigation.navigate('JobDetails', { job: item })}>
          <View style={styles.card}>
            <Image source={{ uri: item.companyLogo }} style={styles.image} />
            <View style={styles.cardContent}>
              <View style={styles.titleLocationContainer}>
                <Text style={styles.title}>{item.companyFunction}</Text>
                <Text style={styles.companyLocation}>{item.companyLocation}</Text>
              </View>
              <Text style={styles.companyName}>{item.companyName}</Text>
              <Text style={styles.salary}>R$ {item.salary}</Text>
              {/* <Text style={styles.jobDescription} numberOfLines={2} ellipsizeMode='tail'>
                {item.jobDescription}
              </Text> */}
            </View>
          </View>
        </Pressable>
      )}
      // keyExtractor={item => item.id.toString()}
    />
  </View>
  <StatusBar style="light" />
</View>
  );
}

const styles = StyleSheet.create({
  boasVindas: {
    flex: 1,
    backgroundColor: '#FAFAFC',
    position: 'absolute', // Adicionado esta linha
    top: 0,
    marginTop: 50
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
});

export default ListUser;