import { StyleSheet, View, Text } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Button from './Button';


export default function PaymentSuccessScreen({ onPress }) {
  return (
    <View style={styles.container}>
        <View styles={styles.result}>
            <FontAwesome
                name='check-circle'
                size='50'
                color='green'
                style={styles.icon}
            />
            <Text style={styles.text}>Payment completed successfully</Text>
            <Text style={styles.subtext}>Yes... this is fake... for now!</Text>
        </View>
        <View styles={styles.buttonArea}>
            <Button style={styles.button} label="Back To Home" image='home' onPress={onPress} />
        </View>
    </View>      
  );
}  

const styles = StyleSheet.create({
    container: {
      flex: '4',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      justifyContent: 'center',
      //borderColor: 'green',
      //borderWidth: '2px'
    },
    result: {
        //borderColor: 'red',
        //borderWidth: '5px'
    },
    text: {
        color: '#fff',
        fontSize: '24px'
    },
    subtext: {
        color: '#fff',
        fontSize: '18px'
    },
    buttonArea: {
        //borderColor: 'white',
        //borderWidth: '5px'
    },
    icon: {
        paddingRight: 8,
    },
  });
  