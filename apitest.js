//#testjs

const axios = require ('axios');
const fs = require("fs");
const jsonfile = require('jsonfile');
var request = require('request');
const m3u8 = require('m3u8');
const M3U8FileParser = require('m3u8-file-reader');

const api = "https://sketch.pixiv.net/api/";
const account = require('./account.json');

/*
import { Service } from 'axios-middleware'
const service = new Service(axios)

service.register({
  onRequest(config) {
    if(typeof config.auth == 'string'){
      config.headers['Authorization'] = `Bearer ${config.auth}`
      delete config.auth
    }

    return config
  }
})
*/

/*
axios.post(api+"live.json").then((res) => {
    console.log(res.status);
    console.log(res.data);
})
*/

//OAuth(account.pixiv.user,account.pixiv.password);

async function oldAuth(username,password) {
    console.log ("login.");
    console.log (username,password);
    var params = new URLSearchParams();
        params.append('client_id', 'bYGKuGVw91e0NMfPGp44euvGt59s');
        params.append('client_secret', 'HP3RmkgAmEGro0gn1x9ioawQE8WMfvLXDz3ZqxpK');
        params.append('grant_type', 'password');
        params.append('username', username);
        params.append('password', password);
    
    axios.post('https://oauth.secure.pixiv.net/auth/token', params).then((res) => {
        /*jsonfile.writeFile('./secret.json', { 
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
        });*/
        //console.log(res.data.response.access_token);
        return res.data.response.access_token;
    }).catch(err => {
        console.log('status:', err.response.status);          // 400
        console.log('statusText:', err.response.statusText);  // Bad Request
        console.log ("IDまたはパスワードが間違っています。");
    });        
};//OAuth

async function OAuth(username,password) {
    var params = new URLSearchParams();
        params.append('client_id', 'bYGKuGVw91e0NMfPGp44euvGt59s');
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
        console.log ("IDまたはパスワードが間違っています。");
        process.exit(-1);
    });
    //console.dir (authres);
    return authres.access_token
};

function live(url){
    console.log("Imput: "+url);
    var liveid = (url.pathname.split('/').pop())
    result.then((string) => {
    var headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+string };
    var options = { url: 'https://sketch.pixiv.net/api/lives/'+liveid,  headers: headers, json: true  };
    
    request(options, function (error, response, body) { 
        if (!error && response.statusCode == 200) {
            //取得項目
            console.log(body.data.id) //配信ID
            console.log(body.data.created_at) //配信開始時間
            console.log(body.data.owner.user.unique_name) //ユーザー名
            console.log(body.data.name) //放送タイトル
            console.log(body.data.owner.hls_movie.url) //HLSURL
            hls_movie(body.data.owner.hls_movie.url)
          } else if (response.statusCode ==404) {
              console.log("放送が見つかりません。")
          } else {console.log(response.statusCode,error)}
        })
    })
};

function lives(url){
    result.then((string) => {
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+string
    };

    var options = {
        url: 'https://sketch.pixiv.net/api/lives.json',
        headers: headers
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(response.body);
        }
    }

    request(options, callback);
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

function main(){
    console.debug("main");
    result = OAuth(account.pixiv.user,account.pixiv.password);
    result.then((string) => { 
        if (process.argv[2] != null)  {
            urls = process.argv[2]
            if (urls.match(/live/)) {
                console.log ("LIVEmode")
                urls = new URL (urls)
                live(urls);
            } else {
            lives;
            }
        }
    });
}

main();