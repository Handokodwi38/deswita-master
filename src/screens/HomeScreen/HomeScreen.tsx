import React from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import { Button, HStack, Image, Pressable, ScrollView, Text, VStack } from "native-base";
import auth from "@react-native-firebase/auth"

const HomeScreen = () => {
    const [logouting, setLogouting] = React.useState(false)
    const navigation = useNavigation<any>()

    const logout = () => {
        setLogouting(true)
        GoogleSignin.isSignedIn().then((user) => {
            GoogleSignin.signOut()
        })
        auth().signOut().then((user) => {
            // navigation.replace('LoginScreen')
            setLogouting(false)
        }).catch(() => {
            setLogouting(false)
        })
    }

    return (
        <ScrollView bgColor="white" py="6">
            <Image w="64" h="80" alt="banner" alignSelf="center" source={require("../../assets/img/logo.png")}/>
            
            <HStack mx="4" space="4" mt="4">
                <Pressable flex="1" rounded="xl" android_ripple={{color: "#2980b9"}} p="6" bg="cyan.100" onPress={() => navigation.navigate("MapsScreen")}>
                    <Image source={require("../../assets/img/map.png")} w="16" h="16" alt="logo"/>
                    <Text mt="3" fontSize="2xl" lineHeight="xs" fontWeight="bold">Sebaran Wisata</Text>
                </Pressable>
                
                <Pressable flex="1" rounded="xl" android_ripple={{color: "#2980b9"}} p="6" bg="cyan.100" onPress={() => navigation.navigate("NewsScreen")}>
                    <Image source={require("../../assets/img/newspaper.png")} w="16" h="16" alt="logo"/>
                    <Text mt="3" fontSize="2xl" lineHeight="xs" fontWeight="bold">Berita Pariwisata</Text>
                </Pressable>
            </HStack>
            
            <HStack mx="4" mt="4" space="4">
                <Pressable flex="1" rounded="xl" android_ripple={{color: "#2980b9"}} p="6" bg="cyan.100" onPress={() => navigation.navigate("AcademyScreen")}>
                    <Image source={require("../../assets/img/travel-guide.png")} w="16" h="16" alt="logo"/>
                    <Text mt="3" fontSize="2xl" lineHeight="xs" fontWeight="semibold">Deswita Academy</Text>
                </Pressable>
                
                <Pressable flex="1" rounded="xl" android_ripple={{color: "#2980b9"}} p="6" bg="cyan.100" onPress={() => navigation.navigate("CommunityScreen")}>
                    <Image source={require("../../assets/img/chat.png")} w="16" h="16" alt="logo"/>
                    <Text mt="3" fontSize="2xl" lineHeight="xs" fontWeight="semibold">Deswita Community</Text>
                </Pressable>
            </HStack>
            
            <HStack mx="4" mt="4" space="4" mb="6">
                <Pressable flex="1" rounded="xl" android_ripple={{color: "#2980b9"}} p="6" bg="cyan.100" onPress={() => navigation.navigate("DynamicScreen", {title: "Tentang Kami", url: "https://www.googleapis.com/blogger/v3/blogs/2191670220443886325/pages/1828114782066083104?key=AIzaSyC3EUaK7rbgLXX-yjzxxY-KpFOVDLWUvB8"})}>
                    <Image source={require("../../assets/img/about.png")} w="16" h="16" alt="logo"/>
                    <Text mt="3" fontSize="2xl" lineHeight="xs" fontWeight="semibold">Tentang Kami</Text>
                </Pressable>
                
                <Pressable flex="1" rounded="xl" android_ripple={{color: "#2980b9"}} p="6" bg="cyan.100" onPress={() => navigation.navigate("DynamicScreen", {title: "Pusat Bantuan", url: "https://www.googleapis.com/blogger/v3/blogs/2191670220443886325/pages/5456137854338670851?key=AIzaSyC3EUaK7rbgLXX-yjzxxY-KpFOVDLWUvB8"})}>
                    <Image source={require("../../assets/img/help-desk.png")} w="16" h="16" alt="logo"/>
                    <Text mt="3" fontSize="2xl" lineHeight="xs" fontWeight="semibold">Pusat Bantuan</Text>
                </Pressable>
            </HStack>

            <Button isLoading={logouting} mb="10" mx="4" onPress={() => logout()}>
                Logout
            </Button>
        </ScrollView>
    )
}

export default HomeScreen