
const axios = require ('axios');
const fs = require("fs");
const jsonfile = require('jsonfile');
var request = require('request');

    var url="https://sketch.pixiv.net/@sakusyo-art/lives/712219308034888584"
    url.match(/lives/)
    if (url.match(/lives/)) {
        console.log("match!!")
    }else {
            console.log("no live")
        }
    //url.match("https://sketch.pixiv.net/@"/./)

    //console.log(result)