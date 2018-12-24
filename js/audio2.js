var AudioSystem = {
	function() {
		var trackList = [];
		trackList[0] = var menuTheme = document.getElementById("menuTrack");
		trackList[1] = var explore = document.getElementById("exploreTrack");
		trackList[2] = var dysonDiscovery = document.getElementById("dysonDiscoveryTrack");
		//trackList[3] = var cityBuilding = document.getElementById("paperworkTrack");
		return {
			sleep: function(ms) {
				return new Promise(resolve => setTimeout(resolve, ms));
			},
			playSingleTrack: function(soundTrack) {
				soundTrack.play();
			},
			playAllTracks: function() {
				
			},
			pauseSingleTrack: async function(soundTrack) {
				for (let i = 100; i >= 0; --i) {
					await sleep(20);
					soundTrack.volume = i/100;
				}
				soundTrack.pause();
			},
			pauseAllTracks: async function() {
				
			},
		}
	}
}