import { View } from "react-native";
import WebView from "react-native-webview";
import Header from "./header/header";
import { WEB } from "@/constants/api";
const ImageView = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />

      <WebView source={{ uri: WEB }} style={{ flex: 1 }} />
    </View>
  );
};

export default ImageView;
