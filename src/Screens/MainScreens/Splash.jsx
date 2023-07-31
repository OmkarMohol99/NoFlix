import {StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import {AppUI} from '../../constants';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Main');
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.appLogo}
          source={require('../../Images/appLogo.png')}
        />
        {/* <Text style={styles.appName}>NoFlix</Text> */}
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: AppUI.APP_THEME_BACKGROUND,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  appLogo: {
    width: 150,
    height: 150,
    tintColor: '#682bd7',
  },
  logoContainer: {
    top: 300,
  },
  loader: {
    marginTop: 40,
  },
  appName: {
    color: '#682bd7',
  },
});
