//Firestore
import firestore from '@react-native-firebase/firestore';
//React hooks
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
//React bases
import { VStack, Text, HStack, useTheme, ScrollView, Box } from 'native-base';
//components
import { Header } from '../components/Header';
import { OrderProps } from '../components/Order';
import { Loading } from '../components/Loading';
import { CardDetails } from '../components/CardDetails';
import { Input } from '../components/Input';
//react navigation
import { useNavigation, useRoute } from '@react-navigation/native';
//DTO
import { OrderFirestoreDTO } from '../DTOs/OrderFirestoreDTO';
//Utils
import { dateFormat } from '../utils/firestoreDateFormat';
//phosphor
import { CircleWavyCheck, Hourglass, DesktopTower, ClipboardText } from 'phosphor-react-native'
import { Button } from '../components/Button';

type RouteParams = {
    orderId: string;
}

type OrderDetails = OrderProps & {
    description: string;
    solution: string;
    closed: string;
}

export function Details() {
    const [solution, setSolution] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);

    const { colors } = useTheme()

    const navigation = useNavigation();

    const route = useRoute();
    const { orderId } = route.params as RouteParams;

    function handleOrderClose() {
        if(!solution) {
            return Alert.alert('Solicitation', 'Inform the solution to close the request')
        }

        firestore()
        .collection<OrderFirestoreDTO>('orders')
        .doc(orderId)
        .update({
            status: 'closed',
            solution,
            closed_at: firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            Alert.alert('Solicitation', 'Request closed');
            navigation.goBack()
        })
        .catch((err) => {
            console.log(err)
            Alert.alert('Solicitation', 'Was not possible the solicitation');
        })
    }

    useEffect(() => {
        firestore()
            .collection<OrderFirestoreDTO>('orders')
            .doc(orderId)
            .get()
            .then((doc) => {
                const { patrimony, description, status, created_at, closed_at, solution } = doc.data();

                const closed = closed_at ? dateFormat(closed_at) : null;

                setOrder({
                    id: doc.id,
                    patrimony,
                    description,
                    status,
                    solution,
                    when: dateFormat(created_at),
                    closed
                });

                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <Loading />
    }

    return (
        <VStack flex={1} bg="gray.700">
            <Box px={6} bg="gray.600">
                <Header title="Solicitations" />
            </Box>

            <HStack bg="gray.500" justifyContent="center" p={4}>
                {
                    order.status === 'closed'
                        ? <CircleWavyCheck size={22} color={colors.green[300]} />
                        : <Hourglass size={22} color={colors.secondary[700]} />
                }

                <Text
                    fontSize="sm"
                    color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]}
                    ml={2}
                    textTransform="uppercase"
                >
                    {order.status === 'closed' ? 'finished' : 'in progress'}
                </Text>
            </HStack>

            <ScrollView mx={5} showsVerticalScrollIndicator={false}>
                <CardDetails
                    title="Equipment"
                    description={`Patrimony ${order.patrimony}`}
                    icon={DesktopTower}
                />

                <CardDetails
                    title="Problem description"
                    description={order.description}
                    icon={ClipboardText}
                    footer={`Register in ${order.when}`}
                />

                <CardDetails
                    title="Solution"
                    icon={CircleWavyCheck}
                    description={order.solution}
                    footer={order.closed && `Finished in ${order.closed}`}
                >
                    {
                        order.status === 'open' &&
                        <Input
                            placeholder="Description solution"
                            onChangeText={setSolution}
                            textAlignVertical="top"
                            multiline
                            h={24}
                        />
                    }
                </CardDetails>
            </ScrollView>

            {
                order.status === 'open' &&
                <Button
                    title="Close request"
                    m={5}
                    onPress={handleOrderClose}
                />
            }

        </VStack>
    );
}