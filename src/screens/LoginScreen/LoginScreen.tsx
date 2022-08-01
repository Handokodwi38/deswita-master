import React from "react";
import { Box, Button, FormControl, Icon, Image, Input, Text, Toast, View, VStack } from "native-base";
import auth from "@react-native-firebase/auth"
import { Alert, ImageBackground } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";


const LoginScreen = () => {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [logging, setLogging] = React.useState(false)
    
    
    React.useEffect(() => {
        try {
            GoogleSignin.configure({
                webClientId: "135250963748-06hp1apvvb40sjp9qaqmd0nviia7cdk5.apps.googleusercontent.com",
            })

            GoogleSignin.signOut()
            
        } catch (error) {
            console.log(error)
        }
    }, [])

    const loginWithEmail = () => {
        if (! email || ! password) {
            Alert.alert("Perhatian", "Harap isi email dan password")
            return
        }

        setLogging(true)

        auth().signInWithEmailAndPassword(email, password).then((result) => {
            Toast.show({title: "Login sukses"})
            setLogging(false)
        }).catch((err) => {
            Toast.show({title: "Login gagal"})
            setLogging(false)
        })
    }

    const loginWithGoogle = async () => {

        try {
            const { idToken } = await GoogleSignin.signIn()
            const credential = auth.GoogleAuthProvider.credential(idToken)

            auth().signInWithCredential(credential).then((result) => {
                Toast.show({title: "Login sukses"})
                setLogging(false)
            }).catch((err) => {
                Toast.show({title: "Login gagal", description: JSON.stringify(err)})
                setLogging(false)
            })
        } catch (error) {
            Toast.show({title: "err", description: JSON.stringify(error)})
            setLogging(false)
        }
        
    }

    return (
        <View flex="1" justifyContent="center" alignItems="center" bg="white">
            <ImageBackground  source={require("../../assets/img/bg.png")} style={{width: '100%', height: '100%', position: 'absolute'}}/>
            <VStack w="3/4" space="4" alignItems="center">
                <Image source={require("../../assets/img/logo.png")} height={160} width={134} alt="logo"/>
                <FormControl>
                    <FormControl.Label>Email</FormControl.Label>
                    <Input onChangeText={email => setEmail(email)} fontSize="lg" bg="white" borderColor="emerald.700" borderWidth={1}/>
                </FormControl>
                
                <FormControl>
                    <FormControl.Label>Password</FormControl.Label>
                    <Input type="password" onChangeText={password => setPassword(password)} fontSize="lg" bg="white" borderColor="emerald.700" borderWidth={1}/>
                </FormControl>

                <Button w="full" isLoading={logging} size="lg" onPress={() => loginWithEmail()} _text={{fontWeight: "semibold"}}>Login</Button>
                <Button w="full" rounded="full" isLoading={logging} size="lg" bg="white" onPress={() => loginWithGoogle()} _text={{fontWeight: "semibold"}}>
                    <Box flexDir="row" alignItems="center">
                        <Image alt="google" source={{uri: "https://www.google.com/favicon.ico"}} w="4" h="4" mr="4"/>
                        <Text fontWeight="bold">Login Dengan Google</Text>
                    </Box>
                </Button>

            </VStack>
        </View>
    )
}

export default LoginScreen