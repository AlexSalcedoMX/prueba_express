import * as originalVsRt from '../controllers/original_vs_rt_controller';

function setRoutes(router){
    router.post('/originalVsRt',originalVsRt.getOriginalVsRt);
}

export default {setRoutes}