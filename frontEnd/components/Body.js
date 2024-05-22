import {View, StyleSheet, FlatList, Text, Platform} from 'react-native'
import { useEffect } from 'react'
import H1 from './ui/H1'
import Button from './ui/Button'
import { useNavigation } from '@react-navigation/native'
import useUserStore from '../stores/userStore.js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useUserLoggedStore from '../stores/useUserLoggedStore.js'

const Body = () => {
  const navigation = useNavigation()

  const users = useUserStore((state) => state.users)
  const setUsers = useUserStore((state) => state.setUsers)

  console.log('Plataforma Atual: ', Platform.OS)

  const getUsers = async () => {
    try{
      //const result = await fetch('https://onrender.com/user')
      const result = await fetch('https://jobsfull.onrender.com/user')
      const data = await result.json()
      console.log(data.success)
      setUsers(data.users)
    } catch (error){
      console.log('Error getUsers ' + error.message)
    }
  }

  useEffect(()=>{
    getUsers()
  },[])



  return (
    <View >
        <View style={styles.titleAdd}>
          <Text style={styles.logo}>Job</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    titleAdd:{
      flex: 1,
      alignItems: 'center',
    },
    logo:{
      fontSize:40,
      fontWeight: 700,
      color: '#123DDB',
      textAlign: 'center',
    }
  }
)

export default Body