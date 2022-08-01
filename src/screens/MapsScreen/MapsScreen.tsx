import React from "react";
import { View } from "native-base";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Alert, StyleSheet } from "react-native";
import { enableLatestRenderer } from 'react-native-maps';
import { Post, PostItem } from "../../types/Post";

enableLatestRenderer();


const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});


const MapsScreen = () => {
    const [places, setPlaces] = React.useState<PostItem[]>([])

    const fetchPlaces = async () => {
        const response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/2191670220443886325/posts?key=AIzaSyC3EUaK7rbgLXX-yjzxxY-KpFOVDLWUvB8&labels=place`)
        const result = await response.json() as Post
        setPlaces(result.items)
    }

    React.useEffect(() => {
        fetchPlaces()
    }, [])

    return (
        <View flex="1">
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: -6.4392898,
                    longitude: 105.8982807,
                    latitudeDelta: 0.015,
                    longitudeDelta: 1.021,
                    
                }}
            >
                {
                    places.map((place, index) => (
                        <Marker key={index} coordinate={{latitude: place.location?.lat ?? 0, longitude: place.location?.lng ?? 0}} title={place.title} description={place.location?.name}/>

                    ))
                }
            </MapView>
        </View>
    )
}

export default MapsScreen