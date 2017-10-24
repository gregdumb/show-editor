

Timeline.init();

$("body").on("contextmenu", "#timeline-canvas", function(e) {
	return false;
});

setInterval(function() {
	Timeline.update();
}, 1000 / 60);


// UI on clicks

$("#btn-download").on("click", function() {
	var saveString = JSON.stringify(Timeline.tracks);
	
	prompt("Save this:", saveString);
});

$("#btn-play").on("click", function() {
	
	mediaPlayPause();
});

document.addEventListener("keydown", function(e) {
	var key = e.keyCode;
	
	if(key == KEY_SPACE) {
		mediaPlayPause(); 
	}
});

// WAVEFORM TESTING

function mediaPlayPause() {
	wavesurfer.playPause();
	
	if(wavesurfer.isPlaying()) {
		$("#icon-play").html("pause");
	}
	else {
		$("#icon-play").html("play_arrow");
	}
}

wavesurfer.load("./greedy.mp3");

wavesurfer.on("ready", function() {
	//wavesurfer.play();
	Timeline.duration = wavesurfer.getDuration();
	console.log(Timeline.duration);
});

wavesurfer.on("seek", function() {
	//Timeline.time = wavesurfer.getCurrentTime(); // Disabled seeking on audio since this wasn't working
})