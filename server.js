var noble = require('noble');

var serviceUUIDs = ["<service UUID 1>"]; // default: [] => all
var allowDuplicates = true; // default: false

noble.startScanning([], allowDuplicates); // particular UUID's
var onDiscover = function(peripheral) {
  noble.removeListener('discover', onDiscover);

//  noble.stopScanning();
  console.log(peripheral);
};

noble.on('discover', onDiscover);
