// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");

/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "8000";


/**Request Configuration
 */
const request = require('request')
let apiKey_trefle = 'MUJYZ2JKdUQ0eTNjenZXYm9FY2xpZz09'
let plantname = 'Vine maple'
let id = 101129
let growth = `https://trefle.io/api/plants/${id}?token=${apiKey_trefle}`
let url = `https://trefle.io/api/plants?q=${plantname}&${id}&token=${apiKey_trefle}`

app.get(growth, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    let plantData = JSON.parse(body)
    console.log('Minimum Temperature:', plantData['main_species']['growth']['temperature_minimum']['deg_c']);
  }
});






/**
 *  App Configuration
 */

/**
 * Routes Definitions
 */
app.get("/", (req, res) => {
    res.status(200).send("FloPo: Your Plant Doctor");
  });



/**
 * Server Activation
 */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});