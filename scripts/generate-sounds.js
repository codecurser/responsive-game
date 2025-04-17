const fs = require('fs');
const path = require('path');

// Create a simple beep sound using Web Audio API
function generateBeep(frequency, duration, type = 'sine') {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = type;
  oscillator.frequency.value = frequency;
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);

  return audioContext;
}

// Generate different sounds for different events
const sounds = {
  'start.mp3': { frequency: 440, duration: 0.5, type: 'sine' },
  'countdown.mp3': { frequency: 880, duration: 0.3, type: 'square' },
  'ready.mp3': { frequency: 660, duration: 0.2, type: 'sine' },
  'success.mp3': { frequency: 880, duration: 0.4, type: 'sine' },
  'fail.mp3': { frequency: 220, duration: 0.6, type: 'sawtooth' },
  'best-time.mp3': { frequency: 1100, duration: 0.8, type: 'sine' },
  'click.mp3': { frequency: 550, duration: 0.1, type: 'sine' }
};

// Create sounds directory if it doesn't exist
const soundsDir = path.join(__dirname, '../public/sounds');
if (!fs.existsSync(soundsDir)) {
  fs.mkdirSync(soundsDir, { recursive: true });
}

// Generate each sound file
Object.entries(sounds).forEach(([filename, settings]) => {
  const audioContext = generateBeep(settings.frequency, settings.duration, settings.type);
  // Note: In a real implementation, we would need to convert the audio to MP3
  // For now, we'll just create empty files as placeholders
  fs.writeFileSync(path.join(soundsDir, filename), '');
  console.log(`Created ${filename}`);
}); 