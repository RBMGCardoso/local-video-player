var checkTime;

//Initialize function
var init = function () {
    // TODO:: Do your initialization job
    console.log('init() called');
    
    document.addEventListener('visibilitychange', function() {
        if(document.hidden){
            // Something you want to do when hide or exit.
        } else {
            // Something you want to do when resume.
        }
    });
};
// window.onload can work without <body onload="">
window.onload = init;