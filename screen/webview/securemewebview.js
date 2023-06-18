import React, { useState } from 'react';
import { View, StatusBar, StyleSheet, TextInput } from 'react-native';
import WebView from 'react-native-webview';

const App = () => {
  const [url, setUrl] = useState('');
  const [editedUrl, setEditedUrl] = useState(url);

  const handleUrlSubmit = () => {
    if (editedUrl.trim() !== '') {
      setUrl(editedUrl.trim());
    }
  };

  function onMessage(data) {
    const dataArray = JSON.parse(data.nativeEvent.data);
    if (dataArray.payload.value === "/success") {
      alert("The session completed successfully");
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={editedUrl}
        onChangeText={setEditedUrl}
        placeholder="Enter URL"
        onSubmitEditing={handleUrlSubmit}
      />
      <WebView
        source={{ uri: url }}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    margin: 10,
    padding: 5,
  },
});

export default App;
