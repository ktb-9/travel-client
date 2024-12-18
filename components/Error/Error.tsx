import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { HTTP_ERROR_MESSAGE, HTTP_STATUS_CODE } from "../../constants/api";
import { Ionicons } from "@expo/vector-icons";

export interface ErrorProps {
  statusCode?: number;
  resetError?: () => void;
}

const Error = ({
  statusCode = HTTP_STATUS_CODE.NOT_FOUND,
  resetError,
}: ErrorProps) => {
  const currentStatusCode =
    statusCode === HTTP_STATUS_CODE.CONTENT_TOO_LARGE
      ? HTTP_STATUS_CODE.BAD_REQUEST
      : statusCode;

  const statusCodeKey =
    currentStatusCode.toString() as unknown as keyof typeof HTTP_ERROR_MESSAGE;

  if (!(statusCodeKey in HTTP_ERROR_MESSAGE)) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.decorationBar} />
        <View style={styles.content}>
          {/* Error Icon */}
          <View style={styles.iconContainer}>
            <Ionicons name="alert-circle" size={48} color="#fff" />
          </View>

          {/* Error Code */}
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>Error {currentStatusCode}</Text>
          </View>

          {/* Error Message */}
          <Text style={styles.heading}>
            {HTTP_ERROR_MESSAGE[statusCodeKey].HEADING}
          </Text>
          <Text style={styles.body}>
            {HTTP_ERROR_MESSAGE[statusCodeKey].BODY}
          </Text>

          {/* Reset Button */}
          {resetError && (
            <TouchableOpacity
              style={styles.button}
              onPress={resetError}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>
                {HTTP_ERROR_MESSAGE[statusCodeKey].BUTTON}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
    maxWidth: 400,
    overflow: "hidden",
  },
  decorationBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 8,
    backgroundColor: "#007AFF", // iOS primary color
  },
  content: {
    padding: 24,
    alignItems: "center",
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  codeContainer: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 16,
  },
  codeText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
    textAlign: "center",
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Error;
