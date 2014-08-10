var bleno = require('bleno');
var houseName = process.env.houseName || 'home';
var roomName = process.env.roomName || 'kitchen';

var ROOM_ID ='fff1'
var HOUSE_ID ='fff0'
bleno.on('stateChange', function(state) {
    console.log('on -> stateChange: ' + state);
    if (state === 'poweredOn') {
        var scanData = new Buffer('b1a6752152eb4d36e13e357d7c299999'); // maximum 31 bytes
        var advertisementData = new Buffer('jameshrisho'); // maximum 31 bytes

        bleno.startAdvertisingWithEIRData(advertisementData, scanData, function(error) {
          console.log('fail!');
        });
    } else {
        bleno.stopAdvertising();
    }
});
// bleno.on('accept', function(clientAddress) {
// console.log('connected -> ' + clientAddress);
// });
bleno.on('advertisingStart', function(error) {
    console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));
    if (!error) {
        bleno.setServices([
            new bleno.PrimaryService({
                uuid : 'JamesHrisho1',
                characteristics : [
                  new BlenoCharacteristic({
                    uuid: ROOM_ID,
                    properties: ['read'],
                    // value: new Buffer('6d472200008cba1c', 'hex')
                    onReadRequest: function(offset, callback) {
                      console.log('room_id onReadRequest');

                      callback(BlenoCharacteristic.RESULT_SUCCESS, new Buffer(roomName));
                    }
                  }),
                  new BlenoCharacteristic({
                    uuid: HOUSE_ID,
                    properties: ['read'],
                    // value: new Buffer('6d472200008cba1c', 'hex')
                    onReadRequest: function(offset, callback) {
                      console.log('house_id onReadRequest');

                      callback(BlenoCharacteristic.RESULT_SUCCESS, new Buffer(houseName));
                    }
                  }),
                ]
            })
        ]);
    }
});