import { reducer as form } from 'redux-form'
import { reducer as toastr } from 'react-redux-toastr'

import auth, { actionTypes as actionLogin } from './config/login'
import config, { actionTypes as actionConfig } from './config/general'

import trainings, { actionTypes as actionTrainings } from './reddit/reddit'

export const actionsReducers = {
    ...actionLogin,
    ...actionConfig,
    ...actionTrainings,
};

export default {
    form,
    toastr,
    auth,
    config,
    trainings,
}
