import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { Box, Button, FlatList, HStack, Image, Pressable, Text, View } from "native-base";
import React from "react";
import { ActivityIndicator, Alert } from "react-native";
import { Post, PostItem } from "../../types/Post";

const NewsScreen = () => {
    const [articles, setArticles] = React.useState<PostItem[]>([])
    const [fetching, setFetching] = React.useState(true)
    const [active, setActive] = React.useState("low")
    const navigation = useNavigation<any>()

    const fetchArticles = async () => {
        const response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/2191670220443886325/posts?key=AIzaSyC3EUaK7rbgLXX-yjzxxY-KpFOVDLWUvB8&labels=news`)
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
            <View flex={1} justifyContent="center" alignItems="center">
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <FlatList
            bg="white"
            data={articles}
            renderItem={({ item }) => (
                <Pressable p="4" borderBottomWidth={1} borderBottomColor="gray.300" borderRadius="xl" bg="white" mt="2" android_ripple={{color: "#ccc"}} onPress={() => navigation.navigate('ReadArticleScreen', {header: "Berita", ...item})}>
                    <Text fontSize="xl" lineHeight="xs" fontWeight="bold">{item.title}</Text>
                    

                    <Text fontSize="md" color="gray.500" mt="2">{moment(item.published).format('dddd, DD MMMM YYYY')}</Text>
                </Pressable>
            )}
            keyExtractor={(item, index) => index.toString()}
        />
    )
}

export default NewsScreen