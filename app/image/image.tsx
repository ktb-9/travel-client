import { View } from "react-native";
import WebView from "react-native-webview";
import Header from "./header/header";

const ImageView = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />

      <WebView source={{ uri: "http://localhost:3000/" }} style={{ flex: 1 }} />
    </View>
  );
};

export default ImageView;
