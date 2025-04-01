import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, ImageBackground } from 'react-native';

const Home = ({ navigation }) => {
  const scaleValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 1.1, // Increase the scale value for the zoom effect
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1, // Return to the original scale value
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const renderButton = (label, logoUri, navigateTo) => (
    <TouchableOpacity
      style={styles.button}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => navigation.navigate(navigateTo)} // Navigate on button press
    >
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <Image source={{ uri: logoUri }} style={styles.logo} />
      </Animated.View>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={{ uri: 'https://r1.ilikewallpaper.net/iphone-wallpapers/download/6254/Farm-Scene-iphone-wallpaper-ilikewallpaper_com_200.jpg' }} // Replace with your background image URL
      style={styles.background}
    >
      <View style={styles.container}>
        {renderButton('Farmer', 'https://static.vecteezy.com/system/resources/previews/043/898/984/non_2x/farmer-logo-illustration-flat-2d-style-vector.jpg', 'Farmer')}
        {renderButton('Consumer', 'https://cdn.pixabay.com/photo/2018/08/17/19/52/shopping-3613689_640.png', 'Consumer')}
        {renderButton('Retailer', 'https://www.pngitem.com/pimgs/m/77-773596_market-store-icon-hd-png-download.png', 'Retailer')}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#9e852c', 
    width: '80%',
  },
  logo: {
    width: 100,       
    height: 100,      
    borderRadius: 50,  
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Home;
