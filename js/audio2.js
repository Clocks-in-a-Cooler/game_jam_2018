var AudioSystem = {
	function() {
		var trackList = [];
		trackList.push(document.getElementById("menuTrack"));
		trackList.push(document.getElementById("exploreTrack"));
		trackList.push(document.getElementById("dysonDiscoveryTrack"));
		//trackList[3] = var cityBuilding = document.getElementById("paperworkTrack");
		var currentTrack;
		return {
			sleep: function(ms) {
				return new Promise(resolve => setTimeout(resolve, ms));
			},
			playSingleTrack: function(soundTrack) {
				soundTrack.play();
			},
			playAllTracks: async function() {
				trackList.forEach(function(soundTrack) {
					playSingleTrack(soundTrack);
					currentTrack = soundTrack;
					await sleep(soundTrack.duration);
				});
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