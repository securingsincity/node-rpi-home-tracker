var noble = require('noble');

var serviceUUIDs = ["adabfb006e7d4601bda2bffaa68956ba"]; // default: [] => all
var allowDuplicates = true; // default: false

noble.startScanning(serviceUUIDs, allowDuplicates); // particular UUID's
var onDiscover = function(peripheral) {
  noble.removeListener('discover', onDiscover);

  noble.stopScanning();
  console.log(peripheral);
};

noble.on('discover', onDiscover);
