const cityHandler = require("./customModules/cityHandler.js");

async function megrgeData() {
	let cities = await cityHandler.readJSON("cities.json");
	let users = await cityHandler.readJSON("users.json");

	let mergedList = await cityHandler.mergeUserCity(users, cities);

	cityHandler.outputMergedList(mergedList);
}

megrgeData();
