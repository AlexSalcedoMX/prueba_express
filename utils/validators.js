import search from '../models/search_model';
import mongoose from 'mongoose';
import loggerUtil from './../utils/logger';

const logger = loggerUtil.getInstance();

mongoose.Promise = global.Promise;


class Search {
    constructor(params){
        this.searchId = params.searchId;
        this.initialDate = new Date(`${params.initialDate} UTC`);
        this.finalDate = new Date(`${params.finalDate} UTC`);
    }

    paramsValid(){
        let initialDate = !isNaN(this.initialDate) ? this.initialDate : undefined;
        let finalDate = !isNaN(this.finalDate) ? this.finalDate : undefined;

        this.initialDate.setSeconds(0);
        this.initialDate.setMilliseconds(0);
        this.finalDate.setSeconds(0);
        this.finalDate.setMilliseconds(0);

        return search.findOne({_id: this.searchId}).exec()
                .then(foundSearch =>{
                    if(foundSearch && Object.keys(this).length === 3 && initialDate.getTime() < finalDate.getTime()){
                        return true;
                    }else{
                        return false;
                    }
                })
                .catch(error => {
                    if (error) {
                        logger.error(error);
                    }
                    return false;
                })
    }

}


export {Search};