//react navigation
import { NavigationContainer } from "@react-navigation/native";
//screens
import { Signin } from "../screens/Signin";
//AppRoutes
import { AppRoutes } from "./app.routes";

export function Routes() {
    return (
        <NavigationContainer>
            <AppRoutes />
        </NavigationContainer>
    )
}