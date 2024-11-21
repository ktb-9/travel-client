import { Text, View, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from "react";
import styles from "./styles";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { io, Socket } from "socket.io-client";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useRecoilValue } from "recoil";
import authState from "@/recoil/authState";
import { AXIOS_BASE_URL } from "@/constants/api";
type RouteParams = {
  id: string;
};
const Header = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const route = useRoute<RouteProp<{ params: RouteParams }, "params">>();
  const encodedId = route.params?.id;

  const decodedId = decodeURIComponent(encodedId); // URL 디코딩
  const userValue = useRecoilValue(authState);

  const [fontsLoaded] = useFonts({
    NotoBlack: require("@/assets/fonts/NotoSansKR-Bold.ttf"),
    robotoBold: require("@/assets/fonts/Roboto-Bold.ttf"),
  });

  useEffect(() => {
    // Socket connection setup
    const newSocket = io(AXIOS_BASE_URL, {
      transports: ["websocket"],
      autoConnect: true,
      reconnection: true,
    });

    // Connection event handlers
    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
      // Get user role after connection
      newSocket.emit("getMembers", { groupId: parseInt(decodedId) });
    });

    newSocket.on("connect_error", (error) => {
      console.error("Connection error:", error);
      Alert.alert("연결 오류", "서버 연결에 실패했습니다.");
    });

    newSocket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    // Event handlers
    newSocket.on("membersList", (data) => {
      const currentUser = data.members.find(
        (member: any) => member.user_id === userValue.id
      );
      if (currentUser) {
        setUserRole(currentUser.role);
      }
    });

    newSocket.on("groupDeleted", () => {
      router.push("/home/home");
    });

    newSocket.on("memberLeft", () => {
      router.push("/home/home");
    });

    newSocket.on("error", (error: { message: string }) => {
      Alert.alert("오류", error.message);
      console.log(error.message);
    });

    // Save socket to state
    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      if (newSocket) {
        newSocket.off("connect");
        newSocket.off("connect_error");
        newSocket.off("disconnect");
        newSocket.off("membersList");
        newSocket.off("groupDeleted");
        newSocket.off("memberLeft");
        newSocket.off("error");
        newSocket.disconnect();
      }
    };
  }, [decodedId, router, userValue.id]);

  const handleBackPress = () => {
    if (!socket) {
      Alert.alert("오류", "서버에 연결되지 않았습니다.");
      return;
    }

    Alert.alert(
      "그룹 나가기",
      userRole === "HOST"
        ? "호스트가 나가면 그룹이 삭제됩니다. 계속하시겠습니까?"
        : "그룹에서 나가시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "확인",
          onPress: () => {
            socket.emit("leaveGroup", {
              groupId: parseInt(decodedId),
              userId: userValue.id,
            });
            router.push("/home/home");
          },
        },
      ]
    );
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>여행 그룹 생성</Text>
    </View>
  );
};

export default Header;
