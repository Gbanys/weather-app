import { StyleSheet, Text, View } from "react-native";
import React from "react";

type chatBubbleProps = {
  type: string,
  message: string
};

export default function ChatBubble({ type, message }: chatBubbleProps) {
  return (
    <View style={type === "user" ? styles.userChatBubble : styles.aiChatBubble}>
      <Text style={type === "user" ? styles.userText : styles.aiText}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  userChatBubble: {
    alignSelf: "flex-end", 
    backgroundColor: "white", 
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
    maxWidth: "70%", 
    borderColor: "#1a36d3",
    borderWidth: 1
  },
  aiChatBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#1a36d3",
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
    maxWidth: "70%",
    color: "white"
  },
  userText: {
    color: "#1a36d3"
  },
  aiText: {
    color: "white"
  },
});
