import React from "react";
import { Box, Button, FlatList, Input, Text, View } from "native-base";
import { firebase } from "@react-native-firebase/database";
import moment from "moment";

const ref = firebase.app()
.database("https://pariwisata-banten-c8055-default-rtdb.asia-southeast1.firebasedatabase.app")
.ref("chats")

const CommunityScreen = () => {
    const [auth, setAuth] = React.useState(firebase.app().auth().currentUser)
    const [message, setMessage] = React.useState("")
    const [chats, setChats] = React.useState<any[]>([])

    React.useEffect(() => {
        ref.limitToLast(100).on("value", (snapshot) => {
            if (snapshot.exists()) {
                let result = Object.values(snapshot.val()).reverse()
                result = result.sort((a: any, b: any) => b.dateTime - a.dateTime)
                setChats(result)
            }
        })
    }, [])

    const sendMessage = () => {
        ref.push({
            email: auth?.email,
            message,
            dateTime: (new Date).getTime() / 1000
        })
        setMessage("")
    }

    return (
        <View flex="1">
            <FlatList
            data={chats}
            inverted
            renderItem={({item, index}) => {
                if (item.email === auth?.email) {
                    return (
                        <Box shadow="1" bg="cyan.50" alignSelf="flex-end" mx="4" maxW="5/6" mb="4" rounded="xl" p="3">
                            <Text fontSize="xs">Anda</Text>
                            <Text lineHeight="sm" mt="1" fontSize="md" fontWeight="semibold">{item.message}</Text>
                            <Text fontSize="sm" color="gray.400">{moment.unix(item.dateTime).format('DD MMMM YYYY, HH:mm')}</Text>
                        </Box>
                    )
                } else {
                    return (
                        <Box shadow="1" bg="white" alignSelf="flex-start" mx="4" maxW="5/6" mb="4" rounded="xl" p="3">
                            <Text fontSize="xs">{item.displayName ?? item.email}</Text>
                            <Text lineHeight="sm" mt="1" fontSize="md" fontWeight="semibold">{item.message}</Text>
                            <Text fontSize="sm" color="gray.400">{moment.unix(item.dateTime).format('DD MMMM YYYY, HH:mm')}</Text>
                        </Box>
                    )
                }
            }}
            keyExtractor={(item, index) => index.toString()}
            />
            <Box p="4" flexDir="row" bg="white" shadow="8">
                <Input flex="1" fontSize="md" InputRightElement={
                    <Button onPress={() => sendMessage()} rounded="none" w="1/6" h="full">
                        Kirim
                    </Button>} 
                placeholder="Tulis pesan" value={message} onChangeText={message => setMessage(message)} />
            </Box>
        </View>
    )
}

export default CommunityScreen