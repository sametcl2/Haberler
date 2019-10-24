import React, {useState, useEffect} from 'react';
import { View, Dimensions , Text, Image, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';

const API_KEY='7fc981806c254389af08ebb60c3c2d48';
const { height, width } = Dimensions.get('window');


const Main = () => {

    const [data, setData] = useState('');

    const fetchData = () => {
        const url = `https://newsapi.org/v2/top-headlines?country=tr&apiKey=${API_KEY}`;
        fetch(url)
            .then(response => response.json())
            .then(json => {
                setData(json.articles);
            })
    }
    
    useEffect(() => {
        fetchData();
    }, []);

    const _renderItem = ({item, index}) => {
        return (
            <View style={styles.container} index={index}>
                 <View style={styles.item}>
                    <Image source={{ uri: `${item.urlToImage}` }} style={styles.image} />
                    <Text style= {styles.text}>{item.title}</Text>
                 </View>
            </View>
        );
    }

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <LinearGradient colors={['#D4F9FE', '#B4B0BE']}>
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
                    layout={'stack'}
                />
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
    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: width / 1.2 ,
        height: 300,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    text: {
        width: width / 1.2,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: '#F5F2F0',
        fontSize: 15,
        padding: 10,
        textAlign: 'center'
    }
});

export default Main;