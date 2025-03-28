import { useState } from 'react'
import {View, TextInput, StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView, Platform, ScrollView} from 'react-native'
import Button from '../components/ui/Button'
import { useNavigation, useRoute } from '@react-navigation/native'
import H1 from '../components/ui/H1.js'
import { Ionicons } from '@expo/vector-icons'
import useThemeStore from '../stores/useThemeStore'
import ThemeToggle from '../components/ui/ThemeToggle'

const Cadastrar = () => {
    const navigation = useNavigation()
    const { theme } = useThemeStore()
    const [showPassword, setShowPassword] = useState(false)
    const [txtName, setTxtName] = useState('')
    const [txtEmail, setTxtEmail] = useState('')
    const [txtAvatar, setTxtAvatar] = useState('')
    const [txtPass, setTxtPass] = useState('')

    const postUser = async () =>{
        try{
          //const result = await fetch('https://.onrender.com/user', {
          const result = await fetch('http://localhost:3333/user', {
            method: "POST",
            headers:{
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name: txtName, email: txtEmail, pass: txtPass, avatar: txtAvatar})
          })
          const data = await result.json()
          console.log(data)
          if(data?.success){
            navigation.goBack()
          } else {
            alert(data.error)
          }
        } catch (error){
          console.log('Error postUser ' + error.message)
          alert(error.message)
        }
      } 

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { backgroundColor: theme.colors.background }]}
        >
            <View style={styles.headerRight}>
                <ThemeToggle />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={[styles.title, { color: theme.colors.primary }]}>Criar Conta</Text>
                        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                            Preencha seus dados para começar
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <View style={[styles.inputContainer, { backgroundColor: theme.colors.surface }]}>
                            <Ionicons name="person-outline" size={20} color={theme.colors.textSecondary} />
                            <TextInput
                                style={[styles.input, { color: theme.colors.text }]}
                                placeholder="Nome"
                                placeholderTextColor={theme.colors.textSecondary}
                                onChangeText={setTxtName}
                                value={txtName}
                            />
                        </View>

                        <View style={[styles.inputContainer, { backgroundColor: theme.colors.surface }]}>
                            <Ionicons name="mail-outline" size={20} color={theme.colors.textSecondary} />
                            <TextInput
                                style={[styles.input, { color: theme.colors.text }]}
                                placeholder="Email"
                                placeholderTextColor={theme.colors.textSecondary}
                                onChangeText={setTxtEmail}
                                value={txtEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={[styles.inputContainer, { backgroundColor: theme.colors.surface }]}>
                            <Ionicons name="lock-closed-outline" size={20} color={theme.colors.textSecondary} />
                            <TextInput
                                style={[styles.input, { color: theme.colors.text }]}
                                placeholder="Senha"
                                placeholderTextColor={theme.colors.textSecondary}
                                onChangeText={setTxtPass}
                                value={txtPass}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons
                                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                                    size={20}
                                    color={theme.colors.textSecondary}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.inputContainer, { backgroundColor: theme.colors.surface }]}>
                            <Ionicons name="image-outline" size={20} color={theme.colors.textSecondary} />
                            <TextInput
                                style={[styles.input, { color: theme.colors.text }]}
                                placeholder="URL do Avatar"
                                placeholderTextColor={theme.colors.textSecondary}
                                onChangeText={setTxtAvatar}
                                value={txtAvatar}
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.registerButton, { backgroundColor: theme.colors.primary }]}
                            onPress={postUser}
                        >
                            <Text style={styles.registerButtonText}>Criar Conta</Text>
                        </TouchableOpacity>

                        <View style={styles.loginContainer}>
                            <Text style={[styles.loginText, { color: theme.colors.textSecondary }]}>
                                Já tem uma conta?
                            </Text>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Text style={[styles.loginLink, { color: theme.colors.primary }]}>
                                    Faça login
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
    },
    form: {
        gap: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderRadius: 12,
        height: 56,
        gap: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    registerButton: {
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    registerButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        gap: 4,
    },
    loginText: {
        fontSize: 14,
    },
    loginLink: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    headerRight: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 1,
    },
})

export default Cadastrar
