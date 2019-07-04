var request = require('request');

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

