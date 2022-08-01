import { View } from "native-base";
import React from "react";
import { ActivityIndicator } from "react-native";
import auth from "@react-native-firebase/auth"
import { useNavigation } from "@react-navigation/native";

const AuthScreen = () => {
    const navigation = useNavigation()

    React.useEffect(() => {
        auth().onAuthStateChanged(user => {
            if (user?.email) {
                navigation.replace('HomeScreen')
            } else {
                navigation.replace('LoginScreen')
            }
        })
    }, [])
    return (
        <View flex="1" justifyContent="center" alignItems="center">
            <ActivityIndicator size="large"/>
        </View>
    )
}

export default AuthScreen