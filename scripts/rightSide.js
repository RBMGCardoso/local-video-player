
function getAnimeDetails(path, comName, episode) {
    var animeName;

    //remove extension
    animeName = comName.substring(0, comName.lastIndexOf('.'));
    
    //  Ignore Season, episode and encoding options
    animeName = animeName.substring(0, animeName.indexOf('-'));

    //  Check for publisher tags
    if (animeName[0] == '[') {
        animeName = animeName.substring(animeName.indexOf('['),animeName.indexOf(']'));
    }

    document.getElementById('animeName').innerHTML = animeName;
    document.getElementById('animeEpisode').innerHTML = "Episode " + (episode+1);
    getDuration(path + '/' + comName, "", 'animeDurationDetails');
    getAnimePreview(path, comName);
}

function getAnimePreview(path, comName){
    getDuration(path + '/' + comName, null,'episodePreview');
}