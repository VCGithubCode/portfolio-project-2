document.addEventListener("DOMContentLoaded", function () {
    const volumeControl = document.getElementById("volume-control");
    
    // Get saved volume or default to 1
    let currentVolume = localStorage.getItem("audioVolume") || 1;
    volumeControl.value = currentVolume;

    // Make currentVolume available globally
    window.currentVolume = parseFloat(currentVolume);

    // Update volume when slider changes
    volumeControl.addEventListener("input", function () {
        window.currentVolume = parseFloat(this.value);
        localStorage.setItem("audioVolume", window.currentVolume);
        
        // Update any existing Audio objects
        if (window.mouseClickAudio) window.mouseClickAudio.volume = window.currentVolume;
        if (window.keyPressAudio) window.keyPressAudio.volume = window.currentVolume;
    });
});