

const fs = require("fs");

const readJSON = (pfad,callback) => {
    try{
    fs.readFile(pfad, 'utf8', (err,result)=> {
        if(err)
            callback(err)
            else
            callback(null,result);
    });
    }
    catch(error){
        console.log(error);

    }
};


module.exports ={readJSON};



readJSON('/Users/Soeren/GDW/Aufgaben/cities.json',(err,result)=>{
        try{
            let data = JSON.parse(result);
            console.log(data[0].name);
            return;
        }
        catch (error) {
                console.log(error);
                return;
        }
});

var cities;


const findAndDelete = (pfad, name)=>{
    readJSON(pfad, (err,result) =>{
        if (err){
            console.log("File read failed:",err);
        return;
        }
        else{
        cities = JSON.parse(result);
        for(let i=0;i<cities.length;i++) {
            if(cities[i].name == name){
                cities.splice(i,1);
                break;
            }
        }

        fs.writeFile('/Users/Soeren/GDW/Aufgaben/cities.json', JSON.stringify(cities, null, 2), err => {
            if (err) {
                console.log('Error writing file', err)
                return;
            } else {
                console.log('Successfully wrote file')
                return;
            }
        });
        
    }
        
    });  
};



const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const addCity = (pfad)=>{
    readJSON(pfad, (err,result) =>{
        if (err){
            console.log("File read failed:",err);
        return;
        }
        cities = JSON.parse(result);
        
        rl.question("Bitte geben Sie den Stadtnamen ein: ", function(answer){
            rl.question("Bitte geben Sie die Einwohnerzahl ein: ", function(answer2){
                rl.question("Bitte geben Sie das Bundesland ein: ", function(answer3){
                    let newCity = {
                        "name": answer,
                        "rank":cities.length,
                        "einwohnerzahl":answer2,
                        "bundesland": answer3
                    }
                    cities.push(newCity);
                    
                    fs.writeFile('/Users/Soeren/GDW/Aufgaben/cities.json', JSON.stringify(cities, null, 2), (err) => {
                        if (err) {
                            console.log('Error writing file', err)
                        } else {
                            console.log('Successfully wrote file')
                        }
                    });
                    rl.close();

                });
            });
        });
            
    });
        
    };

module.exports = {
    findAndDelete,
    addCity
};

