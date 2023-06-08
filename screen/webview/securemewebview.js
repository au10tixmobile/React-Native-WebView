import React, { useState, useEffect, useRef } from "react";
import { Linking, StyleSheet, Platform, View, TextInput} from "react-native";
import { WebView } from 'react-native-webview';
import Permissions from './Permissions';


export default function App() {
  const useMount = func => useEffect(() => func(), []);
  
  
  const useInitialURL = () => {
    const [url, setUrl] = useState(null);
    const [processing, setProcessing] = useState(true);
    // Asking for android permissions
    if(Platform.OS === 'android'){
      Permissions.apply
    }
    useMount(() => {
      const getUrlAsync = async () => {
        // Get the deep link used to open the app
        const initialUrl = await Linking.getInitialURL();
        setUrl(initialUrl);
        
        // setUrl('https://stg.10tix.me/65rV93Ka8MzG9Xpr4GKs');
        setProcessing(false);
      };
      getUrlAsync();
    });
    return { url, processing };
  };
  const { url: initialUrl, processing } = useInitialURL();
  
  function onMessage(data) {
    const dataArray = JSON.parse(data.nativeEvent.data);
    if(dataArray.payload.value === "/success") {
      alert("The session completed successfully");
    } 
  }
  
  return (
    <View>
    <TextInput
    multiline={false}
    placeholder="URL"
    onSubmitEditing={()=>{
      setUrl=value
    }}     
    />
    <WebView source={{ uri: "about:blank" }}
    geolocationEnabled={true}
    mediaPlaybackRequiresUserAction={false}
    javaScriptEnabled={true}
    useWebKit={true}
    allowsInlineMediaPlayback={true}
    javaScriptEnabledAndroid={true}
    onMessage={onMessage}
    />
    </View>
    );
  }
  
  
  const styles = StyleSheet.create({});
  
  