/**
 * Handles file/project loading
 */

 // File downloading
function downloadPlaintext(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

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
			var projectObj = JSON.parse(fileContents);
			Timeline.loadProjectObject(projectObj);
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


function createNewProject() {
	
	var formData = new FormData($("#form-new-project"));
	
	console.log(formData);
	
	var xhr = new XMLHttpRequest();
	// Add any event handlers here...
	xhr.open('POST', 'http://localhost/xmas-admin/createproject.php', true);
	xhr.send(formData);
	
	// Get number of tracks
	var numTracks = parseInt($("#input-num-channels").val());
	if(numTracks < 1) {
		popToast("Enter number of tracks");
		return;
	}
	
	// Get input name
	var newName = $("#input-new-project-name").val();
	if(newName == "") {
		popToast("Please fill in the name");
		return;
	}
	
	// Create ID
	var newId = idify(newName);
	
	var newProjectData = {
		"name": newName,
		"id": newId
	};
	
	// Create tracks
	var newTracks = createTrackArray(numTracks);
	
	var newProjectObject = {
		"projectData": newProjectData,
		"tracks": newTracks
	};
	
	var newProjectString = JSON.stringify(newProjectObject);
	
	// Get audio file
	var audioFile = $("#input-audio-upload").val();
	
	console.log(audioFile);
	
}

function getAllProjects() {
	
}


function createTrackArray(numTracks) {
	
	numTracks = Math.clamp(numTracks, 1, 16);
	
	newTracks = [];
	
	for(let i = 0; i < numTracks; i++) {
		let keys = [];
		newTracks.push(new Track(i, keys));
	}
	
	return newTracks;
}