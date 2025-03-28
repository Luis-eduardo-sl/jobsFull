import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, SafeAreaView, Share, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import useThemeStore from '../stores/useThemeStore';
import useUserLoggedStore from '../stores/useUserLoggedStore';
import { Ionicons } from '@expo/vector-icons';

const JobDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useThemeStore();
  const userLogged = useUserLoggedStore(state => state);
  const { job } = route.params;

  const handleApply = () => {
    // Aqui você pode implementar a lógica de candidatura
    Alert.alert(
      'Candidatura',
      'Você tem certeza que deseja se candidatar a esta vaga?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Candidatar-se',
          onPress: () => {
            // Implementar lógica de candidatura
            Alert.alert('Sucesso', 'Candidatura realizada com sucesso!');
          },
        },
      ]
    );
  };

  const handleShare = async () => {
    try {
      const message = `Vaga de ${job.companyFunction} na ${job.companyName}\n\n` +
        `Localização: ${job.companyLocation}\n` +
        `Salário: ${job.salary}\n\n` +
        `Descrição: ${job.jobDescription}\n\n` +
        `Candidatar-se: http://seuapp.com/vaga/${job.id}`;

      await Share.share({
        message,
        title: `${job.companyFunction} - ${job.companyName}`,
      });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível compartilhar a vaga');
    }
  };

  const handleContact = () => {
    // Implementar contato com o recrutador
    Alert.alert('Contato', 'Entrar em contato com o recrutador');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.headerButton}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={handleShare}
          style={styles.headerButton}
        >
          <Ionicons name="share-outline" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.companySection}>
          {job.companyLogo ? (
            <Image
              source={{ uri: job.companyLogo }}
              style={styles.companyLogo}
            />
          ) : (
            <View style={[styles.companyLogoPlaceholder, { backgroundColor: theme.colors.surface }]}>
              <Ionicons name="business-outline" size={40} color={theme.colors.textSecondary} />
            </View>
          )}
          <View style={styles.companyInfo}>
            <Text style={[styles.companyName, { color: theme.colors.text }]}>{job.companyName}</Text>
            <Text style={[styles.jobTitle, { color: theme.colors.primary }]}>{job.companyFunction}</Text>
          </View>
        </View>

        <View style={[styles.infoCard, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color={theme.colors.textSecondary} />
            <Text style={[styles.infoText, { color: theme.colors.text }]}>{job.companyLocation}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="cash-outline" size={20} color={theme.colors.textSecondary} />
            <Text style={[styles.infoText, { color: theme.colors.text }]}>{job.salary}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={20} color={theme.colors.textSecondary} />
            <Text style={[styles.infoText, { color: theme.colors.text }]}>
              Publicado em {new Date(job.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sobre a Vaga</Text>
          <Text style={[styles.description, { color: theme.colors.text }]}>{job.jobDescription}</Text>
        </View>

        <View style={styles.recruiterSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recrutador</Text>
          <View style={[styles.recruiterCard, { backgroundColor: theme.colors.surface }]}>
            {job.userAvatar ? (
              <Image
                source={{ uri: job.userAvatar }}
                style={styles.recruiterAvatar}
              />
            ) : (
              <View style={[styles.recruiterAvatarPlaceholder, { backgroundColor: theme.colors.background }]}>
                <Ionicons name="person-outline" size={24} color={theme.colors.textSecondary} />
              </View>
            )}
            <View style={styles.recruiterInfo}>
              <Text style={[styles.recruiterName, { color: theme.colors.text }]}>{job.userName}</Text>
              <TouchableOpacity onPress={handleContact}>
                <Text style={[styles.contactButton, { color: theme.colors.primary }]}>Entrar em contato</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: theme.colors.surface }]}>
        <TouchableOpacity
          style={[styles.applyButton, { backgroundColor: theme.colors.primary }]}
          onPress={handleApply}
        >
          <Text style={styles.applyButtonText}>Candidatar-se</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  headerButton: {
    padding: 8,
    minWidth: 40,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
  },
  companySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  companyLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  companyLogoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  recruiterSection: {
    marginBottom: 24,
  },
  recruiterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  recruiterAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  recruiterAvatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recruiterInfo: {
    flex: 1,
  },
  recruiterName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  contactButton: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  applyButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default JobDetails;