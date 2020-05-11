import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Image, Linking } from 'react-native';
import LottieView from 'lottie-react-native';
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from 'react-promise-tracker';
import { FloatingAction } from "react-native-floating-action";


const API_KEY='7fc981806c254389af08ebb60c3c2d48';

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

const News = () => {

    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [currentTopic, setCurrentTopic] = useState('');
    const [page, setPage] = useState(1);

    const handleFetch = topic => {
        setData([]);
        setRefreshing(true);
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
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {
                data == '' ? 
                <LoadingView />
                : 
                <FlatList
                data={data}
                keyExtractor={(item, index) => item.title}
                onEndReached={() => handleFetch(currentTopic)}
                refreshing={refreshing}
                onRefresh={() => handleFetch(currentTopic)}
                renderItem={({item}) => 
                <TouchableOpacity onPress={() => handleLink(item.url)}>
                    <View style={styles.card}>
                        <View style={styles.title}>
                            <Text style={{fontSize: 24, fontFamily: 'Martel-Black', lineHeight: 34}}>{item.title}</Text>
                        </View>
                        <View style={{padding: 15, marginBottom: 12, marginTop: -30}}>
                            <Text style={{fontSize: 13, fontFamily: 'Martel-Regular', lineHeight: 23}}>{item.description}</Text>
                        </View>
                        <Image 
                            style={{height: 200}}
                            source={{uri: `${item.urlToImage}`}}
                        />
                        <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                            marginTop: 30,
                            marginBottom: -10
                        }}
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
    // titles: {
    //     fontFamily: 'font',
    //     fontSize: 25
    // }
});

export default News;