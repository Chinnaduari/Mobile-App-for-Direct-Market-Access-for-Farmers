import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import { DataContext } from './DataContext'; // Import the context

const Consumer = () => {
  const { farmerDetails } = useContext(DataContext); // Access the stored farmer details
  const navigation = useNavigation(); // Get the navigation object

  const handleBuy = (item) => {
    Alert.alert(
      'Product Details',
      `
        Farmer Name: ${item.farmerName}
        User Name: ${item.userName}
        Location: ${item.location}
        Phone Number: ${item.phoneNumber}
        Price: ${item.price}
        Expiry Date: ${item.expiryDate}
        Cultivated Date: ${item.cultivatedDate}
      `,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Payment', { item }), // Navigate to Payment screen
        },
        { text: 'Cancel', style: 'cancel' },
      ],
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.text}>Farmer Name: {item.farmerName}</Text>
      <Text style={styles.text}>Product Name: {item.userName}</Text>
      <Text style={styles.text}>Location: {item.location}</Text>
      <Text style={styles.text}>Phone Number: {item.phoneNumber}</Text>
      <Text style={styles.text}>Price: {item.price}</Text>
      <Text style={styles.text}>Expiry Date: {item.expiryDate}</Text>
      <Text style={styles.text}>Cultivated Date: {item.cultivatedDate}</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => handleBuy(item)}>
        <Text style={styles.buttonText}>Buy</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={{ uri: 'https://r1.ilikewallpaper.net/iphone-wallpapers/download/29608/Nature-Cloudy-Fresh-Farm-Field-iphone-wallpaper-ilikewallpaper_com_200.jpg' }}
      style={styles.background}
    >
      <FlatList
        data={farmerDetails}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    padding: 10,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#9e852c',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Consumer;
