objects = [];
video = "";
status = "";

function preload()
{
    sound = loadSound('Alerty Sound.mp3');
}

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(status != "")
    {       
        objectDetector.detect(video, gotResult); 
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y +15);
            noFill(); 
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == "person")
    {
        document.getElementById("status").innerHTML = "Status = Baby Is Found";
    }
    else{
        document.getElementById("status").innerHTML = "Status = Baby Not Found";
        sound.play();
    }
        }
    }
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}

function modelLoaded()
{
    console.log("Model Is Now Successfully Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results)
{
    if (error) 
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}