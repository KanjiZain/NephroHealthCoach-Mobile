import CustomButton from '@/components/button';
import Header from '@/components/shared/Header';
import Colors from '@/constants/color';
import {Theme} from '@/theme';
import {typography} from '@/utils/fontUtil';
import {
  normalizeFont,
  normalizeHeight,
  normalizeWithScale,
} from '@/utils/styleUtil';
import axios from 'axios';
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity, // Import for the Clear Chat button
} from 'react-native';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

export default function Chatbot() {
  const [query, setQuery] = useState<string>('');
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const sendToChatbot = async (userQuery: string) => {
    setLoading(true);
    const prompt = `You are a chatbot that only answers questions about fitness. If the user asks something unrelated to fitness, politely say: 'I can only answer fitness-related questions.'\n\nUser: ${userQuery}\nBot:`;

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'text-davinci-003',
          prompt: prompt,
          max_tokens: 100,
        },
        {
          headers: {
            Authorization: `Bearer YOUR_API_KEY`,
            'Content-Type': 'application/json',
          },
        },
      );

      const botResponse = response.data.choices[0].text.trim();
      setChatLog(prevLog => [
        ...prevLog,
        {sender: 'user', text: userQuery},
        {sender: 'bot', text: botResponse},
      ]);
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      setChatLog(prevLog => [
        ...prevLog,
        {sender: 'bot', text: 'Sorry, something went wrong.'},
      ]);
    } finally {
      setLoading(false);
      setQuery('');
    }
  };

  // Handle sending the query
  const handleSend = () => {
    if (query.trim()) {
      sendToChatbot(query.trim());
    }
  };

  // Clear the chat log
  const handleClearChat = () => {
    setChatLog([]);
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.cosmos_blue, padding: 20}}>
      <TouchableOpacity onPress={handleClearChat} style={styles.clearButton}>
        <Text style={styles.clearButtonText}>Clear Chat</Text>
      </TouchableOpacity>
      <Header title={'Chat'} />

      <ScrollView style={styles.chatContainer}>
        {chatLog.map((message, index) => (
          <Text
            key={index}
            style={
              message.sender === 'user' ? styles.userText : styles.botText
            }>
            {message.text}
          </Text>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder="Ask me something about fitness..."
        editable={!loading}
        multiline={true}
      />

      <CustomButton
        title={'Ask'}
        buttonstyle={Theme.Button.login_button}
        onPress={handleSend}
        fontstyle={Theme.Title.login_button_title}
        loading={loading}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: normalizeWithScale(20),
  },
  chatContainer: {
    flex: 1,
    marginBottom: normalizeHeight(10),
  },
  userText: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1e7dd',
    padding: normalizeWithScale(10),
    borderRadius: normalizeWithScale(10),
    marginVertical: normalizeHeight(5),
    maxWidth: '80%',
  },
  botText: {
    alignSelf: 'flex-start',
    backgroundColor: '#f8d7da',
    padding: normalizeWithScale(10),
    borderRadius: normalizeWithScale(10),
    marginVertical: normalizeHeight(5),
    maxWidth: '80%',
  },
  input: {
    ...typography.body2,
    lineHeight: normalizeHeight(30),
    fontSize: normalizeFont(18),
    borderWidth: normalizeWithScale(1),
    borderColor: '#ccc',
    padding: normalizeWithScale(10),
    borderRadius: normalizeWithScale(5),
    marginBottom: normalizeHeight(10),
    color: Colors.white,
  },
  clearButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: Colors.cosmos_blue,
    padding: 10,
    borderRadius: 5,
    zIndex: 10,
  },
  clearButtonText: {
    color: Colors.white,
    fontSize: normalizeFont(14),
    fontWeight: 'bold',
  },
});
