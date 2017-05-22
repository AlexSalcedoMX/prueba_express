import * as hashtagController from '../controllers/hashtag_controller';

function setRoutes(router){
    router.post('/hashtag',hashtagController.getTopHashtags);
}

export default {setRoutes}