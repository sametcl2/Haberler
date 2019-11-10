import React, { useState, useEffect } from 'react';
import { View, Dimensions , Text, Image, StyleSheet, TouchableOpacity, Linking, StatusBar } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

const API_KEY='7fc981806c254389af08ebb60c3c2d48';
const { height, width } = Dimensions.get('window');

const Main = () => {

    const [data, setData] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);

    const fetchData = () => {
        const url = `https://newsapi.org/v2/top-headlines?country=tr&apiKey=${API_KEY}`;
        fetch(url)
            .then(response => response.json())
            .then(json => {
                setData(json.articles);
            })
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

    const _renderItem = ({item, index}) => {
        return (
            <View style={styles.container} index={index}>
                <StatusBar hidden={true}/>
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
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <LinearGradient colors={['#09203F', '#FFFFFF']}>
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
                        activeDotIndex={activeIndex}
                        dotStyle={{
                            width: 15,
                            height: 15,
                            backgroundColor: '#F85C50'
                        }}
                        inactiveDotStyle={{
                            width: 3,
                            height: 3,
                            backgroundColor: '#586589'
                        }}
                    />
                }
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: '#F5F2F0',
        width: width / 1.2,
    },
    image: {
        width: width / 1.2 ,
        height: 300,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    button: {
        backgroundColor: '#586589',
        padding: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    text: {
        flex: 1,
        alignItems: 'center',
        fontSize: 15,
        padding: 10,
        textAlign: 'center',
    }
});

export default Main;