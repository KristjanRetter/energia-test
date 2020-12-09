import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
  },
  total: {
    position: 'absolute',
    padding: 10,
    paddingTop: 200,
    bottom: 0,
    textAlign: 'right',
  },

  date: {
    padding: 20,
    marginBottom: 100,
    textAlign: 'right',
  },

  section: {
    padding: 4,
    paddingLeft: 20,
  },

  product: {
    margin: 4,
    fontSize: 12,
  },
});

export const ReceiptTemplate = ({ data }: any) => (
  <Document>
    <Page size='A4' style={styles.page}>
      <View style={styles.date}>
        <Text>{data.date}</Text>
      </View>
      <View style={styles.section}>
        <Text>id: {data.id}</Text>
      </View>
      <View style={styles.section}>
        <Text>company: {data.company}</Text>
      </View>
      <View style={styles.section}>
        <Text>products:</Text>
        {data.products.map((product: any) => (
          <Text style={styles.product} key={product.id}>{`${product.count} ${product.name} ${product.price}€`}</Text>
        ))}
      </View>
      <View style={styles.total}>
        <Text>Total: {data.total}</Text>
      </View>
    </Page>
  </Document>
);
