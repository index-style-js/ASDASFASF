song="";
rightWristX="0";
rightWristY="0";
leftWristX="0";
leftWristY="0";
scoreLeftWrist="0";

function setup(){

canvas.center();
video.hide();
poseNet=ml5.poseNet(video, modelLoaded)
poseNet.on('pose', gotPoses);

}

function modelLoaded(){

    console.log("posenet is initialized");

}

function gotPoses(results){

if(results.length>0){

console.log(results);
scoreLeftWrist=results[0].pose.keypoints[9].score;
rightWristX=results[0].pose.rightWrist.x;
rightWristY=results[0].pose.rightWrist.y;
console.log("rightWristX="+rightWristX+" rightWristY="+ rightWristY);

leftWristX=results[0].pose.leftWrist.x;
leftWristY=results[0].pose.leftWrist.y;
console.log("leftWristX="+leftWristX+" leftWristY="+ leftWristY);

}

}

function draw(){

    image(video, 0,0,600,500);

    fill('#FFA500');
    stroke('#FFA500');
    circle(rightWristX, rightWristY, 20);

    if(rightWristY>0 && rightWristY<100){

        document.getElementById("speed").innerHTML="Speed = 0.5 x";
        song.rate(0.5);
    }

    if(rightWristY>100 && rightWristY<200){

        document.getElementById("speed").innerHTML="Speed = 1 x";
        song.rate(1);
    }

    if(rightWristY>200 && rightWristY<300){

        document.getElementById("speed").innerHTML="Speed = 1.5 x";
        song.rate(1.5);
    }

    if(rightWristY>300 && rightWristY<400){

        document.getElementById("speed").innerHTML="Speed = 2 x";
        song.rate(2);
    }

    if(rightWristY>400 && rightWristY<500){

        document.getElementById("speed").innerHTML="Speed = 2.5 x";
        song.rate(2.5);
    }

    if(scoreLeftWrist>0.2){
        
        circle(leftWristX, leftWristY, 20);
        inNumberLeftWristY=Number(leftWristY);
        removeDecimals=floor(inNumberLeftWristY);
        volume=removeDecimals/500;
        document.getElementById("volume").innerHTML="Volume="+volume;
        song.setVolume(volume);
    }
    
}

function preload(){

    song=loadSound("596550_Enigma.mp3");
}

function play(){

song.play();
song.setVolume(1);
song.rate(1);

}

