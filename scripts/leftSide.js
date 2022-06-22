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
                                                                    <span class="animeListContent">`+reduceText(result[i], 70)+`</span>
                                                                </div>`;
        }
        document.getElementById('listItems').firstChild.click();

    });
}

// Upon clicking a folder from the left-side list, clears the center episode list and populates it with the names found within the selected folder
// also picks a random episode using "Math.floor(Math.random()*result.length)" and displays it as a background image
function generateEpisodes(path)
{
    document.getElementById('episodeList').innerHTML = "";  
    readEpisodes(path).then(function(result){ 
        getDuration(path + '/' + result[Math.floor(Math.random() * result.length)], null, 'myCanvas')        
        getAnimeDetails(path, result[0],0);
        for (let i = 0; i < result.length; i++){ 
            var durTemp = getDuration(path+'/'+result[i], i, 'episodeSpanDuration');
            document.getElementById('episodeList').innerHTML += `<div class="episode" onclick="getAnimeDetails('`+path+`','`+result[i]+`',`+i+`)">    
                                                                    <div class="episodeText">        
                                                                        <span id="episodeSpanName" style="float:left">`+result[i].substring(0, result[i].lastIndexOf('.'))+`</span>
                                                                        <span class="episodeSpanDuration" id="episodeSpanDuration`+i+`" style="float: right"></span>
                                                                    </div>
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

function getDuration(path, i, canvasId)
{
    var video2 = document.createElement('video');
    video2.src = path;
    video2.load();

    video2.onloadeddata = function(){
        var duration = video2.duration/60;
        var mins = Math.floor(duration);
        var secs = Math.floor((duration%1)*60);

        if(mins < 10) mins = "0" + mins;
        if(secs < 10) secs = "0" + secs;

        if(i != null)
        {
            document.getElementById(canvasId+i).innerHTML = mins+":"+secs;
        }
        else if(canvasId != null)
        {
            getThumbnail(path, canvasId, video2.duration*0.25);
        }

    }
    video2.remove();
}

function getThumbnail(path, canvasId, duration){
    let canvas = document.getElementById(canvasId);
    var video = document.createElement("video");
    video.src = path+"#t=300,300";
    video.load();   

    
    video.addEventListener('seeked', function(){
        let ctx = canvas.getContext('2d');
            ctx.canvas.width = 1920;
            ctx.canvas.height = 1080;
            ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height)
            ctx.drawImage(video, 0, 0, ctx.canvas.width, ctx.canvas.height);
        });

    console.log(duration);
    video.currentTime = duration;
}