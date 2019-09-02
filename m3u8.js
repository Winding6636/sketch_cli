var m3u8 = require('m3u8');
var request = require('request')

var options = { url: 'https://hls4.pixivsketch.net/2019072005/15635682155311865848057851d139a4d7b4154923781f7f4ef/index.m3u8', };
    
    request(options, function (error, response, body) { 
        console.log (JSON.parse(response))
    })

/*
requestLibrary.get(url, function(res) {
	if (res.statusCode !== 200) {
		console.error("Got http response status code "+res.statusCode+".");
		process.exit(1);
	}
    console.log (res);
    res.pipe(parser);
});
*/
/*
var parser = m3u8.createStream();

parser.on('m3u', function(m3u) {
	// output json on stdout
	process.stdout.write(JSON.stringify(m3u));
	process.exit(0);
});*/