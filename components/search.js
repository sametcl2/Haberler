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
            fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`)
                .then(response => response.json())
                .then(json => setData(json.articles))
        );

        setSearch('');        
    }

    const handleLink = url => {
        Linking.canOpenURL(url)
            .then(supported => {
                supported && Linking.openURL(url)
            })
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
                        keyExtractor={(item, index) => item.title}
                        renderItem={({item}) => 
                            <View style={styles.card}>
                                <View style={styles.title}>
                                    <Text style={{fontSize: 20, fontWeight: "bold"}}>{item.title}</Text>
                                </View>
                                <Image 
                                    style={styles.image}
                                    source={{uri: `${item.urlToImage}`}}
                                />
                                <View style={{padding: 15, marginBottom: 12}}>
                                    <Text style={{fontSize: 15}}>{item.description}</Text>
                                </View>
                                <View style={styles.bottom}>    
                                    <View style={{marginLeft: 15}}>
                                        <Text style={{fontWeight: "bold"}}>{item.author}</Text>
                                        <Text style={{fontWeight: "bold"}}>{item.publishedAt}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => handleLink(item.url)}>
                                        <View style={styles.linkButton}>
                                            <Icon name="arrow-right" size={34} style={{color: '#F5F2F0'}}/>
                                        </View>
                                    </TouchableOpacity>
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
        marginBottom: 20,
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
    main: {
        flex: 1,
    },
    card: {
        flex: 1,
        backgroundColor: 'lightgray',
        borderRadius: 20,
        margin: 10
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
        padding: 10,
        justifyContent: "center",
        alignItems: "center"
    },
})

export default Search;