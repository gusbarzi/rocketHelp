//React and Hooks
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
//Firebase
import auth from '@react-native-firebase/auth';
//Firestore
import firestore from '@react-native-firebase/firestore'
//React navigation
import { useNavigation } from '@react-navigation/native';
//Native Bases
import { HStack, IconButton, VStack, useTheme, Text, Heading, FlatList, Center } from 'native-base';
//Phosphor
import { SignOut, ChatTeardropText } from 'phosphor-react-native';
//Assets
import Logo from '../assets/logo_secondary.svg';
//Components
import { Loading } from '../components/Loading';
import { Filter } from '../components/Filter';
import { Button } from '../components/Button';
import { Order, OrderProps } from '../components/Order';
//Utils
import { dateFormat } from '../utils/firestoreDateFormat';

export function Home() {
    const [isLoading, setIsLoading] = useState(true)
    const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open')
    const [orders, setOrders] = useState<OrderProps[]>([])

    const { colors } = useTheme()

    const navigation = useNavigation();

    function handleNewOrder() {
        navigation.navigate('new')
    }

    function handleOpenDetails(orderId: string) {
        navigation.navigate('details', { orderId })
    }

    function handleLogout() {
        auth()
        .signOut()
        .catch(err => {
            console.log(err)
            return Alert.alert('Logout', 'It was not possible to leave')
        });
    }

    useEffect(() => {
        setIsLoading(true);
    
        const subscriber = firestore()
          .collection('orders')
          .where('status', '==', statusSelected)
          .onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => {
              const { patrimony, description, status, created_at } = doc.data();
    
              return {
                id: doc.id,
                patrimony,
                description,
                status,
                when: dateFormat(created_at)
              }
            });
    
            setOrders(data);
            setIsLoading(false);
          });
    
        return subscriber;
      }, [statusSelected]);

    return (
        <VStack flex={1} pb={6} bg="gray.700">
            <HStack
                w="full"
                justifyContent="space-between"
                alignItems="center"
                bg="gray.600"
                pt={12}
                pb={5}
                px={6}
            >
                <Logo />

                <IconButton
                    icon={<SignOut size={26} color={colors.gray[300]} />}
                    onPress={handleLogout}
                />

            </HStack>

            <VStack flex={1} px={6}>

                <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
                    <Heading color="gray.100">
                        My solicitations
                    </Heading>
                    <Text color="gray.200">
                        {orders.length}
                    </Text>
                </HStack>

                <HStack space={3} mb={8}>
                    <Filter
                        type="open"
                        title="in progress"
                        onPress={() => setStatusSelected('open')}
                        isActive={statusSelected === 'open'}
                    />

                    <Filter
                        type="closed"
                        title="finalized"
                        onPress={() => setStatusSelected('closed')}
                        isActive={statusSelected === 'closed'}
                    />
                </HStack>

                { isLoading ? <Loading /> : <FlatList 
                    data={orders}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <Order data={item} onPress={() => handleOpenDetails(item.id)} />}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{ paddingBottom: 100 }}
                    ListEmptyComponent={() => (
                        <Center>
                            <ChatTeardropText color={colors.gray[300]} size={40} />
                            <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                                You don't have {'\n'}
                                {statusSelected === 'open' ? 'requests in progress yet' : 'completed requests yet'}
                            </Text>
                        </Center>
                    )}
                /> }

                <Button title='New solicitations' onPress={handleNewOrder} />
            </VStack>


        </VStack> 
    );
}