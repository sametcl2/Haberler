import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Image, Linking } from 'react-native';
import LottieView from 'lottie-react-native';
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from 'react-promise-tracker';
import { FloatingAction } from "react-native-floating-action";


const API_KEY= ''; // API_KEY HERE

const actions = [
    {
      text: "Finans",
      icon: require("../res/business.png"),
      name: "business",
      position: 1,
      color: 'black'
    },
    {
      text: "Magazin",
      icon: require("../res/entertainment.png"),
      name: "entertainment",
      position: 2,
      color: 'black'

    },
    {
      text: "Sağlık",
      icon: require("../res/health.png"),
      name: "health",
      position: 3,
      color: 'black'

    },
    {
      text: "Bilim",
      icon: require("../res/science.png"),
      name: "science",
      position: 4,
      color: 'black'

    },
    {
        text: "Spor",
        icon: require("../res/sports.png"),
        name: "sports",
        position: 5,
      color: 'black'

    },
    {
        text: "Teknoloji",
        icon: require("../res/tech.png"),
        name: 'technology',
        position: 6,
      color: 'black'
    }
  ];

const News = ({ navigation }) => {

    const [data, setData] = useState([]);
    const [currentTopic, setCurrentTopic] = useState('');
    const [page, setPage] = useState(1);

    const handleFetch = topic => {
        setData([]);
        trackPromise(
            fetch(`https://newsapi.org/v2/top-headlines?country=tr&category=${topic}&apiKey=${API_KEY}&page=${page}`)
                .then(response => response.json())
                .then(json => {
                    setData(json.articles);
                    setRefreshing(false);
                    setCurrentTopic(topic);
                    if (page === 3) {
                        setPage(1);
                    } else {
                        setPage(page + 1)
                    }
                })
        )
    }

    const handleLink = (url, source) => {
        navigation.navigate('Web', {
            URL: url,
            title: source
        });
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
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {
                data == '' ? 
                <LoadingView />
                : 
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => item.title}
                    ItemSeparatorComponent={() => <View style={styles.itemSeperator}/>}
                    onEndReached={() => handleFetch(currentTopic)}
                    renderItem={({item}) => 
                    <TouchableOpacity onPress={() => handleLink(item.url, item.source.name)}>
                        <View style={styles.card}>
                            <View style={styles.title}>
                                <Text style={{fontSize: 22, fontFamily: 'Martel-Black', lineHeight: 34}}>{item.title}</Text>
                            </View>
                            <View style={{padding: 14, marginBottom: 12, marginTop: -25}}>
                                <Text style={{fontSize: 15, fontFamily: 'Martel-Light', lineHeight: 23}}>{item.description}</Text>
                            </View>
                            <Image 
                                style={{height: 200}}
                                source={{uri: `${item.urlToImage}`}}
                            />
                        </View>
                    </TouchableOpacity>
                }
            />
            }
            <FloatingAction
                actions={actions}
                color="black"
                openOnMount={true}
                shadow={{shadowOpacity: 4.35, shadowOffset: { width: 5, height: 15 }, shadowColor: "#000000", shadowRadius: 70}}
                onPressItem={name => {
                    handleFetch(name);
                    setPage(1);
                }}
            />           
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
    main: { // backgroundColor: 'white',
        // borderRadius: 20,
        alignItems: 'center',
    },
    news: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        flex: 1,
        margin: 10,
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
        alignItems: "center",
    },
    itemSeperator: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginTop: 20,
        marginHorizontal: 25
    }
});

export default News;