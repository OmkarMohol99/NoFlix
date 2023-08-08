import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {AppUI} from '../../constants';

const Discover = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Discover</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.networksContainer}>
          <Text style={styles.networksText}>Popular Networks</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Discover;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: AppUI.APP_THEME_BACKGROUND,
  },
  headerContainer: {
    padding: 10,
    marginBottom: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  scrollView: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  networksText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
