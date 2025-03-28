import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useUserLoggedStore from '../stores/useUserLoggedStore';
import useJobStore from '../stores/jobStore';
import useThemeStore from '../stores/useThemeStore';
import { Ionicons } from '@expo/vector-icons';
import ThemeToggle from '../components/ui/ThemeToggle';

const ListJob = () => {
  const navigation = useNavigation();
  const { jobs, setJobs } = useJobStore(state => state);
  const [searchTerm, setSearchTerm] = useState('');
  const userLogged = useUserLoggedStore(state => state);
  const { theme } = useThemeStore();

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
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>Jobs</Text>
        </View>
        <View style={styles.headerBottom}>
          <Text style={[styles.greeting, { color: theme.colors.text }]}>
            Olá, {userLogged.name}
          </Text>
          <ThemeToggle />
        </View>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: theme.colors.surface }]}>
        <Ionicons name="search-outline" size={20} color={theme.colors.textSecondary} />
        <TextInput
          style={[styles.input, { color: theme.colors.text }]}
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Pesquisar vagas..."
          placeholderTextColor={theme.colors.textSecondary}
        />
      </View>

      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('JobDetails', { job: item })}
            style={[styles.card, { backgroundColor: theme.colors.surface }]}
          >
            <Image
              style={styles.image}
              source={{
                uri: item.companyLogo
                  ? item.companyLogo
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfmWh-XjegmLYmjrErivP95Nfsu4zkB3815Q&s'
              }}
            />
            <View style={styles.cardContent}>
              <View style={styles.titleLocationContainer}>
                <Text style={[styles.title, { color: theme.colors.text }]}>
                  {item.companyFunction}
                </Text>
                <View style={styles.locationContainer}>
                  <Ionicons name="location-outline" size={16} color={theme.colors.textSecondary} />
                  <Text style={[styles.companyLocation, { color: theme.colors.textSecondary }]}>
                    {item.companyLocation}
                  </Text>
                </View>
              </View>
              <Text style={[styles.companyName, { color: theme.colors.textSecondary }]}>
                {item.companyName}
              </Text>
              <View style={styles.salaryContainer}>
                <Ionicons name="cash-outline" size={16} color={theme.colors.primary} />
                <Text style={[styles.salary, { color: theme.colors.primary }]}>
                  R$ {item.salary}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
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
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  headerTitle: {
    fontSize: 38,
    fontWeight: 'bold',
  },
  headerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 12,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  listContainer: {
    padding: 20,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  cardContent: {
    flex: 1,
    marginLeft: 16,
  },
  titleLocationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  companyLocation: {
    fontSize: 14,
  },
  companyName: {
    fontSize: 14,
    marginBottom: 8,
  },
  salaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  salary: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ListJob;