import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, Text, View } from "native-base";
import RenderHtml from 'react-native-render-html';
import { ActivityIndicator, Alert, useWindowDimensions } from "react-native";
import moment from "moment";

type Props = NativeStackScreenProps<any, 'DynamicScreen'>
const DynamicScreen = ({route, navigation}: Props) => {
    const { width } = useWindowDimensions();
    const [content, setContent] = React.useState("")
    const [fetching, setFetching] = React.useState(true)

    const fetchData = () => {
        fetch(route.params?.url)
        .then((res) => res.json())
        .then((res) => {
            setContent(res.content)
            setFetching(false)
        })
    }

    React.useEffect(() => {
        fetchData()
        navigation.setOptions({title: route.params?.title})
    }, [])

    if (fetching) {
        return (
            <View flex={1} justifyContent="center" alignItems="center">
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <ScrollView p="4" bg="white">

            <View mb="10">

            <RenderHtml
                contentWidth={width}
                source={{html: `<div style="color: black">${content}</div>`}}
                />
                </View>
        </ScrollView>
    )
}

export default DynamicScreen