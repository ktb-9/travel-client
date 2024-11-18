import { Text, TouchableOpacity, View, Modal } from "react-native";
import styles from "./styles";
import { CATEGORIES } from "@/constants/default";
import { categoryModalState } from "@/types/payment/payment";

const CategoryModal = ({
  isDropdownVisible,
  setDropdownVisible,
  handleCategorySelect,
}: categoryModalState) => {
  return (
    <Modal
      visible={isDropdownVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setDropdownVisible(false)}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setDropdownVisible(false)}
      >
        <View style={styles.dropdownContainer}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={styles.dropdownItem}
              onPress={() => handleCategorySelect(category)}
            >
              <Text style={styles.dropdownItemText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
export default CategoryModal;
