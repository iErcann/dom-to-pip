import html2canvas from 'html2canvas';

let video, button, recordingCanvas;

function createDom() {
    video = document.createElement("video");
    document.body.appendChild(video);
    button = document.createElement("button");
    button.textContent = "Enter PIP";
    button.onclick = () => { video.requestPictureInPicture() };
    button.style.zIndex = "100";
    button.style.position = "absolute";
    button.style.top = "10px";
    button.style.left = "10px";
    button.style.width = "100px";
    button.style.background = "orange";
    document.body.appendChild(button);
    recordingCanvas = document.createElement("canvas");
}

export default function start() {
    createDom();
    const cStream = recordingCanvas.captureStream(1);
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
            timeout = setTimeout(() => { recorder.stop(); }, 500)
        })
    }, 3000);

}
function encodeVideo(e: BlobEvent) {
    // combine all our chunks in one blob
    console.log("Encoded");
    const blob = new Blob([e.data]);
    // do something with this blob
    const vidURL = URL.createObjectURL(blob);
    video.controls = true;
    video.style.position = "absolute";
    video.style.width = "20px";
    video.src = vidURL;
    video.onended = function () {
        URL.revokeObjectURL(vidURL);
    }
}



