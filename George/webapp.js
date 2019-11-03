var toRemove = "";
const fs = require('fs');
var datei = fs.readFile('./George/cities.json');
var json = JSON.parse(datei);
var stadt = json.stadt;
 console.log(json);

/*function toDelete(toRemove){
    json.array.forEach(stadt => {
        if(stadt === toRemove)json.splice(stadt.index);
        else console.log("Stadt nicht in der Liste"); 
    });
}
*/

//toDelete(toRemove);