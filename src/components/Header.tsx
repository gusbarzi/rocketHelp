//native bases
import { HStack, Heading, IconButton, useTheme, StyledProps } from 'native-base';
//react navigation
import { useNavigation } from '@react-navigation/native';
//colors
import colors from 'native-base/lib/typescript/theme/base/colors';
//Phosphor
import { CaretLeft } from 'phosphor-react-native';

type Props = StyledProps & {
    title: string;
}

export function Header({ title, ...rest}: Props) {
    const { colors } = useTheme();

    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }

  return (
    <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pb={6}
        pt={12}
        {...rest}
    >

        <IconButton 
            icon={<CaretLeft color={colors.gray[200]} size={24} />}
            onPress={handleGoBack}
        />

        <Heading color="gray.100" textAlign="center" fontSize="lg" flex={1} ml={-6}>
            {title}
        </Heading>

    </HStack>
  );
}