noseX = 0;
noseY = 0;
difference = 0;
rightWristX = 0;
leftWristX = 0;

function setup() {
  video = createCapture(VIDEO);
  video.size(550, 500);

  canvas = createCanvas(550, 550);
  canvas.position(560,150);

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function modelLoaded(){
  console.log("Posenet está iniciado");
}

function gotPoses(results){
  if (results.length > 0){
    console.log(results);
    noseX = results[0].pose.nose.x;
    noseY = results[0].pose.nose.y;

    leftWristX = results[0].pose.leftWrist.x;
    rightWristX = results[0].pose.rightWrist.x;
    difference = floor(leftWristX - rightWristX);
    
    console.log("leftWristX = " + leftWristX + "rightWristX = " + rightWristX + "difference: " + difference);
  }
}


function draw(){
  background('#969A97');
  document.getElementById("square_side").innerHTML = "El alto y ancho del cuadrado será de: " + difference + "px";
  fill('#8A2BE2');
  stroke('#F90093');
  square(noseX, noseY, difference);
  fill('#8A2BE2');
  arc(difference, noseX, noseY, 2* Math.PI)

}