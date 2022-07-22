//react
import { useState } from 'react';
import { Alert } from 'react-native';
//firestore
import auth from "@react-native-firebase/auth"
//Nativebases
import { VStack, Heading, Icon, useTheme } from 'native-base';
//phosphor
import { Envelope, Key } from 'phosphor-react-native';
//components
import Logo from '../assets/logo_primary.svg'
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function Signin() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail]: any = useState();
    const [password, setPassword]: any = useState();

    const { colors } = useTheme();

    function handleSignIn() {
        if (!email || !password) {
            return Alert.alert('Sign in', 'please, enter your email address and password.')
        }

        setIsLoading(true);

        auth()
        .signInWithEmailAndPassword(email, password)
        .catch((err) => {
            console.error(err);
            setIsLoading(false);

            if(err.code === 'auth/invalid-email') Alert.alert('Sign in', 'Email is invalid');
            if(err.code === 'auth/wrong-password') Alert.alert('Sign in', 'Email or Password is invalid');
            if(err.code === 'auth/user-not-found') Alert.alert('Sign in', 'Email or Password is invalid');
        });
    }

    return (
        <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
            <Logo />

            <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
                Sign in
            </Heading>

            <Input
                mb={4}
                placeholder="E-mail"
                InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
                onChangeText={setEmail}
            />

            <Input
                mb={8}
                placeholder="Password"
                InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
                secureTextEntry
                onChangeText={setPassword}
            />

            <Button
                title="Sign in" w="full"
                onPress={handleSignIn}
                isLoading={isLoading}
            />

        </VStack>
    );
}