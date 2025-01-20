/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react';
import * as GoogleGenerativeAI from '@google/generative-ai';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '@/constants/color';
import Header from '@/components/shared/Header';
import {normalizeFont} from '@/utils/styleUtil';
import CustomInput from '@/components/input';
import {Theme} from '@/theme';
import CustomButton from '@/components/button';

const GeminiChat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showStopIcon, setShowStopIcon] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const API_KEY = '';

const Gprompt =
  "You are a chatbot that specializes in answering questions related to medical, biomedical, bio, science, healthcare, pharmacology, genetics, biology, anatomy, physiology, epidemiology, virology, microbiology, neuroscience, chemistry, biochemistry, or any other scientific or medical topics. If the input is a greeting, introduction, or casual conversation (e.g., 'Hi', 'Hello', 'How are you?', or 'Tell me about yourself'), respond politely and appropriately. For any other input that is unrelated to science or medical topics, politely say: 'I can only answer medical-related questions.'";


  useEffect(() => {
    const startChat = async () => {
      const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({model: 'gemini-pro'});
      const prompt =
        "You are a chatbot that only answers questions about fitness. If the user asks something unrelated to fitness, politely say: 'I can only answer fitness-related questions.'";
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
    };
    startChat();
  }, []);

const sendMessage = async () => {
  if (!userInput.trim()) {
    setErrorMessage('Please enter a message before sending.');
    return;
  }

  setLoading(true);
  setErrorMessage('');

  const userMessage = {text: userInput, user: true};
  setMessages(prevMessages => [userMessage, ...prevMessages] as any);

  setUserInput('');

  const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({model: 'gemini-pro'});
  const prompt = Gprompt + userMessage.text;
  console.log(userMessage.text);

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    setMessages(prevMessages => [{text, user: false}, ...prevMessages] as any);
  } catch (error) {
    setErrorMessage(
      'There was an error processing your request. Please try again later.',
    );
  }

  setLoading(false);
};

  const ClearMessage = () => {
    setMessages([]);
    setIsSpeaking(false);
  };

  const renderMessage = ({item}: any) => (
    <View
      style={[
        styles.messageContainer,
        item.user ? styles.userMessage : styles.aiMessage,
      ]}>
      <Text
        style={[
          styles.messageText,
          item.user ? styles.userText : styles.aiText,
        ]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: Colors.lightblue}}>
      <Header title={'Chat'} />
      <TouchableOpacity onPress={ClearMessage} style={styles.clearButton}>
        <Text style={styles.clearButtonText}>Clear Chat</Text>
      </TouchableOpacity>
      <FlatList data={messages} renderItem={renderMessage} inverted />

      {/* Error Message Box */}
      {errorMessage ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}

      <View style={styles.inputContainer}>
        <CustomInput
          placeholder={'Type a message'}
          containerStyle={Theme.Input.primary}
          onChange={setUserInput}
          value={userInput}
        />
      </View>
      <View style={styles.inputContainer}>
        <CustomButton
          title={'Send'}
          buttonstyle={Theme.Button.login_button}
          onPress={() => sendMessage()}
          fontstyle={Theme.Title.login_button_title}
          loading={loading}
          disabled={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  clearButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: Colors.gray,
    padding: 10,
    borderRadius: 5,
    zIndex: 10,
  },
  clearButtonText: {
    color: Colors.black,
    fontSize: normalizeFont(14),
  },
  container: {flex: 1, backgroundColor: '#ffff', marginTop: 50},
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
    backgroundColor:Colors.grey
  },
  messageText: {
    fontSize: 16,
    color: Colors.white,
    lineHeight: 20,
  },
  userMessage: {
    alignSelf: 'flex-end',
    borderRadius: 10,
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.blue,
    borderRadius: 10,
    padding: 10,
  },
  userText: {
    textAlign: 'right',
  },
  aiText: {
    textAlign: 'left',
  },
  inputContainer: {flexDirection: 'row', alignItems: 'center', padding: 10},
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.transparent,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    height: 50,
    color: 'white',
  },
  errorBox: {
    backgroundColor: '#FFCDD2',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    borderColor: '#D32F2F',
    borderWidth: 1,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: normalizeFont(14),
    textAlign: 'center',
  },
});

export default GeminiChat;


//AIzaSyCm7ndYDYKYUW8pWCh3tTT_WoHEoPw3ps0