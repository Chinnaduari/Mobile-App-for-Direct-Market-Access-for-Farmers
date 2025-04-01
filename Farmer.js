import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ImageBackground, Platform, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker
import { DataContext } from './DataContext'; // Import the DataContext

const Farmer = ({ navigation }) => {
  const [farmerName, setFarmerName] = useState('');
  const [image, setImage] = useState(null);
  const [userName, setUserName] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [price, setPrice] = useState('');
  const [weight, setWeight] = useState(''); // New state for weight/quantity
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [cultivatedDate, setCultivatedDate] = useState(new Date());
  const [showExpiryDatePicker, setShowExpiryDatePicker] = useState(false);
  const [showCultivatedDatePicker, setShowCultivatedDatePicker] = useState(false);

  const { setFarmerDetails } = useContext(DataContext); // Use the context

  const selectImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert("Permission to access camera roll is required!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (result.canceled) {
        console.log('User cancelled image picker');
      } else if (result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error selecting image: ', error);
      Alert.alert('Image Selection Error', 'There was an error selecting the image. Please try again.');
    }
  };

  const handleDateChange = (event, selectedDate, dateType) => {
    if (dateType === 'expiry') {
      setShowExpiryDatePicker(Platform.OS === 'ios'); // Keep picker open on iOS
      if (selectedDate) setExpiryDate(selectedDate);
    } else if (dateType === 'cultivated') {
      setShowCultivatedDatePicker(Platform.OS === 'ios'); // Keep picker open on iOS
      if (selectedDate) setCultivatedDate(selectedDate);
    }
  };

  // Function to convert weight from grams to kilograms
  const convertToKilograms = (weightInGrams) => {
    return (parseFloat(weightInGrams) / 1000).toFixed(2); // Convert grams to kilograms and format to 2 decimal places
  };

  const handleSubmit = () => {
    const weightInKilograms = convertToKilograms(weight); // Convert weight to kilograms

    const newFarmerDetails = {
      userName,
      location,
      phoneNumber,
      price,
      weight: weightInKilograms, // Use converted weight
      expiryDate: expiryDate.toDateString(),
      cultivatedDate: cultivatedDate.toDateString(),
      farmerName,
      image,
    };

    setFarmerDetails(prevDetails => [...prevDetails, newFarmerDetails]); // Save data to context
    Alert.alert('Success', 'Farmer details submitted successfully!');
    navigation.navigate('Consumer'); // Navigate to Consumer page
  };

  return (
    <ImageBackground
      source={{ uri: 'https://r1.ilikewallpaper.net/iphone-wallpapers/download/29608/Nature-Cloudy-Fresh-Farm-Field-iphone-wallpaper-ilikewallpaper_com_200.jpg' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.card}>
            <TouchableOpacity onPress={selectImage}>
              <View style={styles.imageContainer}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.image} />
                ) : (
                  <Text style={styles.imagePlaceholder}>Upload Image</Text>
                )}
              </View>
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Farmer Name"
              value={farmerName}
              onChangeText={setFarmerName}
            />

            <TextInput
              style={styles.input}
              placeholder="Product Name"
              value={userName}
              onChangeText={setUserName}
            />

            <TextInput
              style={styles.input}
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
            />

            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              placeholder="Price"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              placeholder="Weight (grams)"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
            />

            {/* Expiry Date */}
            <TouchableOpacity onPress={() => setShowExpiryDatePicker(true)}>
              <View pointerEvents="none">
                <TextInput
                  style={styles.input}
                  placeholder="Expiry Date"
                  value={expiryDate.toDateString()}
                  editable={false}
                />
              </View>
            </TouchableOpacity>
            {showExpiryDatePicker && (
              <DateTimePicker
                value={expiryDate}
                mode="date"
                display="default"
                onChange={(event, date) => handleDateChange(event, date, 'expiry')}
              />
            )}

            {/* Cultivated Date */}
            <TouchableOpacity onPress={() => setShowCultivatedDatePicker(true)}>
              <View pointerEvents="none">
                <TextInput
                  style={styles.input}
                  placeholder="Cultivated Date"
                  value={cultivatedDate.toDateString()}
                  editable={false}
                />
              </View>
            </TouchableOpacity>
            {showCultivatedDatePicker && (
              <DateTimePicker
                value={cultivatedDate}
                mode="date"
                display="default"
                onChange={(event, date) => handleDateChange(event, date, 'cultivated')}
              />
            )}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ensure the background image covers the entire view
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    width: '100%',
    height: 200,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    color: '#aaa',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#9e852c',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#9e852c',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Farmer;
