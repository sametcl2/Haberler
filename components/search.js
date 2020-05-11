import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, FlatList, Image, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LottieView from 'lottie-react-native';
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from 'react-promise-tracker';

const API_KEY='7fc981806c254389af08ebb60c3c2d48';

const Search = () => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);

    const handleChange = e => {
        e.preventDefault();
        setSearch(e.nativeEvent.text);
    }

    const handleSubmit = () => {
        trackPromise(
            fetch(`https://newsapi.org/v2/everything?q=${search}&sortBy=popularity&apiKey=${API_KEY}`)
                .then(response => response.json())
                .then(json => setData(json.articles))
        );
        setSearch('');  
        setData('');      
    }

    const handleLink = url => {
        Linking.canOpenURL(url)
            .then(supported => {
                supported && Linking.openURL(url)
            })
    }    
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

    return (
        <View style={{ flex: 1 }}>
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
                        data == '' ? 
                        <LoadingView />
                        :
                        <FlatList
                            data={data}
                            keyExtractor={(item, index) => item.title}
                            renderItem={({item}) => 
                            <TouchableOpacity onPress={() => handleLink(item.url)}>
                            <View style={styles.card}>
                                <View style={styles.title}>
                                    <Text style={{fontSize: 24, fontFamily: 'Martel-Black', lineHeight: 34}}>{item.title}</Text>
                                </View>
                                <View style={{padding: 15, marginBottom: 12, marginTop: -25}}>
                                    <Text style={{fontSize: 13, fontFamily: 'Martel-Regular', lineHeight: 23}}>{item.description}</Text>
                                </View>
                                <Image 
                                    style={{height: 200, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}
                                    source={{uri: `${item.urlToImage}`}}
                                />
                            </View>
                        </TouchableOpacity>
                            }
                        />
                    }
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    searchBar: {
        marginVertical: 30,
        marginBottom: 20,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
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
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30
    },
    main: {
        alignItems: 'center',
    },
    card: {
        flex: 1,
        backgroundColor: '#F0F6F4',
        borderRadius: 20,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.60,
        shadowRadius: 16.00,
        elevation: 20,
    },
    image: {
        height: 200,
    },
    bottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    linkButton: {
        backgroundColor:  '#F85C50',
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        padding: 20
    },
    title: {
        padding: 15,
        justifyContent: "center",
        alignItems: "center"
    },
})

export default Search;