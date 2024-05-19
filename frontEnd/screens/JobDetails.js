// JobDetails.js
import React from 'react';
import { View, Text,  StyleSheet, Image, ScrollView } from 'react-native';
import Button from '../components/ui/Button';


const JobDetails = ({ route }) => {
//   const { job } = route.params;
const { job } = route.params;

  return (
    <View style={styles.container}>
    <View style={styles.logoContainer}>
      <Image source={{ uri: job.companyLogo }} style={styles.logo} />
    </View>
    <ScrollView>
      <View style={styles.textContainer}>
        <View style={styles.titleLocationContainer}>
          <Text style={styles.title}>{job.companyFunction}</Text>
          <Text style={styles.companyLocation}>{job.companyLocation}</Text>
        </View>
        <Text style={styles.companyName}>{job.companyName}</Text>
        <Text style={styles.salary}>R$ {job.salary}</Text>
        <Text style={styles.jobDescription}>{job.jobDescription}</Text>
      </View>
    </ScrollView>
    <View style={styles.buttonContainer}>
      <Button title="Candidatar-se à vaga" onPress={()=>{}} />
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
        
      },
      companyName: {
        fontSize: 20,
        marginBottom: 10,
      },
      companyLocation: {
        fontSize: 16,
        marginBottom: 10,
        marginLeft: 20,
        marginTop: 9
      },
      salary: {
        fontSize: 16,
        marginBottom: 10,
        color: "#123DDB"
      },
      jobDescription: {
        fontSize: 14,
        marginBottom: 20,
      },
      titleLocationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      buttonContainer: {
        // flex: 1, 
        alignItems: 'center',
        justifyContent: 'flex-end', 
        marginBottom: 20, 
      },
});

export default JobDetails;