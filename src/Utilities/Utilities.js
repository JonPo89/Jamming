
function findSongs(songArray, searchResult){
    let songList = [];
    if (searchResult.length > 2){
        for (let i=0; i < 10; i++){
            if (songArray[i].name.toLowerCase().includes(searchResult.toLowerCase())){
                songList.push(songArray[i]);
            }    
        };
    };
    return songList;
}


export default findSongs;