// LOG  DATA :
// 000201
// 010212
// 2639
      // 0014br.gov.bcb.pix
      // 2517Energy Bill - May
// 52040000
// 5303985
// 5802BR
// 5915Creditor Name 1
// 6009Sao Paulo
// 6240
      // 0536a6ee03ce-b2af-416d-858e-8ab95ceadfff63042678

const knownAttributes = {};
knownAttributes['00'] = 'Payload Format Indicator';
knownAttributes['01'] = 'Point of Initiation Method';
knownAttributes['26'] = 'Merchant Account Information';
knownAttributes['52'] = 'Merchant Category Code';
knownAttributes['53'] = 'Transaction Currency';
knownAttributes['54'] = 'Transaction Amount';
knownAttributes['58'] = 'Country Code';
knownAttributes['59'] = 'Merchant Name';
knownAttributes['60'] = 'Merchant City';
knownAttributes['62'] = 'Additional Data Field';
knownAttributes['63'] = 'CRC16';

const knownSecondLevelAttributes = {};
knownSecondLevelAttributes['26 00'] = 'GUI';
knownSecondLevelAttributes['26 01'] = 'Proxy';
knownSecondLevelAttributes['26 02'] = 'Additional Info';
knownSecondLevelAttributes['26 25'] = 'Payment Link';
knownSecondLevelAttributes['62 05'] = 'Request ID';

const compoundAttrs = [ '26', '27', '62', '80' ];

export default function parseData(data)  {
    let cursor = 0;
    let lines = {};

    console.log('DATA :'+data);
    while( cursor < data.length ){
        let attribute = data.substring(cursor,cursor+2);
        let size = data.substring(cursor+2,cursor+4);
        let value = data.substring(cursor+4,cursor+4+parseInt(size));
        if( compoundAttrs.includes(attribute) ){
          let line = attribute + ' ' + size ; 
          lines[attribute] = [ value, line ];
          let innerLine = value;
          let cursor2 = 0;
          while( cursor2 < innerLine.length ){
            let attribute2 = innerLine.substring(cursor2,cursor2+2);
            let size2 = innerLine.substring(cursor2+2,cursor2+4);
            let value2 = innerLine.substring(cursor2+4,cursor2+4+parseInt(size2));
            let line2 = attribute2 + ' ' + size2 + ' ' + value2; 
            lines[attribute+' '+attribute2]=[ value2, line2 ];
            cursor2 =  + cursor2 + 4 + + parseInt(size2);
          }
        } 
        else {        
          let line = attribute + ' ' + size + ' ' + value; 
          lines[attribute] = [ value, line ];
        }
        
        cursor = cursor + 4 + + parseInt(size);
    }
    return lines;
};


export function sortedKeys(data)  {
    let cursor = 0;
    let lines = [];
    //console.log('data :'+data);
    while( cursor < data.length ){
        let attribute = data.substring(cursor,cursor+2);
        let size = data.substring(cursor+2,cursor+4);
        let value = data.substring(cursor+4,cursor+4+parseInt(size));
        if( compoundAttrs.includes(attribute) ){
          let innerLine = value;
          let cursor2 = 0;
          lines.push(attribute);
          while( cursor2 < innerLine.length ){
            let attribute2 = innerLine.substring(cursor2,cursor2+2);
            let size2 = innerLine.substring(cursor2+2,cursor2+4);
            let value2 = innerLine.substring(cursor2+4,cursor2+4+parseInt(size2));
            lines.push(attribute+' '+attribute2);
            cursor2 =  + cursor2 + 4 + + parseInt(size2);
          }
        }  else {
           lines.push(attribute);
        }
        cursor = cursor + 4 + + parseInt(size);
    }
    return lines;
};

export function formatData(data)  {

    let qrData = parseData(data);
    console.log('qrData -> '+JSON.stringify(qrData));

    let keys = sortedKeys(data);
    console.log('keys -> '+JSON.stringify(keys));

    let lines = [];
    for (var i=0; i<keys.length; i++){
        let key = keys[i];
        let line = null;
        if( key.includes(' ') ){
            line = [' - ' +  knownSecondLevelAttributes[key] + ' : ', 
            '        ' + qrData[key][1] ];
        } else {
            line = [' ' +  knownAttributes[key] + ' : ', 
                    '        ' + qrData[key][1] ];
        }
        lines.push(line);
    }
   
    return lines;
}

export async function doGet( queryStr ) {
	try {
		const response = await fetch(queryStr);
		if( !response.ok ) {
			const body =  await response.json();
			const errorMessage = `Error ${response.status} querying service: ${body.Error}`;
			throw errorMessage;
		} 
		const results = await response.json();
		return results;
	} catch ( err ) {
		console.log(err);
		throw err;
	}
}