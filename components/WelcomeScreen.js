import { StyleSheet, View, Pressable, Text, Image } from 'react-native';
import Button from './Button';

const qrCode = require('../assets/images/qr-code.png');

export default function WelcomeScreen({ onScanRequested }) {
  return (
    <View style={styles.welcomeContainer}>
        <Button label="Pay PIX QR Code" image='qrcode' onPress={onScanRequested} />
    </View>      
  );
}  

const styles = StyleSheet.create({
  welcomeContainer: {
      flex: '4',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',   
      justifyContent: 'center',
      //borderColor: 'green',
      //borderWidth: '2px'
    },
    image: {
      width: 250,
      height: 250,
      borderRadius: 18,
    },
    imageBg: {
      backgroundColor: '#fff',
      margin: '5px',
      flex: '1',
    },
    separator:{
      height:'15px;',
      flex:'1'
    }
  });
  