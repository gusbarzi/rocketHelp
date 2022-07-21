//Native Bases
import { VStack } from 'native-base';
//Components
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function Register() {
  return (
    <VStack flex={1} p={6} bg="gray.600">

        <Header title="New Solicitation" />

        <Input 
            placeholder='Patrimony number'
            mt={4}
        />

        <Input
            placeholder="Problem Description"
            flex={1}
            mt={5}
            multiline
            textAlignVertical="top"
        />

        <Button 
            title="Register"
            mt={5}
        />

    </VStack>
  );
}