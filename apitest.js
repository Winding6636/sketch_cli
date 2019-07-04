//#testjs

const axios = require ('axios');
const fs = require("fs");
const jsonfile = require('jsonfile');
var request = require('request');


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

function lives(url){
    console.log ("live.json");
    console.log("Imput: "+url);
    result.then((string) => {
    auth = "Bearer "+string
    axios.post('https://sketch.pixiv.net/api/lives.json', null, { headers: { 
        'Content-Type': 'application/json', 'Authorization': auth,
        'Referer': 'https://sketch.pixiv.net/lives',
        'X-Requested-With': 'https://sketch.pixiv.net/lives',
        'Accept': 'application/vnd.sketch-v1+json',
        'User-Agent': 'curl/7.65.1'
    }} )
        .then(res => {
            /*
            const items = res.data;
            for (const item of items) {
            console.log(`${item}:`);
            }*/
        }).catch(error => {
            const {
                status,
                statusText
            } = error.response;
            console.log (error.config)
        console.log(`Error! HTTP Status: ${status} ${statusText}`);
      });
    });
};

function lives2(url){
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

function main(){
    console.debug("main");
    result = OAuth(account.pixiv.user,account.pixiv.password);
    result.then((string) => {    
        if (process.argv[2]) {
            console.log ("URL: "+process.argv[2]);
            //lives(process.argv[2]);
            lives2(process.argv[2]);
        } else { console.log ("not arg URL") }
    });
}

main();