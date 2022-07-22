//react navigation
import { NavigationContainer } from "@react-navigation/native";
//Firebase
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
//screens
import { Signin } from "../screens/Signin";
//AppRoutes
import { AppRoutes } from "./app.routes";
//react hooks
import { useState, useEffect } from "react";
//component
import { Loading } from "../components/Loading";

export function Routes() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User>();

    useEffect(() => {
        const subscriber = auth()
        .onAuthStateChanged(response => {
            setUser(response);
            setLoading(false);
        });

        return subscriber
    }, []);

    if(loading) {
        return <Loading />
    }

    return (
        <NavigationContainer>
            {user ? <AppRoutes /> : <Signin />}
        </NavigationContainer>
    )
}