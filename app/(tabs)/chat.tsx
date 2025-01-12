import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import axios from 'axios';
import { useConversation } from "@/context/ConversationContext";
import ChatBubble from '@/components/chatBubble';

export default function ChatScreen() {
  const { conversationData, setConversationData } = useConversation();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    setConversationData([{ type: "ai", message: "Hello, how can I assist you today?" }]);
    setIsLoading(false);
  }, []);

  const handleSendMessage = async () => {
    if (!message) {
      return;
    }
    try {
        setConversationData([
            ...conversationData,
            { type: "user", message: message }
        ])
        setMessage("");
        const payload = {
            input: message,
            history: conversationData,
            };
        console.log("Sending payload:", payload);
        axios({
            method: 'post',
            baseURL: "http://192.168.0.33:8000",
            url: '/agent_answer',
            data: JSON.stringify(payload),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            console.log(response.data);
            const agentResponse = response.data.response;
            setConversationData([
                ...conversationData,
                { type: "user", message: message },
                { type: "ai", message: agentResponse }
            ]);
        })
        .catch(error => {
            console.error(error);
        });
        } catch (error) {
        console.error("Error sending message:", error);
        }
    };

  return (
    <View style={styles.container}>
      <View style={styles.chatContainer}>
        {isLoading ? (
          <Text style={styles.loadingText}>Loading conversation...</Text>
        ) : (
          conversationData.map((message_object: { type: string; message: string; }, index: number) => (
            <ChatBubble 
              key={index} 
              type={message_object.type} 
              message={message_object.message} />
          ))
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputBox}
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    justifyContent: "space-between", // Ensures chat and input box are separated
  },
  chatContainer: {
    flex: 1, // Takes up available space
    marginBottom: 20, // Space above the input box
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  inputBox: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "black",
  },
});
