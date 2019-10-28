import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LottieView from 'lottie-react-native';

const API_KEY='7fc981806c254389af08ebb60c3c2d48';

const News = () => {

    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [isLoad, setIsLoad] = useState(false);

    const handleChange = e => {
        e.preventDefault();
        setSearch(e.nativeEvent.text);
    }

    const handleSubmit = () => {
        fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`)
            .then(response => response.json())
            .then(json => setData(json.articles))
        setIsLoad(true);
        setSearch('');        
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
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {
                    isLoad == false
                    ? 
                    <LottieView
                        source={require('../loading.json')}
                        autoPlay
                        loop
                        style={{width: 100, height: 100}}
                    />  
                    :
                    <Text>Çalışıyor</Text> 
                }
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
    }
})

export default News;