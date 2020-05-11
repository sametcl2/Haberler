import React, { useState, useEffect } from 'react';
import { View, Dimensions , Text, Image, StyleSheet, TouchableOpacity, Linking, StatusBar } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Feather';
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from 'react-promise-tracker';

const API_KEY='7fc981806c254389af08ebb60c3c2d48';
const { height, width } = Dimensions.get('window');

const Main = () => {

    const [data, setData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const fetchData = () => {
        const url = `https://newsapi.org/v2/top-headlines?country=tr&apiKey=${API_KEY}`;
        setData([]);
        trackPromise(
            fetch(url)
                .then(response => response.json())
                .then(json => {
                    setData(json.articles);
                })
        )
    }

    const onPress = item => {
        Linking.canOpenURL(item.url)
            .then(supported => {
                supported && Linking.openURL(item.url)
            })
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
                style={{ width: 250, height: 250}}
            />
        );
    }

    const _renderItem = ({item, index}) => {
        return (
            <View style={styles.container} index={index}>
                <Image source={{ uri: `${item.urlToImage}` }} style={styles.image} />
                <View style={styles.bottom}>
                    <Text style={styles.text}>{item.title}</Text>
                    <TouchableOpacity onPress={() => onPress(item)}>
                        <View style={styles.button}>
                            <Icon name="arrow-right" size={34} style={{color: '#F5F2F0'}}/>
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
                 <View style={styles.header}>
                    <Text style={{fontSize: 25, fontFamily: 'Martel-Black', margin: 'auto'}}>Türkiye'de öne çıkanlar</Text>
                </View>
                {
                    data == '' ?
                        <LoadingView /> 
                        :
                        <>
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
        alignItems: 'center',
        position: 'relative',
        marginTop: 120
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
        backgroundColor: '#000000',
        width: width / 1.2,
    },
    image: {
        width: width / 1.2 ,
        height: 300,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    button: {
        padding: 22,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    text: {
        flex: 1,
        alignItems: 'center',
        fontSize: 13,
        textAlign: 'center',
        fontFamily:'Martel-ExtraBold',
        color: 'white',
        textAlign: 'left',
        marginHorizontal: 20,
        marginVertical: 8,
    }
});

export default Main;