import React, { useState, useEffect, useRef } from "react";
import { Linking, StyleSheet, Platform} from "react-native";
import { WebView } from 'react-native-webview';
import Permissions from './Permissions'


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
    <WebView source={{ uri: initialUrl }}
    userAgent="Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004; Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
    geolocationEnabled={true}
    mediaPlaybackRequiresUserAction={false}
    javaScriptEnabled={true}
    useWebKit={true}
    allowsInlineMediaPlayback={true}
    javaScriptEnabledAndroid={true}
    onMessage={onMessage}
    />
  );
}


const styles = StyleSheet.create({});

