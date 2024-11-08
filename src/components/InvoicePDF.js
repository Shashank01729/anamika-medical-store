// src/components/InvoicePDF.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
    fontFamily: 'Helvetica',
    fontSize: 12,
    color: '#333',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#0056b3',
  },
  invoiceNumber: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  customer: {
    marginBottom: 20,
    fontStyle: 'italic',
  },
  itemContainer: {
    marginBottom: 10,
    borderBottom: '1pt solid #cccccc',
    paddingBottom: 5,
  },
  itemDescription: {
    fontWeight: 'bold',
  },
  itemDetails: {
    marginTop: 5,
  },
  total: {
    marginTop: 20,
    fontSize: 20,
    textAlign: 'right',
    fontWeight: 'bold',
    color: '#0056b3',
  },
  footer: {
    marginTop: 20,
    fontSize: 10,
    textAlign: 'center',
    color: '#777',
  },
});

const InvoicePDF = ({ customerName, items, invoiceNumber }) => {
  const totalAmount = items.reduce((total, item) => total + item.quantity * item.price, 0);

  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>Invoice</Text>
        <Text style={styles.invoiceNumber}>Invoice Number: {invoiceNumber}</Text>
        <Text style={styles.customer}>Customer: {customerName}</Text>
        <View>
          {items.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.itemDescription}>Description: {item.description}</Text>
              <View style={styles.itemDetails}>
                <Text>Quantity: {item.quantity}</Text>
                <Text>Price: ${item.price.toFixed(2)}</Text>
                <Text>Subtotal: ${(item.quantity * item.price).toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>
        <Text style={styles.total}>Total Amount: ${totalAmount.toFixed(2)}</Text>
        <Text style={styles.footer}>Thank you for your business!</Text>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
