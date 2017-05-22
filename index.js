import fs from 'fs';
import express from "./config/system/express";
import {init} from "./config/system/mongoose";

const configFilesByEnv = process.argv[2] ? process.argv[2] : './config/system/system_variables.json';


function run(config){
    process.env.PORT = process.env.PORT || config.port;
    process.env.APP_NAME = config.app_name || 'express-server';
    process.env.APP_URL = config.app_url || '';

    process.env.MONGODB_URI = config.mongodb_uri || 'localhost';
    process.env.MONGODB_USER = config.mongodb_user || '';
    process.env.MONGODB_PASSWORD = config.mongodb_password || '';
    process.env.MONGODB_DEBUG = config.mongodb_debug || false;

    init(() => express());
}

fs.readFile(configFilesByEnv, 'utf8', (err,configData) => {
    if(!err){
        run(JSON.parse(configData));
    }else{
        console.log(err)
    }
    
})