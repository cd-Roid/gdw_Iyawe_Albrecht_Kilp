const cityHandler = require("./customModule/stadtprocess.js");

async function mergeData() {
	let cities = await stadtprocess.readJSON("stadte.json");
	let users = await stadtprocess.readJSON("Benutzer.json");

	let mergedList = await stadtprocess.mergeBenutzerStadt(benutzer, staedte);

	stadtprocess.outputMergedList(mergedList);
}

mergeData();
