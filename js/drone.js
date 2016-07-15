// Thanks to Matt Diamond and his Javascript Drone
// http://matt-diamond.com/drone.html

var context = new AudioContext();

var gain = context.createGain();
gain.gain.value = 0.25;
gain.connect(context.destination);

var noiseNodes = [];
var bufferLen = 4096;

function createNoiseGen(freq) {
    var panner = context.createPanner();
    var max = 20;
    var min = -20;
    var x = rand(min, max);
    var y = rand(min, max);
    var z = rand(min, max);
    panner.setPosition(x, y, z);
    panner.connect(gain);

    var filter = context.createBiquadFilter();
    filter.type = filter.BANDPASS;
    filter.frequency.value = freq;
    filter.Q.value = 50;
    filter.connect(panner);

    var noiseSource = context.createScriptProcessor(bufferLen, 1, 2);
    noiseSource.onaudioprocess = function (e) {
    	var outBufferL = e.outputBuffer.getChannelData(0);
    	var outBufferR = e.outputBuffer.getChannelData(1);
    	for (var i = 0; i < bufferLen; i++) {
    	    outBufferL[i] = outBufferR[i] = Math.random() * 2 - 1;
    	}
    };
    noiseSource.connect(filter);
    noiseNodes.push(noiseSource);
}

function generate_drone(co2ppm){
    var num_osc = 30;
    for (var i = 0; i < num_osc; i++) {
	createNoiseGen(co2ppm);
    }
}

function rand(min, max) {
    return Math.random() * (max - min) + min;
}
