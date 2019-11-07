const cityHandler = require("./customModule/stadtprocess.js");

async function mergeData() {
	let staedte = await stadtprocess.readJSON("stadte.json");
	let benutzer = await stadtprocess.readJSON("Benutzer.json");

	let mergedList = await stadtprocess.mergeBenutzerStadt(benutzer, staedte);

	stadtprocess.outputMergedList(mergedList);
}

mergeData();
