import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

const Payment = ({ route, navigation }) => {
  const { item } = route.params; // Retrieve the item details passed from the Consumer screen

  // State to hold consumer's details
  const [consumerName, setConsumerName] = useState('');
  const [consumerPhone, setConsumerPhone] = useState('');
  const [consumerLocation, setConsumerLocation] = useState('');

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  async function registerForPushNotificationsAsync() {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      await Notifications.requestPermissionsAsync();
    }
  }

  const showNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Payment Successful!',
        body: `Payment processed successfully for ${consumerName} at ${consumerLocation}.`,
      },
      trigger: { seconds: 1 },
    });
  };

  const handlePayment = async () => {
    // Implement payment logic here (e.g., integrate with a payment API)

    // Show an alert to simulate the payment process
    Alert.alert('Processing Payment', 'Your payment is being processed.', [
      {
        text: 'OK',
        onPress: async () => {
          // Show the notification
          await showNotification();

          // Navigate to the Bill screen with the details
          navigation.navigate('Bill', {
            consumerName,
            consumerPhone,
            consumerLocation,
            item,
          });
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment for {item.farmerName}'s Product</Text>

      <TextInput
        placeholder="Enter Consumer Name"
        style={styles.input}
        value={consumerName}
        onChangeText={setConsumerName}
      />
      <TextInput
        placeholder="Enter Phone Number"
        style={styles.input}
        value={consumerPhone}
        onChangeText={setConsumerPhone}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Enter Location"
        style={styles.input}
        value={consumerLocation}
        onChangeText={setConsumerLocation}
      />

      <TextInput placeholder="Enter Card Number" style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Enter Expiry Date" style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Enter CVV" style={styles.input} keyboardType="numeric" secureTextEntry={true} />

      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Submit Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#9e852c',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Payment;
