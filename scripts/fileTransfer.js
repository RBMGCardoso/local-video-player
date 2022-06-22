var fs = require('fs');
var read = require( 'utils-fs-read-properties' );
const fsPromises = fs.promises;
var path = require('path');
var absolutePath = path.resolve('E:/Downloads/Animes/');
var directories;
var episodes;
var stats =[];
const info = [];
var arrayObjects = [];

async function readDirectory(){
   directories = await fs.readdirSync(absolutePath);
   
   return directories;
}

async function readEpisodes(path){
  episodes = await fs.readdirSync(path);
   
  return episodes;
}



/*
async function readContents(path){
  files.forEach(file => {
    console.log(file);
    stats.push(fs.statSync(path+"/"+file));
   })

   for (let i = 0; i < files.length; i++) {
     info[i] = {
      name: files[i],
      stats: stats[i]
     }
   }

   return info;
}*/