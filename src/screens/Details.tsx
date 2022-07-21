//React bases
import { VStack, Text } from 'native-base';
//components
import { Header } from '../components/Header';
//react navigation
import { useRoute } from '@react-navigation/native';

type RouteParams = {
    orderId: string; 
}


export function Details() {
    const route = useRoute();
    const { orderId} = route.params as RouteParams;

    return (
        <VStack flex={1} bg="gray.700">
            <Header title="solicitations" />
            <Text color="white">
                {orderId}
            </Text>
        </VStack>
    );
}