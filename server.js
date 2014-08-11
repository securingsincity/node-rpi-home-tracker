var noble = require('noble');

var serviceUUIDs = ["fffffffffffffffffffffffffffffff0"]; // default: [] => all
var allowDuplicates = true; // default: false
var self = this;
noble.startScanning(serviceUUIDs, allowDuplicates); // particular UUID's

var onConnect = function(error) {
  if (error) {
    console.error(error);
  } else {
    console.log('connected!');
    console.log(self._peripheral);
    self._peripheral.discoverServices(null, function(error, services) {
      console.log('discovered the following services:');
      for (var i in services) {
        console.log('  ' + i + ' uuid: ' + services[i].uuid);
      }
    });
    // self._peripheral.discoverAllServicesAndCharacteristics(function(error, services, characteristics) {
    //   console.log('ok');
    //   if (error === null) {
    //     console.log("we're looking for services and characteristics");
    //     for (var i in services) {
    //       var service = services[i];
    //       console.log(service);
    //       this._services[service.uuid] = service;
    //     }
    //
    //     for (var j in characteristics) {
    //       var characteristic = characteristics[j];
    //       console.log(characteristic);
    //       this._characteristics[characteristic.uuid] = characteristic;
    //     }
    //   } else {
    //     console.error(error);
    //   }
    // });
  }

};


var onDiscover = function(peripheral) {
  noble.removeListener('discover', onDiscover);

  noble.stopScanning();
  console.log('discovered');
  //console.log(peripheral);

  self._peripheral = peripheral;
  self._services = {};
  self._characteristics = {};
  self._peripheral.connect(onConnect);
};

noble.on('discover', onDiscover);
