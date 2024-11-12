import { View } from "react-native";
import WebView from "react-native-webview";
import Header from "./header/header";
import { useEffect, useRef } from "react";

const ImageView = () => {
  const webViewRef = useRef<WebView>(null);
  // 웹뷰가 로드되면
  const onLoad = () => {
    const groupId = 1;
    const postId = 1;
    // 데이터를 직렬화 해서 전송
    if (webViewRef.current) {
      webViewRef.current.postMessage(JSON.stringify({ groupId, postId }));
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <WebView
        ref={webViewRef as any}
        source={{ uri: "http://localhost:3000/" }}
        style={{ flex: 1 }}
        onLoad={onLoad}
      />
    </View>
  );
};

export default ImageView;
