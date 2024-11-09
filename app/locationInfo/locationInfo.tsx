import { useLocationSearch } from "@/hooks/viewTrip/useLocationSearch";
import { destinationState } from "@/recoil/destinationState";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import WebView from "react-native-webview";
import { useRecoilValue } from "recoil";
import Header from "./header/header";
import styles from "./styles";

const LocationInfo = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useRecoilValue(destinationState);

  const locationSearch = async () => {
    setLoading(true);
    const response = await useLocationSearch(location);

    if (response) {
      const secureUrl = response.replace(/^http:/, "https:");
      setUrl(secureUrl);
    } else {
      console.warn("유효한 url이 아닙니다.");
    }
    setLoading(false);
  };

  useEffect(() => {
    locationSearch();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#4A90E2" />
          <Text style={styles.loadingText}>로딩중...</Text>
        </View>
      ) : (
        <WebView source={{ uri: url }} style={{ flex: 1 }} />
      )}
    </View>
  );
};

export default LocationInfo;
