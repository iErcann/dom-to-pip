import html2canvas from 'html2canvas';
import './style.css'

const button = document.querySelector("button");
const video = document.querySelector("video");
/*
let counter = 0;
  setInterval(()=>{
  video!.src = counter%2==0?"sample2.mp4":"sample.mp4";
  video!.play();
  counter++;
}, 5000)
 */
function printPipWindowDimensions(evt) {
  const pipWindow = evt.target;
  console.log(`The floating window dimensions are: ${pipWindow.width}x${pipWindow.height}px`);
  // will print:
  // The floating window dimensions are: 640x360px
}

button.onclick = function() {
  video.requestPictureInPicture().then(pictureInPictureWindow => {
    pictureInPictureWindow.onresize = printPipWindowDimensions;
  });
};
setTimeout(()=>{
  html2canvas(document.querySelector("#capture")).then(canvas => {
    document.body.appendChild(canvas)
  });
}, 2000)