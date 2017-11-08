

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

// OPEN MODAL
$("#btn-open-remote-modal").on("click", function() {
	updateRemoteProjectList();
});

// OPEN PROJECT
$("#btn-open-remote-project").on("click", function() {
	var toOpen = $("#select-remote-projects").val();
	
	openRemoteProject(toOpen);
});

// SAVE
$("#btn-save-remote").on("click", function() {
	
	//var saveObj = Timeline.getProjectObject();
	//var saveString = JSON.stringify(saveObj);
	//
	//downloadPlaintext(Timeline.projectData.id + ".json", saveString);
	
	saveRemoteProject();
});

$("#btn-upload-file").on("click", function() {
	
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
/*$("#input-project-name").on("change", function() {
	$("title").html($("#input-project-name").val());
});*/

$("#input-music-upload").on("change", function() {
	uploadAudio($("#input-music-upload"));
});

// New project model
$("#btn-new-project").on("click", function() {
	
	/*var newName = $("#input-new-project-name").val();
	
	if(newName == "") {
		popToast("Please fill in the name");
		return;
	}
	
	var newId = idify(newName);
	
	popToast("New ID: " + newId);
	
	Timeline.projectData.name = newName;
	Timeline.projectData.id = newId;
	
	for(let i = 0; i < Timeline.tracks.length; i++) {
		Timeline.tracks[i].keyframes = [];
	}
	
	popToast("Project '" + newName + "' created");
	
	$(".modal").modal("close");*/
	
	createNewProject();
	
});

function updateRemoteProjectList() {
	
	var projectDropdown = $("#select-remote-projects");
	projectDropdown.empty();
	projectDropdown.material_select();
	
	getRemoteProjectList(function(newList) {
		console.log(newList);
		
		for(let i = 0; i < newList.length; i++) {
			let newString = newList[i];
			
			let newOption = $("<option>").attr('value', newString).text(newString);
			
			projectDropdown.append(newOption);
			
			//console.log(newString);
		}
		
		// Refresh
		projectDropdown.material_select();
	});
}


document.addEventListener("keydown", function(e) {
	if(!$(document.activeElement).is("canvas")) {
		return;
	}
	
	var key = e.keyCode;
	
	if(key == KEY_SPACE) {
		mediaPlayPause(); 
	}
});

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