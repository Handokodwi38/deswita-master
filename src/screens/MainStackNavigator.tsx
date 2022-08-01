import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./LoginScreen/LoginScreen";
import HomeScreen from "./HomeScreen/HomeScreen";
import MapsScreen from "./MapsScreen/MapsScreen";
import AcademyScreen from "./AcademyScreen/AcademyScreen";
import ReadArticleScreen from "./ReadArticleScreen/ReadArticleScreen";
import NewsScreen from "./NewsScreen/NewsScreen";
import CommunityScreen from "./CommunityScreen/CommunityScreen";
import DynamicScreen from "./DynamicScreen/DynamicScreen";
import AuthScreen from "./AuthScreen";

const Stack = createNativeStackNavigator()

const MainStackNavigator = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="AuthScreen" screenOptions={{
                headerShown: false,
                animation: "slide_from_right"
            }}>
                <Stack.Screen name="AuthScreen" component={AuthScreen}/>
                <Stack.Screen name="MapsScreen" component={MapsScreen} options={{headerShown: true, title: "Sebaran Wisata"}}/>
                <Stack.Screen name="HomeScreen" component={HomeScreen}/>
                <Stack.Screen name="AcademyScreen" component={AcademyScreen} options={{headerShown: true, title: "Deswita Academy"}}/>
                <Stack.Screen name="NewsScreen" component={NewsScreen} options={{headerShown: true, title: "Berita"}}/>
                <Stack.Screen name="ReadArticleScreen" component={ReadArticleScreen} options={{headerShown: true, title: "Deswita Academy"}}/>
                <Stack.Screen name="DynamicScreen" component={DynamicScreen} options={{headerShown: true, title: "Deswita Academy"}}/>
                <Stack.Screen name="LoginScreen" component={LoginScreen}/>
                <Stack.Screen name="CommunityScreen" component={CommunityScreen} options={{headerShown: true, title: "Komunitas"}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStackNavigator