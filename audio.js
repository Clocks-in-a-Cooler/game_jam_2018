var menuTheme = document.getElementById("menuTrack");
var explore = document.getElementById("exploreTrack");
var dysonDiscovery = document.getElementById("dysonDiscoveryTrack");
var cityBuilding = document.getElementById("paperworkTrack");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function playTrack(soundTrack) {
	console.log("current track is " + soundTrack);
	soundTrack.loop = true;
	soundTrack.play();
}

async function pauseAudio(soundTrack) {
	for (let i = 100; i >= 0; --i) {
		await sleep(20);
		audioOST.volume = i/100;
	}
	soundTrack.pause();
	console.log("audio paused at " + soundTrack.currentTime);
}
