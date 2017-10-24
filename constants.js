// Constants
const KEY_DEL = 46;
const KEY_SHIFT = 16;
const KEY_CTRL = 17;
const KEY_SPACE = 32;

const KEY_G = 71;
const KEY_A = 65;

const LEFTCLICK = 1;
const MIDCLICK = 2;
const RIGHTCLICK = 3;


// Math functions

function isInside(n, a, b) {
	
	let greater = Math.max(a, b);
	let lesser = Math.min(a, b);
	
	return (n <= greater && n >= lesser);
}

Math.clamp = function(num, min, max) {
	return Math.min(Math.max(num, min), max);
};

Math.roundUp = function(num, nearest)
{
    return Math.ceil(num/nearest)*nearest;
}

Number.prototype.toTimeString = function () {
	
    var minutes = Math.floor(this / 60);
	var seconds = Math.floor(this - (minutes * 60));
	
    //if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes+':'+seconds;
}