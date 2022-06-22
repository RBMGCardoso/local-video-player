var names = [];
var stats = [];
var selVidDuration;
var absPath = "E:/Downloads/Animes/"
var isBusy = false;

// Debug
var m1, m2;

//  Populates the left-side list with folders found within the desired location, reducing the folders name(reduceText(String, length))
function generateContentList()
{
    readDirectory().then(function(result){
        for (let i = 0; i < result.length; i++) {
           document.getElementById('listItems').innerHTML +=     `<div class="animeList" onclick="generateEpisodes('`+absPath+result[i]+`');">
                                                                    <div class="animeListContent">`+reduceText(result[i], 70)+`</div>
                                                                </div> `;
        }
    });
}

// Upon clicking a folder from the left-side list, clears the center episode list and populates it with the names found within the selected folder
// also picks a random episode using "Math.floor(Math.random()*result.length)" and displays it as a background image
function generateEpisodes(path)
{
    document.getElementById('episodeList').innerHTML = "";  
    readEpisodes(path).then(function(result){
        getPath(path + '/' + result[Math.floor(Math.random() * result.length)]);      
        getThumbnail();

        for (let i = 0; i < result.length; i++){ 
            var durTemp = getDuration(path+'/'+result[i], i);
            console.log(durTemp);
            document.getElementById('episodeList').innerHTML += `<div class="episode" onclick="getPath('`+path+'/'+result[i]+`')">            
                                                                    <span style="float:left">`+result[i]+`</span>
                                                                    <span id="episodeSpan`+i+`" style="float: right"></span>
                                                                </div>`
        }
    });
}

// Recieves a String and a desired size and reduces the String if it's length is larger than the desired size, and adds 3 dots to the end of it
function reduceText(txt, size){
    var text = txt.substring(0,size);

    txt.length > size ? text += "..." :"";

    return text;
}

//  
function getPath(path){
    var video = document.getElementById("myVideo");
    var source = document.getElementById("mySource");
    source.src = path+"#t=300,300";
    video.load();   
}

function getDuration(path, i)
{
    var video2 = document.createElement('video');
    video2.src = path;
    video2.load();

    video2.onloadeddata = function(){
        var duration = video2.duration/60;
        var mins = Math.floor(duration);
        var secs = Math.floor((duration%1)*60);

        if(secs < 10) secs = "0" + secs;

        document.getElementById('episodeSpan'+i).innerHTML = mins+":"+secs;
    }
}

function getThumbnail(){
    m1 = performance.now();
    let canvas = document.getElementById('myCanvas');
    let video = document.getElementById('myVideo');

    video.addEventListener('seeked', function(){
        canvas.width = 1920;
        canvas.height = 1080;

        let ctx = canvas.getContext('2d');
            ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height)
            ctx.drawImage(video, 0, 0, ctx.canvas.width, ctx.canvas.height);
        });


    video.currentTime = 300;
    m2 = performance.now();
}