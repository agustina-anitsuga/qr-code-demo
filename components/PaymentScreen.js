import { StyleSheet, View, Text } from 'react-native';
import Button from './Button';
import parseData from './commons.js';
import doGet from './commons.js';

export default function PaymentScreen({data, onPress}) {

  let qrData = parseData(data);
  // let jsonData = doGet("http://www.google.com.ar");
  // console.log(jsonData);
  console.log('QRDATA IN PAYMENT SCREEN -> '+JSON.stringify(qrData));

  return (
        <View style={styles.container}>
            <View style={styles.data}>
                <View style={styles.longrow}>
                    <Text style={styles.text}> Pay to </Text>
                    <Text style={styles.textA}> { qrData[59][0] } </Text>
                </View>
                <View style={styles.longrow}>
                    <Text style={styles.text}> in </Text>
                    <Text style={styles.textA}> { qrData[60][0] } </Text>
                </View>
                <View style={styles.longrow}>
                    <Text style={styles.text}> the sum of </Text>
                    <Text style={styles.textA}> { qrData[54]? qrData[54][0] : "pending"  } BRL </Text>
                </View>
                <View style={styles.longrow}>
                    <Text style={styles.text}> in the account </Text>
                    <Text style={styles.textA}> { qrData['26 01']? qrData['26 01'][0]  : "pending" } </Text>
                </View>
            </View>
            <View style={styles.row}>
                    <Button label="Accept" image='check-square-o' onPress={onPress} />
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: '4',
      flexDirection: 'column',
      alignItems: 'center'
    },
    row: {
      flex: '1',
      flexDirection: 'row',
      alignItems: 'center'
    },
    longrow: {
      marginTop: 20,
      flexDirection: 'column',
      alignItems: 'center'
    },
    data: {
        flex: '1',
        flexDirection: 'column',
        alignItems: 'center',
    },
    text: {
      color: '#fff',
      fontSize: '24px'
    },
    textA: {
      color: 'yellow',
      fontSize: '24px'
    }
});