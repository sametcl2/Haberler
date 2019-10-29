import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, FlatList, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LottieView from 'lottie-react-native';
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from 'react-promise-tracker';

const API_KEY='7fc981806c254389af08ebb60c3c2d48';
const { height, width } = Dimensions.get('window');

const Search = () => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);

    const handleChange = e => {
        e.preventDefault();
        setSearch(e.nativeEvent.text);
    }

    const handleSubmit = () => {
        trackPromise(
            fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`)
                .then(response => response.json())
                .then(json => setData(json.articles))
        );

        setSearch('');        
    }
    
    const LoadingView = () => {
        const { promiseInProgress } = usePromiseTracker();
        return(
            promiseInProgress &&
            <LottieView
                source={require('../loading.json')}
                autoPlay
                loop
                style={{ width: 250, height: 250}}
            />
        );
    }  

    return (
        <View style={{flex: 1}}>
            <View style={styles.searchBar}>
                <TextInput 
                    value={search}
                    onChange={handleChange}
                    placeholder="Search news"
                    style={styles.search}
                />
                <TouchableOpacity onPress={handleSubmit}>
                    <View style={styles.button}>
                        <Icon name="search" size={30} style={{color: 'white'}}/>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.main}>
                {
                    data != '' &&
                    <FlatList 
                        data={data}
                        renderItem={({item}) => 
                            <View style={styles.card}>
                                <Image 
                                    style={styles.image}
                                    source={{uri: `${item.urlToImage}`}}
                                />
                                <View style={styles.cardDetails}>
                                    <View>
                                        <Text>{item.title}</Text>
                                        <Text>{item.description}</Text>
                                    </View>
                                    <View>
                                        <Text>{item.author}</Text>
                                        <Text>{item.publishedAt}</Text>
                                    </View>
                                </View>
                            </View>
                        }
                    />
                }
                <LoadingView />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    searchBar: {
        marginVertical: 30,
        marginBottom: 70,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row'
    },
    search: {
        height: 40,
        borderColor: 'gray',
        borderRadius: 30,
        borderWidth: 1,
        height: 60,
        width: 300,
        fontSize: 30
    },
    button: {
        height: 60,
        width: 60,
        backgroundColor: '#F85C50',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30
    },
    image: {
        height: 200,
        width: width/4,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25
    },
    main: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15
        
    },
    card: {
        width: width - 30,
        height: 200,
        flexDirection: 'row',
        backgroundColor: '#E6E7E8',
        borderRadius: 25,
        marginBottom: 30
    },
    cardDetails: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        width: width - 30
    }
})

export default Search;