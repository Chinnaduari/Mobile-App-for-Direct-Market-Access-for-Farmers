import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Bill = ({ route }) => {
  const { consumerName, consumerPhone, consumerLocation, item } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Receipt</Text>
      <Text style={styles.detail}>Consumer Name: {consumerName}</Text>
      <Text style={styles.detail}>Phone Number: {consumerPhone}</Text>
      <Text style={styles.detail}>Location: {consumerLocation}</Text>
      <Text style={styles.detail}>Product Name: {item.productName}</Text>
      <Text style={styles.detail}>Farmer Name: {item.farmerName}</Text>
      <Text style={styles.detail}>Price: {item.price}</Text>
      <Text style={styles.detail}>Cultivated Date: {item.cultivatedDate}</Text>
      <Text style={styles.detail}>Expiry Date: {item.expiryDate}</Text>
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Bill;
