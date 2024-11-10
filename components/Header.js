import { StyleSheet, View, Text, Image } from 'react-native';

const bankLogo = require('../assets/images/bank-logo.png');

export default function Header() {
  return (
        <View style={styles.headerContainer}>
            <Image source={bankLogo} style={styles.logo} />
            <Text style={styles.logoText}>    Home Banking</Text>
        </View>
  );
}

const styles = StyleSheet.create({
    headerContainer: {
      flex: '1',
      flexDirection: 'row',
      alignItems: 'center',
      //borderColor: 'blue',
      //borderWidth: '2px'
    },
    logoText: {
      color: '#fff',
      fontSize: '34px'
    },
    logo: {
      width: 48,
      height: 48,
      borderRadius: 18,
    }
});