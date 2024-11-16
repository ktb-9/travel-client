import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import check from "@/assets/images/check.png";
import checked from "@/assets/images/checked.png";
import { PaymentType, UserListProps, UserType } from "@/types/payment/payment";

const UserList: React.FC<UserListProps> = ({
  value,
  onPaymentUserCheck,
  onUserGroupAdd,
}) => {
  const users: UserType[] = [
    { id: 1, name: "사공광열", isMe: true },
    { id: 2, name: "카리나", isMe: false },
    // 다른 사용자들 추가 가능
  ];

  return (
    <View style={styles.nBbangSection}>
      <Text style={styles.nBbangTitle}>n빵 하기</Text>
      <View style={styles.userContainer}>
        {users.map((user) => (
          <View key={user.id} style={styles.userRow}>
            <View style={styles.userInfo}>
              <View style={styles.userAvatar} />
              <Text style={styles.userName}>
                {user.isMe ? "(나) " : ""}
                {user.name}
              </Text>
            </View>
            <View style={styles.checkContainer}>
              <View style={styles.checkItem}>
                <Text style={styles.checkLabel}>결제</Text>
                <TouchableOpacity
                  style={styles.checkCircle}
                  onPress={() => onPaymentUserCheck(user.id)}
                >
                  <Image
                    style={styles.checked}
                    source={value.pay === user.id ? checked : check}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.checkItem}>
                <Text style={styles.checkLabel}>n빵</Text>
                <TouchableOpacity
                  style={styles.checkCircle}
                  onPress={() => onUserGroupAdd(user.id)}
                >
                  <Image
                    style={styles.checked}
                    source={value.group.includes(user.id) ? checked : check}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
export default UserList;
