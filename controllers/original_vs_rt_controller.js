import tweets from '../models/tweet_model'
import mongoose from 'mongoose';
import loggerUtil from './../utils/logger';

const logger = loggerUtil.getInstance();

import {Search} from '../utils/validators';

function getOriginalVsRt (req,res){
    const request = req;
    const response = res;

    let params = req.body;
    let search = new Search(params);

    return search.paramsValid().then(valid => {
        if(!valid){
            throw new Error('Invalid Request');
        }

        return tweets.aggregate()
            .match({
                busquedaId: params.searchId,
                postedTime: { 
                    $gte: new Date(`${params.initialDate} UTC`), 
                    $lte: new Date(`${params.finalDate} UTC`)
                }
            })
            .group({
                _id: "$verb",
                total: { $sum: 1 }
            })
            .exec()
    })
    .then(totalOriginalRt => {
        response.json(getPercentage(totalOriginalRt));
    })
    .catch(error => {
        logger.error(error);
        response.sendStatus(404);
    });

}

function getPercentage(obj){
    let sum = obj.reduce((previousValue, currentValue) => previousValue + currentValue.total, 0);
    let percentage = [];
    for(let index in obj){
        percentage[index] = {verb:obj[index]._id,percentage:Math.round((obj[index].total / sum)*100)};
    }
    return percentage;
}

export {getOriginalVsRt};