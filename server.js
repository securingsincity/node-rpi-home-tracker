var noble = require('noble');

var serviceUUIDs = ["<service UUID 1>"]; // default: [] => all
var allowDuplicates = true; // default: false

noble.startScanning([], allowDuplicates); // particular UUID's

noble.on('discover', onDiscover);

var onDiscover = function(peripheral) {
  noble.removeListener('discover', onDiscover);

  noble.stopScanning();
  console.log(peripheral);
};
