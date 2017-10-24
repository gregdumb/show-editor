
var Timeline = function () {
	this.name = "Global";
	this.fps = 30;
	this.actualfps = 30;
	this.lastTime = (new Date()).getTime();
}

function Track(id, keyframes) {
	this.id = id;
	this.keyframes = keyframes;
}

function Keyframe(channel, time, state) {
	this.channel = channel;
	this.time = time;
	this.state = state;
	this.selected = false;
}

var wavesurfer = WaveSurfer.create({
	container: "#waveform-container",
	partialRender: true
});