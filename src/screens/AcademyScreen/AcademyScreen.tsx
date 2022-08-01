import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { Button, FlatList, HStack, Image, Pressable, Text, View } from "native-base";
import React from "react";
import { ActivityIndicator, Alert } from "react-native";
import { Post, PostItem } from "../../types/Post";

const AcademyScreen = () => {
    const [articles, setArticles] = React.useState<PostItem[]>([])
    const [fetching, setFetching] = React.useState(true)
    const [active, setActive] = React.useState("low")
    const navigation = useNavigation<any>()

    const fetchArticles = async () => {
        const response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/2191670220443886325/posts?key=AIzaSyC3EUaK7rbgLXX-yjzxxY-KpFOVDLWUvB8&labels=${active}`)
        const result = await response.json() as Post
        
        setArticles(result.items)
        setFetching(false)
    }

    React.useEffect(() => {
        setFetching(true)
        fetchArticles()
    }, [active])


    if (fetching) {
        return (
            <View flex={1} justifyContent="center" alignItems="center" bg="white">
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <FlatList
            bg="white"
            ListHeaderComponent={
                <HStack m="4" space="2">
                    <Button onPress={() => setActive('low')} variant="solid" colorScheme={active === 'low' ? 'blue' : 'gray'} px="4" rounded="xl">Low</Button>
                    <Button onPress={() => setActive('middle')} variant="solid" colorScheme={active === 'middle' ? 'blue' : 'gray'} px="4" rounded="xl">Middle</Button>
                    <Button onPress={() => setActive('advance')} variant="solid" colorScheme={active === 'advance' ? 'blue' : 'gray'} px="4" rounded="xl">Advance</Button>
                </HStack>
            }
            data={articles}
            renderItem={({ item }) => (
                <Pressable p="4" mx="4" borderRadius="xl" bg="white" mb="2" flexDir="row" android_ripple={{color: "#ccc"}} borderColor="gray.300" borderWidth="2" onPress={() => navigation.navigate('ReadArticleScreen', {header: "Deswita Academy", ...item})}>
                    <Image alt="logo" source={require("../../assets/img/travel-guide.png")} height="16" width="16"/>
                    <View flex="1" ml="4">
                        <Text fontSize="xl" lineHeight="xs" fontWeight="bold">{item.title}</Text>
                        <Text fontSize="md" color="gray.500" mt="2">{moment(item.published).format('dddd, DD MMMM YYYY')}</Text>
                    </View>
                </Pressable>
            )}
            keyExtractor={(item, index) => index.toString()}
        />
    )
}

export default AcademyScreen