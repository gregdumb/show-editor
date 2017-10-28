// Constants
const KEY_DEL = 46;
const KEY_SHIFT = 16;
const KEY_CTRL = 17;
const KEY_SPACE = 32;

const KEY_A = 65;
const KEY_D = 68;
const KEY_G = 71;
const KEY_I = 73;
const KEY_R = 82;
const KEY_Z = 90;

const LEFTCLICK = 1;
const MIDCLICK = 2;
const RIGHTCLICK = 3;

// Toast

function popToast(text, bad = false) {
	let color = (bad) ? "red darken-4" : "grey darken-4";
	Materialize.toast(text, 4000, color);
}

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

// Math functions=
function isInside(n, a, b) {

	let greater = Math.max(a, b);
	let lesser = Math.min(a, b);

	return (n <= greater && n >= lesser);
}

Math.clamp = function (num, min, max) {
	return Math.min(Math.max(num, min), max);
};

Math.roundUp = function (num, nearest) {
	return Math.ceil(num / nearest) * nearest;
}

Number.prototype.toTimeString = function (showMili = false) {

	var minutes = Math.floor(this / 60);
	var seconds = Math.floor(this - (minutes * 60));
	var miliseconds = Math.round((this % 1) * 100);

	//if (minutes < 10) {minutes = "0"+minutes;}
	if (seconds < 10) { seconds = "0" + seconds; }
	if (miliseconds < 10) { miliseconds = "0" + miliseconds; }

	if (showMili) return minutes + ':' + seconds + ':' + miliseconds;
	else return minutes + ':' + seconds;

}