document.addEventListener('DOMContentLoaded', function() {

	window.mouseClickAudio = new Audio('assets/sounds/mouse-click.mp3');
	window.keyPressAudio = new Audio('assets/sounds/keyboard-press.mp3');
	
	window.mouseClickAudio.volume = window.currentVolume;
	window.keyPressAudio.volume = window.currentVolume;

document.querySelectorAll('button, a').forEach(element => {
	let isKeyDown = false;
	element.addEventListener('click', (e) => {
	if (!isKeyDown && element.tagName === 'A') {
		e.preventDefault();
		mouseClickAudio.pause();
		keyPressAudio.pause();
		mouseClickAudio.currentTime = 0;
		mouseClickAudio.play();
		
		setTimeout(() => {
		window.location.href = element.href;
		}, 275);
	} else if (!isKeyDown) {
		mouseClickAudio.pause();
		keyPressAudio.pause();
		mouseClickAudio.currentTime = 0;
		mouseClickAudio.play();
	}
	isKeyDown = false;
	});

	element.addEventListener('keydown', (e) => {
	isKeyDown = true;
	
	// Handle regular tabbing sounds for all elements
	keyPressAudio.pause();
	mouseClickAudio.pause();
	keyPressAudio.currentTime = 0;
	keyPressAudio.play();
	
	// Additional handling for Enter key on links
	if (e.key === 'Enter' && element.tagName === 'A') {
		e.preventDefault();
		setTimeout(() => {
		window.location.href = element.href;
		}, 275);
	}
	});
});
});
