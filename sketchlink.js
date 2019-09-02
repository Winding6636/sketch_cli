// streamlink
const axios = require ('axios');
const fs = require("fs");
const jsonfile = require('jsonfile');
var request = require('request');
const Streamlink = require('./streamlink.js');
require('date-utils');
const reline=require("readline").createInterface(process.stdin,process.stdout);

const api = "https://sketch.pixiv.net/api/";
const account = require('./account.json');
const secret = require('./secret.json');

const dir = "./Recordings/" //RecDataSave

//OAuth(account.pixiv.user,account.pixiv.password);

async function OAuth(username,password) {
    var params = new URLSearchParams();
        params.append('client_id', 'bYGKuGVw91e0NMfPGp44euvGt59s');// NOT 
        params.append('client_secret', 'HP3RmkgAmEGro0gn1x9ioawQE8WMfvLXDz3ZqxpK');
        params.append('grant_type', 'password');
        params.append('username', username);
        params.append('password', password);

    await axios.post('https://oauth.secure.pixiv.net/auth/token', params).then((res) => {
        jsonfile.writeFile('./secret.json', { 
            access_token: res.data.response.access_token,
            token_type: res.data.response.token_type,
            expires_in: res.data.response.expires_in,
            refresh_token: res.data.response.refresh_token,
            device_token: res.data.response.device_token,
            id: res.data.response.user.id,
            uid: res.data.response.user.account,
            name: res.data.response.user.name
        }, {
            encoding: 'utf-8', 
            replacer: null, 
            spaces: "\t"
        }, function (err) {
            if (err) {
                console.error(err);
                process.exit(1);
            } else {
                console.log('\n認証情報を保存しました。\n');
        }
        });
        return authres = res.data.response;
    }).catch(err => {
        console.log('status:', err.response.status);          // 400
        console.log('statusText:', err.response.statusText);  // Bad Request
        console.error ("IDまたはパスワードが間違っています。又はAPIエラーです。(仕様変更)");
        process.exit(-1);
    });
    //console.dir (authres);
    //console.log (authres.access_token);
    return authres.access_token
};

function live(url){
    console.log("Imput: "+url);
    var liveid = (url.pathname.split('/').pop())
    //secret.access_token.then((string) => {
    var headers = { 'X-Requested-With': 'https://sketch.pixiv.net/lives', 'Content-Type': 'application/json'};
    var options = { url: 'https://sketch.pixiv.net/api/lives/'+liveid,  headers: headers, json: true  };
    
    request(options, function (error, response, body) { 
        //console.log (body)
        if (!error && response.statusCode == 200) {
            if (body.data.owner.hls_movie == null ) {
                console.warn("まだ配信が開始されていません。")
                process.exit(-1);
            }
            //取得項目
            //console.log (body.data);
            console.log(body.data.id) //配信ID
            console.log(body.data.created_at) //配信開始時間
            console.log(body.data.owner.user.unique_name) //ユーザー名
            console.log(body.data.name) //放送タイトル
            console.log(body.data.owner.hls_movie.url) //HLSURL
            //hls_movie(body.data.owner.hls_movie.url)
            streamlink(body.data.owner.hls_movie.url,body.data.owner.user.unique_name,body.data.created_at,url)
          } else if (response.statusCode ==404) {
              console.log("配信が見つかりません。")
              process.exit();
          } else {console.log(response.statusCode,error)}
        })
    //})
};

function lives(url){
    var userid = (url.pathname.split('/').pop())
    secret.access_token.then((string) => {
    var headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+string };
    var options = { url: 'https://sketch.pixiv.net/api/lives.json',  headers: headers, json: true  };
    
    request(options, function (error, response, body) { 
        //console.log (body)
        console.log(body.data.lives)
        if (!error && response.statusCode == 200) {
            /*if (body.data.owner.hls_movie == null ) {
                console.warn("まだ配信が開始されていません。")
                process.exit(-1);
            }
            //取得項目
            console.log(body.data.id) //配信ID
            console.log(body.data.created_at) //配信開始時間
            console.log(body.data.owner.user.unique_name) //ユーザー名
            console.log(body.data.name) //放送タイトル
            console.log(body.data.owner.hls_movie.url) //HLSURL
            //hls_movie(body.data.owner.hls_movie.url)
            streamlink(body.data.owner.hls_movie.url,body.data.owner.user.unique_name,body.data.created_at,url)
            */
          } else if (response.statusCode ==404) {
              console.log("配信が見つかりません。")
              process.exit();
          } else {console.log(response.statusCode,error)}
        })
    })
}

function hls_movie(hls){
    request(hls, function (error, response, body) {
        if (process.argv[3] != null && process.argv[3] == "worst") { 
                qua = 2
            } else { qua = 1
                const content = body;
                const reader = new M3U8FileParser();
                reader.read(content);
                reader.getResult(); // Get the parse result
                reader.reset(); // Optional, If you want to parse a new file, call reset()
            } 
});

    //console.log(m3u8(hlsm3u8))
}

function streamlink(m3u8,user,livedate,orign_url) {
    let create_date = new Date(livedate).toFormat("YYMMDD_HH24MI");
    var num = 0
    do {
        try {
            fs.statSync(dir + user + '_sketch_' + create_date + '_' + num + '.m2ts');
            console.log("ファイルが既にあります。"+'./' + user + '_sketch_' + create_date + '_' + num + '.m2ts')
            x = true
          } catch(err) { x =false }
        if (x == true) {
            num++;
        }
    } while (x == true);
    console.log ('SaveFile: '+ dir + user + '_sketch_' + create_date + '_' + num + '.m2ts')
    var stream = new Streamlink(m3u8).output(dir + user + '_sketch_' + create_date + '_' + num + '.m2ts').start();
    
    stream.getQualities();
    stream.on('quality', (data) => {
        console.log(data);
    });
    stream.on('err', (err) => {
        console.log(err);
    });
    stream.on('end', (o) => {
        console.log("Stream ended");
        console.log(o);
    });
    stream.on('log', (data) => {
        console.log(data);
    });
    //console.warn("test")
}

function main(){
    //console.debug("main");
    result = OAuth(account.pixiv.user,account.pixiv.password);
    result.then((string) => { 
        if (process.argv[2] != null)  {
            urls = process.argv[2]
            urls = new URL (urls)
            if (urls.hostname == "sketch.pixiv.net" ) {
                if (process.argv[2].match(/live/)) {
                    console.log ("LIVEROOMMODE")
                    live(urls);
                } else {
                    console.log ("fromUSERMODE")
                    lives(urls);
                }
            }
        }
    });
}

switch (process.argv[2]){
    case "login":
      result = OAuth(account.pixiv.user,account.pixiv.password);
      break;
    case "secret":
      break;
    default:
        console.log (account.pixiv.session);
        if (process.argv[2] != null)  {
            urls = process.argv[2]
            urls = new URL (urls)
            if (urls.hostname == "sketch.pixiv.net" ) {
                if (process.argv[2].match(/live/)) {
                    console.log ("LIVEROOMMODE")
                    live(urls);
                } else if (process.argv[2].match(m3u8)) {
                    console.log ("m3u8 DIRECTMODE");
                    
                } else {
                    console.log ("fromUSERMODE")
                    lives(urls);
                }
            }
        } else {
            console.log("Enter the URL...")
            process.exit();
        }
      break;
  }