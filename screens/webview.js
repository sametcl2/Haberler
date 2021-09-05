import React from 'react';
import { View, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import LottieView from 'lottie-react-native';

const MyWeb = ({ route, navigation }) => {
    const { URL } = route.params;
    var url = JSON.stringify(URL);

    const hideIndicator = () => {
        setShowIndicator(false);
    }

    const ActivityIndicatorElement = () => {
        return (
            <LottieView
                source={require('../res/spinner.json')}
                autoPlay
                loop
            />
        );
    };

    return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
             <WebView 
                style = {{flex: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height}} 
                source={{ uri: `${url.substring(1, url.length-1)}` }}
                renderLoading={ActivityIndicatorElement}
                startInLoadingState={true}
            />
        </View>
    );
}

export default MyWeb;