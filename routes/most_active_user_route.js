import * as mostActiveUserController from '../controllers/most_active_user_controller';

function setRoutes(router){
    router.post('/mostActiveUser',mostActiveUserController.getMostActiveUser);
}

export default {setRoutes}