
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useState } from 'react';

import Header from './components/Header';
import WelcomeScreen from './components/WelcomeScreen';
import QRCodeReaderScreen from './components/QRCodeReaderScreen';
import QRCodeDataScreen from './components/QRCodeDataScreen';
import PaymentScreen from './components/PaymentScreen';
import PaymentSuccessScreen from './components/PaymentSuccessScreen';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function LogoTitle() {
  return (
    <Image
      style={{ width: 40, height: 40 }}
      source={require('@expo/snack-static/react-native-logo.png')}
    />
  );
}

function App() {
  
  const [activeScreen, setActiveScreen] = useState('Welcome');
  const [qrCodeData, setQRCodeData] = useState(null);

  if (typeof console.log != 'function') {
    console.log = function() {};
  }

  const onScanRequested = async () => {
      setActiveScreen('QrCodeReader');
  }

  const onScanCanceled = async () => {
      setActiveScreen('Welcome');
  }

  const onQRCodeScanned = async (event) => {
    console.log('data->'+JSON.stringify(event.data));
    setQRCodeData(event.data);
    setActiveScreen('QrCodeData');
  }

  const onQRCodeDataDisplayed = async () => {
    setActiveScreen('Payment');
  }

  const onPaymentAccepted = async () => {
    setActiveScreen('PaymentSuccess');
  }

  if( activeScreen == 'Welcome'){
    return (
      <View style={styles.container}>
        <Header/>
        <WelcomeScreen onScanRequested={onScanRequested}/>
      </View>
    );
  }
  if( activeScreen == 'QrCodeReader'){  
    return (
      <View style={styles.container}>
        <Header/>
        <QRCodeReaderScreen onCancel={onScanCanceled} 
            onBarcodeScanned={onQRCodeScanned}/>
        <StatusBar style="light" />
      </View>
    );
  }
  if( activeScreen == 'QrCodeData'){  
    return (
      <View style={styles.container}>
        <Header/>
        <QRCodeDataScreen data={qrCodeData} onPress={onQRCodeDataDisplayed}/>
        <StatusBar style="light" />
      </View>
    );
  }
  if( activeScreen == 'Payment'){  
    return (
      <View style={styles.container}>
        <Header/>
        <PaymentScreen data={qrCodeData} onPress={onPaymentAccepted}/>
        <StatusBar style="light" />
      </View>
    );
  }
  if( activeScreen == 'PaymentSuccess'){  
    return (
      <View style={styles.container}>
        <Header/>
        <PaymentSuccessScreen onPress={onScanCanceled}/>
        <StatusBar style="light" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: '1',
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
    //borderColor: 'red',
    //borderWidth: '2px'
  },
  text: {
    color: 'white',
  }
});


export default App;
