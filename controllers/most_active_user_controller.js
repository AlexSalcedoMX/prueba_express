import tweets from '../models/tweet_model'
import mongoose from 'mongoose';
import loggerUtil from './../utils/logger';

const logger = loggerUtil.getInstance();

import {Search} from '../utils/validators';

function getMostActiveUser(req,res){
    const request = req;
    const response = res;

    let params = request.body;
    let search = new Search(params);

    return search.paramsValid().then(valid =>{
        if (!valid){
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
                    _id: '$usuario.preferredUsername',
                    total: { $sum: 1 }
                })
                .sort( { total: -1 } )
                .limit(1)
                .exec()
    })
    .then( mostActiveUser => {
        response.json(mostActiveUser);
    })
    .catch( error => {
        logger.error(error);
        response.sendStatus(404);
    })
} 

export {getMostActiveUser};