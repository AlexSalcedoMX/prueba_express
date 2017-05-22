import * as generalController from '../controllers/general_controller';

function setRoutes(router){
    router.post('/general',generalController.getGeneral);
}

export default {setRoutes}