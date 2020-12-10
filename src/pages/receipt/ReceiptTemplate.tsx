import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { OrderReceipt } from '../../typings/OrderReceipt';
import { Product } from '../../typings/Product';

interface OrderReceiptTemplateProps {
  data: OrderReceipt;
}

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

export const ReceiptTemplate = ({ data }: OrderReceiptTemplateProps): React.FunctionComponentElement<OrderReceiptTemplateProps> => (
  <Document>
    <Page size='A4' style={styles.page}>
      <View style={styles.date}>
        <Text>{data.date}</Text>
      </View>
      <View style={styles.section}>
        <Text>Id: {data.id}</Text>
      </View>
      <View style={styles.section}>
        <Text>Company: {data.company}</Text>
      </View>
      <View style={styles.section}>
        <Text>Products:</Text>
        {data.products.map((product: Product) => (
          <Text style={styles.product} key={product.id}>{`${product.count} ${product.name} ${product.price}€`}</Text>
        ))}
      </View>
      <View style={styles.total}>
        <Text>Total: {data.total}</Text>
      </View>
    </Page>
  </Document>
);
