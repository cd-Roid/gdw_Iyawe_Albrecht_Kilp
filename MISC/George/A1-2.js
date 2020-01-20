// Aufgabe 1/2
const maxBew = 5;
var anzahlBewert=0;
var summBew=0;
var aktuelleBew= 0;
var lastBewert=0;

let games = ["Tortellini","Burrito","Pan"];

console.log(games.length);

games.forEach(function(item,index){
console.log(item,index);
});

games.push("Bolognese");
games.push("Bolognese2");

games.pop();

games.forEach(function(item,index){
    console.log(item,index);
	});
	
let person = {
	firstName: "Sophie",
	lastName: "Schau",
	age: 23
};

console.log(person.firstName, person.lastName);


function student (firstName, lastName, age){
	this.firstName=firstName;
	this.lastName=lastName;
	this.age=age;
};

let anton = new student ("Sophie", "Schau", 24);

console.log(anton.firstName, anton.lastName, anton.age);

const parseName = name =>{ 
	let split = name.split(" ");
	return {
		firstName:split[0],
		lastName:split[1]
	};
};


let st = parseName("Sophie Schau");

console.log(st.firstName, st.lastName);

//Aufgabe 1
let bewertungInfo = ["Bewertung 1", anzahlBewert, lastBewert];

console.log(bewertungInfo.length, bewertungInfo[bewertungInfo.length-1]);


function Ratings (name, anzahlBew, bew){
	this.name = name;
	this.punkte=anzahlBew;
	this.bewertung = bew;
	this.aktuelleBewert=0;
	this.durchschnitt = () => {
		return this.bewertung/this.punkte;
			 

	};
};


let rating1 = new Ratings("Bewertung 1",5,25);

console.log(rating1.name, rating1.punkte, rating1.sum, rating1.durchschnitt());


//Aufgaben 5

const hello = "hello";

function world () {
	const world = "world";
	var satz = hello.concat(" ",world);
	console.log(satz);
};


world();


function two (){
	console.log( world.concat(" ",hello)); 
};
