import html2canvas from 'html2canvas';

const button = document.querySelector("button");
const video = document.createElement("video");
const recordingCanvas = document.createElement("canvas");
document.body.appendChild(video);
//document.body.appendChild(recordingCanvas);

button.onclick = video.requestPictureInPicture;

const cStream = recordingCanvas.captureStream(30);
const recorder = new MediaRecorder(cStream);
recorder.ondataavailable = encodeVideo;

let timeout;
setInterval(() => {
  html2canvas(document.body).then(canvas => {
    recorder.start();
    const destCtx = recordingCanvas.getContext('2d');
    recordingCanvas.width = canvas.width;
    recordingCanvas.height = canvas.height;
    destCtx.drawImage(canvas, 0, 0);
    clearTimeout(timeout);
    timeout = setTimeout(() => { recorder.stop(); }, 300)
  })
}, 3000);

function encodeVideo(e: BlobEvent) {
  console.log(e)
  // combine all our chunks in one blob
  const blob = new Blob([e.data]);
  // do something with this blob
  const vidURL = URL.createObjectURL(blob);
  video.controls = true;
  video.src = vidURL;
  video.onended = function () {
    URL.revokeObjectURL(vidURL);
  }
}



