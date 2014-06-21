function __log() {
  console.log(arguments);
}

var audio_context;
var recorder;
var input;

function startUserMedia(stream) {
  input = audio_context.createMediaStreamSource(stream);
  __log('Media stream created.');

  //input.connect(audio_context.destination);
  __log('Input connected to audio context destination.');

  recorder = new Recorder(input);
  __log('Recorder initialised.');
}

function startRecording(button) {
  recorder && recorder.record();
  // button.disabled = true;
  // button.nextElementSibling.disabled = false;
  __log('Recording...');
}

function stopRecording(callback) {
  recorder && recorder.stop();
  __log('Stopped recording.');

  // create WAV download link using audio data blob
  createDownloadLink(callback);

  recorder.clear();
}

function getBuffer(callback) {
  recorder && recorder.stop();
  return recorder.getBuffer(callback);
}

function createDownloadLink(callback) {
  recorder && recorder.exportWAV(callback);
}

window.onload = function init() {
  try {
    // webkit shim
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    window.URL = window.URL || window.webkitURL;

    audio_context = new AudioContext;
    __log('Audio context set up.');
    __log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
  } catch (e) {
    alert('No web audio support in this browser!');
  }

  navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
    __log('No live audio input: ' + e);
  });
};
