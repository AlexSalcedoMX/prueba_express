import tweets from '../models/tweet_model'
import mongoose from 'mongoose';
import loggerUtil from './../utils/logger';
import moment from 'moment';

const logger = loggerUtil.getInstance();

import {Search} from '../utils/validators';

function getNumberTweets(params){
    return tweets.find({
        busquedaId: params.searchId,
        postedTime: { 
            $gte: new Date(`${params.initialDate} UTC`),
            $lte: new Date(`${params.finalDate} UTC`)
        }
    })
    .count()
    .exec()
    .then(tweets => {
        return tweets;
    })
}

function getMentions(params){

    return tweets.aggregate()
    .match({
        busquedaId: params.searchId,
        postedTime: { 
            $gte: new Date(`${params.initialDate} UTC`),
            $lte: new Date(`${params.finalDate} UTC`)
        }
    })
    .unwind("$menciones")
    .group({
        _id: "$menciones",
        total: {$sum : 1}
    })
    .exec()
    .then(mentions => {
        return mentions.length;
    })
}

function getHashtags(params){
    return tweets.aggregate()
    .match({
        busquedaId: params.searchId,
        postedTime: { 
            $gte: new Date(`${params.initialDate} UTC`),
            $lte: new Date(`${params.finalDate} UTC`)
        }
    })
    .unwind("$hashtags")
    .group({
        _id: "$hashtags",
        total: {$sum : 1}
    })
    .exec()
    .then(hashtags => {
        return hashtags.length;
    })
}

function getUsers(params){
   return tweets.aggregate()
    .match({
        busquedaId: params.searchId,
        postedTime: { 
            $gte: new Date(`${params.initialDate} UTC`),
            $lte: new Date(`${params.finalDate} UTC`)
        }
    })
    .group({
        _id: '$usuario.preferredUsername'
    })
    .exec()
    .then(users => {
        return users.length;
    })
}

function getGeneral(req,res){
    const request = req;
    const response = res;

    let params = req.body;
    let search = new Search(params);

    return search.paramsValid(params).then(valid => {

        let general = {};

        if( !valid ){
            throw new Error ('Invalid Request');
        }

        return Promise.all([  
            getMentions(params),
            getHashtags(params),
            getUsers(params),
            getNumberTweets(params)
        ]);
    })
    .then(results => {
        response.json({
            mentions: results[0],
            hashtags: results[1],
            users: results[2],
            tweets:results[3]
        });
    })
    .catch(error => {
        logger.error(error);
        response.sendStatus(404);
    });
}

export {getGeneral};