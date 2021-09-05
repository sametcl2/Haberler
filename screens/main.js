import React, { useState, useEffect } from 'react';
import { View, Dimensions , Text, Image, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Feather';
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from 'react-promise-tracker';
import LinearGradient from 'react-native-linear-gradient';
import { whileStatement } from '@babel/types';

const API_KEY= ''; // API_KEY HERE
const { height, width } = Dimensions.get('window');

const Main = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const fetchData = () => {
        const url = `https://newsapi.org/v2/top-headlines?country=tr&apiKey=${API_KEY}`;
        setData([]);
        trackPromise(
            fetch(url)
                .then(response => response.json())
                .then(json => {setData(json.articles)}
        ))
    }

    const onPress = (url, source) => {
        navigation.navigate('Web', {
            URL: url,
            title: source
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const LoadingView = () => {
        const { promiseInProgress } = usePromiseTracker();
        return (
            promiseInProgress &&
            <LottieView
                source={require('../res/spinner.json')}
                autoPlay
                loop
                style={{ width: 200, height: 200}}
            />
        );
    }

    const _renderItem = ({item, index}, parallaxProps) => {
        return (
            <View index={index} style={styles.container}>
                <ParallaxImage
                    source={{uri: item.urlToImage}}
                    containerStyle={styles.image}
                    style={styles.image}
                    parallaxFactor={0.3}
                    showSpinner={true}
                    {...parallaxProps}
                />
                <View style={styles.bottom}>
                    <Text style={styles.text}>{item.title}</Text>
                    <TouchableOpacity onPress={() => onPress(item.url, item.source.name)}>
                        <View style={styles.button}>
                            <Text style={{color: "white", fontWeight: "bold", fontSize: 15, fontFamily:'Martel-ExtraBold',}}>OKU</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="black"/>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                {
                    data == '' ?
                        <LoadingView />
                        :
                        <>
                            <View style={styles.header}>
                                <Text style={{fontSize: 26, fontFamily: 'Martel-Black', margin: 'auto'}}>Türkiye'de öne çıkanlar</Text>
                            </View>
                            <Carousel
                                data={data}
                                renderItem={_renderItem}
                                sliderWidth={width }
                                itemWidth={width / 1.2}
                                sliderHeight={height}
                                itemHeight={height}
                                containerCustomStyle={{ overflow: 'visible' }}
                                contentContainerCustomStyle={{ overflow: 'visible' }}
                                enableMomentum={true}
                                layout={'default'}
                                onSnapToItem={ index => setActiveIndex(index) }
                                hasParallaxImages={true}
                            />
                            {
                                <Pagination
                                    dotsLength={data.length}
                                    containerStyle={{marginHorizontal: -15}}
                                    activeDotIndex={activeIndex}
                                    dotStyle={{
                                        width: 15,
                                        height: 15,
                                        backgroundColor: '#000000'
                                    }}
                                    inactiveDotStyle={{
                                        width: 3,
                                        height: 3,
                                        backgroundColor: '#586589'
                                    }}
                                />
                            }
                        </>
                }
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: Platform.select({ ios: 0, android: 1 }),
        alignItems: 'center',
        position: 'relative',
        marginTop: 175,
        width: width - 60,
        height: width + 150,
        position: "relative"
    },
    header: {
        width: 350,
        padding: 10,
        position: 'absolute',
        top: 40,
        left: 27,
        display: 'flex',
        justifyContent: 'center'
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        position: "absolute",
        bottom: 67,
        width: width - 66,
        left: 0,
        backgroundColor: "black"

    },
    image: {
        width: width / 1.2 ,
        height: 300,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        ...StyleSheet.absoluteFillObject,
    },
    button: {
        margin: 22,
        borderWidth: 1,
        padding: 15,
        paddingHorizontal: 22,
        borderColor: "white",
        borderRadius: 20
    },
    text: {
        flex: 1,
        alignItems: 'center',
        fontSize: 17,
        textAlign: 'center',
        fontFamily:'Martel-ExtraBold',
        color: 'white',
        textAlign: 'left',
        marginHorizontal: 15,
        marginVertical: 10,
        fontWeight: "bold"
    }
});

export default Main;