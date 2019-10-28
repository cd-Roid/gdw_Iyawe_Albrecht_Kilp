
console.log("George");

const maxRating = 100;
var anzBewertungen = 0;
var bewertung = 0;

console.log(bewertung,anzBewertungen,maxRating);

//Funktion nimmt eine Bewertung auf
function newBewertung(){
    const readline = require('readline');
    const rl = readline.createInterface({input: process.stdin, output: process.stdout});
    //Consolenabfrage + funktion die prüft ob die Eingabe größer als 100 ist
    rl.question('Geben Sie eine Bewertung ein',(bewertung) => {
        
        if(rl > maxRating){
            console.log('Geben Sie einen Wert zwischen 1-100 ein.');
        }
        /* Falls die Bewertung gültig ist wird die Anzahl der Bewertungen hochgezählt.
        Message wird ausgegeben mit der Anzahl der Bewertungen ausgegeben.
        */
        else{
                anzBewertungen++;
                console.log(`Thank you for your valuable feedback!`);
                console.log(bewertung,anzBewertungen,maxRating);
                
        }
       
        rl.close();
        
        }
    )
}

//gdw_aufagabe 2 
function bewertungArray(){
    let newArray = ['Bewertung 1',anzBewertungen , bewertung];
            console.log(newArray.length); 
}

function ratingObject(){
    let rating = new Object(); 
        rating.name = 'name';
        rating.rating = rating; 
        rating.number = anzBewertungen; 
}


    newBewertung();
    bewertungArray();