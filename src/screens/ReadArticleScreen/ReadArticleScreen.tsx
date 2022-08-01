import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, Text, View } from "native-base";
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from "react-native";
import moment from "moment";

type Props = NativeStackScreenProps<any, 'ReadArticleScreen'>
const ReadArticleScreen = ({route, navigation}: Props) => {
    const { width } = useWindowDimensions();

    React.useEffect(() => {
        navigation.setOptions({title: route.params?.header})
    }, [])

    return (
        <ScrollView p="4" bg="white">
            <Text fontSize="4xl" lineHeight="xs" fontWeight="bold">{route.params?.title}</Text>
            <Text fontSize="md" mt="3">{moment(route.params?.published).format('dddd, DD MMMM YYYY, HH:mm')}</Text>

            <View mb="10">

            <RenderHtml
                contentWidth={width}
                source={{html: `<div style="color: black">${route.params?.content}</div>`}}
                />
                </View>
        </ScrollView>
    )
}

export default ReadArticleScreen