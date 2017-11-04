

Timeline.init();

$("body").on("contextmenu", "#timeline-canvas", function(e) {
	return false;
});

/*setInterval(function() {
	Timeline.update();
}, 1000 / 120);*/

// Start rendering
timelineRenderUpdate();


// UI on clicks ******************************************

// Initialize
$(document).ready(function() {
	// Initialize MaterializeCSS things
	$('select').material_select();
	$('.modal').modal();
});

$("#btn-download").on("click", function() {
	var saveString = JSON.stringify(Timeline.tracks);
	
	downloadPlaintext("showproject.txt", saveString);
	
	//prompt("Save this:", saveString);
});

$("#btn-upload-file").on("click", function() {
	
	//console.log($("#input-project-upload").get(0).files);
	/*
	var f = $("#input-project-upload").get(0).files[0];
	var fReader = new FileReader();
	
	fReader.onload = (function(theFile) {
		return function(e) {
			alert(theFile.result);
		}
	})(f);*/

	uploadFile("#input-project-upload", onProjectFileLoad);
});

$("#btn-export").on("click", function() {
	Timeline.tracksToShowfile();
});

$("#btn-play").on("click", function() {
	mediaPlayPause();
});

$("#btn-stop").on("click", function() {
	mediaStop();
});

$("#select-rate").on("change", function() {
	
	let newRate = $("#select-rate").val();
	wavesurfer.setPlaybackRate(newRate);
	console.log(newRate);
});

$("#btn-align").on("click", function() {
	Timeline.performAlign();
});

$("#btn-remove-dups").on("click", function() {
	Timeline.removeDuplicateKeyframes();
});

$("#btn-set-on").on("click", function() {
	Timeline.setKeyframesOn();
});

// Settings Modal
$("#input-project-name").on("change", function() {
	$("title").html($("#input-project-name").val());
});

$("#input-music-upload").on("change", function() {
	uploadAudio($("#input-music-upload"));
});

document.addEventListener("keydown", function(e) {
	var key = e.keyCode;
	
	if(key == KEY_SPACE) {
		mediaPlayPause(); 
	}
});


// ******************************************************
// FILE UPLOADING

function uploadFile(inputElement, onLoadHandler) {

	var fileObject = $(inputElement).get(0);

	var reader = new FileReader();
	if (fileObject.files.length) {
		var textFile = fileObject.files[0];
		// Read the file
		reader.readAsText(textFile);
		// When it's loaded, process it
		$(reader).on('load', onLoadHandler);
	}
	else {
		popToast("Please select a file", true);
	}

}

function onProjectFileLoad(e) {
	var fileContents = e.target.result;
	
	if(fileContents && fileContents.length) {
		try {
			Timeline.tracks = JSON.parse(fileContents);
			$(".modal").modal("close"); // Close all modals
			popToast("Project loaded");
		}
		catch (e) {
			popToast("Project file is invalid", true);
		}
	}
	else {
		popToast("Error loading file", true);
	}
}

function uploadAudio(audioInputElement) {
	var files = audioInputElement.get(0).files;
	var file = URL.createObjectURL(files[0]); 
	wavesurfer.load(file);
}

// ******************************************************
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

function mediaStop() {
	wavesurfer.stop();
	Timeline.time = 0;
	$("#icon-play").html("play_arrow");
}

wavesurfer.load("./WizardsInWinter.mp3");

wavesurfer.on("ready", function() {
	//wavesurfer.play();
	wavesurfer.zoom(Timeline.timeScale);
	Timeline.duration = wavesurfer.getDuration();
	console.log(Timeline.duration);
});

wavesurfer.on("seek", function() {
	//Timeline.time = wavesurfer.getCurrentTime(); // Disabled seeking on audio since this wasn't working
})