import { StyleSheet, View, Text, FlatList, Platform } from 'react-native';
import Button from './Button';
import { formatData } from './commons.js';

export default function QRCodeDataScreen({data, onPress}) {
  
  let lines = formatData(data);
  return (
        <View style={styles.container}>
            <View style={styles.lines}>
            {lines.map((line) => {
              return (
                <View style={styles.row} key={line[0]}> 
                  <Text style={styles.text}>{line[0]}</Text>
                  <Text style={styles.attribute}>{line[1]}</Text>
                </View>
              );
            })}
            </View>
            <View style={styles.button}>              
              <Button label="Proceed to Payment" image='money' onPress={onPress} />
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: '4',
      flexDirection: 'column',
      alignItems: 'flex-start',
      width:'250px',
      //borderColor: 'green',
      //borderWidth: '2px'
    },
    air: {
      flex: '1',
      margin: '60px',
      padding: '60px',
      height: '100px'
    },
    button: {
      flex: '2',
      margin: '60px',
      padding: '60px',
      height: '100px',
      //borderColor: 'yellow',
      //borderWidth: '2px'
    },
    row: {
      flexDirection: 'column',
      marginLeft: '55px',
      paddingLeft: '55px',
      //borderColor: 'red',
      //borderWidth: '2px'
    },
    lines: {
      flex: '9'
    },
    title: {
      color: '#fff',
      fontSize: '24px',
    },
    attribute: {
      minWidth: 0,
      color: '#fff',
      fontSize: '16px',
      textAlign: 'left',
      marginLeft: '55px',
      paddingLeft: '55px',
      textOverflow: [5, "hanging", "each-line"],
    },
    text: {
      minWidth: 0,
      color: 'yellow',
      fontSize: '16px',
      textAlign: 'left',
      marginLeft: '55px',
      paddingLeft: '55px',
      textOverflow: [5, "hanging", "each-line"],
    }
});