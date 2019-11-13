import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Image, Linking, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LottieView from 'lottie-react-native';
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from 'react-promise-tracker';

const API_KEY='7fc981806c254389af08ebb60c3c2d48';

const News = () => {

    const [data, setData] = useState([]);

    const handleFetch = topic => {
        setData([]);
        trackPromise(
            fetch(`https://newsapi.org/v2/top-headlines?country=tr&category=${topic}&apiKey=${API_KEY}`)
                .then(response => response.json())
                .then(json => setData(json.articles))
        )
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
                source={require('../res/loading.json')}
                autoPlay
                loop
                style={{ width: 250, height: 250}}
            />
        );
    }  

    return (
        <View style={{flex: 1}}>
            <View style={styles.buttons}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity onPress={() => handleFetch('business')}>
                        <View style={styles.button}>
                            <Text style={styles.text}>Business</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleFetch('entertainment')}>
                        <View style={styles.button}>
                            <Text style={styles.text}>Entertainment</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleFetch('health')}>
                        <View style={styles.button}>
                            <Text style={styles.text}>Health</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleFetch('science')}>
                        <View style={styles.button}>
                            <Text style={styles.text}>Science</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleFetch('sports')}>
                        <View style={styles.button}>
                            <Text style={styles.text}>Sports</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleFetch('technology')}>
                        <View style={styles.button}>
                            <Text style={styles.text}>Technology</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <View style={styles.news}>
                {
                    data == '' ? 
                    <LottieView 
                        source={require('../res/newspre.json')}
                        autoPlay
                        loop
                        style={{ width: 250, height: 250}}
                    />
                    : 
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => item.title}
                        renderItem={({item}) => 
                        <View style={styles.card}>
                            <View style={styles.title}>
                                <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.title}</Text>
                            </View>
                            <Image 
                                style={{height: 200}}
                                source={{uri: `${item.urlToImage}`}}
                            />
                            <View style={{padding: 15, marginBottom: 12}}>
                                <Text style={{fontSize: 18}}>{item.description}</Text>
                            </View>
                            <View style={styles.bottom}>    
                                <View style={{marginLeft: 15, width: 200}}>
                                    <Text style={{fontWeight: "bold", fontSize: 20}}>{item.source.name}</Text>
                                    <View style={{borderBottomColor: 'black', borderBottomWidth: 1, width: 60, marginVertical: 4}}/>
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
    buttons:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        
    },
    button: {
        backgroundColor: '#F85C50',
        padding: 20,
        borderRadius: 40,
        marginHorizontal: 10,
        
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        paddingHorizontal: 5
    },
    main: {
        alignItems: 'center',
    },
    news: {
        justifyContent: 'center',
        alignItems: 'center'
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
        backgroundColor: '#F85C50',
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        padding: 20
    },
    title: {
        padding: 15,
        justifyContent: "center",
        alignItems: "center"
    },
});

export default News;