import React from "react";
import { View, Text, Modal, FlatList, TouchableOpacity } from "react-native";
import styles from "./style";
import Button from "@/components/common/Button/button";
import getPreviousGroupQuery from "@/hooks/api/getPreviousGroupQuery";
import { useRouter } from "expo-router";

interface ListProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const List = ({ modalVisible, setModalVisible }: ListProps) => {
  const router = useRouter();
  const { data } = getPreviousGroupQuery();
  const closeModal = () => {
    setModalVisible(false);
  };

  const renderGroupItem = ({
    item,
    index,
  }: {
    item: string;
    index: number;
  }) => (
    <TouchableOpacity
      style={styles.groupItemContainer}
      onPress={() => {
        router.push(`/group/join/${item}`);
        closeModal();
      }}
    >
      <Text style={styles.groupItemText}>스케쥴 방: {item}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>스케쥴 방 리스트</Text>
            <Button
              variant="icon"
              icon={{ name: "close", size: 24, color: "#000" }}
              style={styles.closeButton}
              onPress={closeModal}
            />
          </View>

          {/* Group List */}
          <FlatList
            data={data}
            renderItem={renderGroupItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>그룹이 존재하지 않음</Text>
              </View>
            }
            contentContainerStyle={styles.listContent}
          />
        </View>
      </View>
    </Modal>
  );
};

export default List;
