//React
import { useState } from 'react';
//Firebase
import firestore from '@react-native-firebase/firestore'
//Native Bases
import { VStack } from 'native-base';
//react navigation
import { useNavigation } from '@react-navigation/native';
//Components
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Alert } from 'react-native';

export function Register() {

  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  function handleNewOrderRegister() {
    if (!patrimony || !description) {
      return Alert.alert('Register', 'Please, fill in all fields')
    }

    setIsLoading(true);

    firestore()
    .collection('orders')
    .add({
      patrimony,
      description,
      status: 'open',
      created_at: firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      Alert.alert("Solicitation", "request registered successfully")
      navigation.goBack()
    })
    .catch((err) => {
      console.log(err)
      setIsLoading(false);
      return Alert.alert('Solicitation', 'was not possible registered your request')
    });
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">

        <Header title="New Solicitation" />

        <Input 
            placeholder='Patrimony number'
            mt={4}
            onChangeText={setPatrimony}
        />

        <Input
            placeholder="Problem Description"
            flex={1}
            mt={5}
            multiline
            textAlignVertical="top"
            onChangeText={setDescription}

        />

        <Button 
            title="Register"
            mt={5}
            isLoading={isLoading}
            onPress={handleNewOrderRegister}
        />

    </VStack>
  );
}