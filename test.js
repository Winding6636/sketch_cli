const request = require('request-promise');


/*
var headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer Nm_s47Wmay4QFWyxIhgHUVaqgIR-noIqm4-WVvfE-IA'
};

var options = {
    url: 'https://sketch.pixiv.net/api/lives.json',
    headers: headers
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
}

request(options, callback);

*/

function doRequest(options) {
  return new Promise(function (resolve, reject) {
    request(options, function (error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

const hoge = async () =>{
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer gAgkI3nL5W0oL7dgXC6rVvYhIEQ3rix6eATcPftH3Cc'
    };
    const requestOptions = {
        url: 'https://sketch.pixiv.net/api/lives.json',
        method: "POST",
        headers: headers
      }
    const res = await doRequest(requestOptions)
    console.log (res)
  }
  