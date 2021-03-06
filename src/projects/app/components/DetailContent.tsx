import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  detailContent: {
    padding: 15,
  },
});

export const DetailContent: React.SFC = ({ children }) => {
  return <View style={styles.detailContent}>{children}</View>;
};
