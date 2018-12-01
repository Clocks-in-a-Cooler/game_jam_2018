// PLEASE FIX, BOGDY SOLUTIONS ALL THE WAY
var playing_audio;
//var cityBuilding = document.getElementById("paperworkTrack");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function playTrack(soundTrack) {
	soundTrack.loop = false;
	soundTrack.play();
}

function playLoopTrack(soundTrack) {
	soundTrack.loop = true;
	soundTrack.play();
}

function backgroundLoop ()
{
	menuTheme.loop = false;
	menuTheme.play();
	playing_audio = true; // not universal
	
	menuTheme.volume = 1;
	explore.volume = 1;
	dysonDiscovery.volume = 1;
	
	menuTheme.addEventListener("ended",
		function()
		{
			menuTheme.currentTime = 0;
			playTrack(explore);
			
		}
	);
	
	explore.addEventListener("ended",
		function()
		{
			explore.currentTime = 0;
			playTrack(dysonDiscovery);
			
		}
	);
	
	dysonDiscovery.addEventListener("ended",
		function()
		{
			dysonDiscovery.currentTime = 0;
			playTrack(menuTheme);
		}
	);
}

// pause all audio
function pauseAllAudio()
{
	playing_audio = false; // not universal
	
	pauseAudio(menuTheme);
	pauseAudio(explore);
	pauseAudio(dysonDiscovery);
}

function muteUnmute()
{
	if(playing_audio) // not universal 
	{
		pauseAllAudio();
	}
	else
	{
		backgroundLoop();
	}
}
async function pauseAudio(soundTrack) {
	for (let i = 100; i >= 0; --i) {
		await sleep(20);
		soundTrack.volume = i/100;
	}
	soundTrack.pause();
}
