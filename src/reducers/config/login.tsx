
/**
 *  in this interface the main properties that complement the redcuer function are handled
 */
interface InitialState {
    token: string;
    isPasswordDefault: boolean;
    isForgotPasswordView: boolean;
    logout?: () => void;
    user: any;
    menu: Array<any>;
    screens: Array<any>;
    actions: Array<any>;
    permissions: any;
}

export const actionTypes = {
    LOGIN: 'LOGIN',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_ERROR: 'LOGIN_ERROR',
    CHANGE_PASSWORD: 'CHANGE_PASSWORD',
    RESET_VIEW_LOGIN: 'RESET_VIEW_LOGIN',
    SEND_PASSWORD: 'SEND_PASSWORD',
    LOGOUT: 'LOGOUT',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_ERROR: 'LOGOUT_ERROR',
    VALIDATE: 'VALIDATE',
    RENEW: 'RENEW',
    RENEW_SUCCESS: 'RENEW_SUCCESS',
    USE_PASSWORD_DEFAULT: 'USE_PASSWORD_DEFAULT',
    FORGOT_PASSWORD_VIEW: 'FORGOT_PASSWORD_VIEW',
};

const initialState: InitialState = {
    token: '',
    user: {},
    menu: [],
    screens: [],
    actions: [],
    isPasswordDefault: false,
    isForgotPasswordView: false,
    permissions: {
        see: true,
        create: true,
        update: true,
        delete: true
    }
}


export default function (state: InitialState = initialState, action: any) {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
        case actionTypes.RENEW_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        case actionTypes.LOGIN_ERROR:
        case actionTypes.LOGOUT_SUCCESS:
        case actionTypes.LOGOUT_ERROR:
            return {
                ...state,
                token: '',
                user: {},
                menu: [],
                screens: [],
                actions: []
            };
        case actionTypes.RESET_VIEW_LOGIN:
            return {
                ...state,
                isPasswordDefault: false,
                isForgotPasswordView: false
            }
        case actionTypes.USE_PASSWORD_DEFAULT:
            return {
                ...state,
                isPasswordDefault: true,
                isForgotPasswordView: false
            }
        case actionTypes.FORGOT_PASSWORD_VIEW:
            return {
                ...state,
                isPasswordDefault: false,
                isForgotPasswordView: true
            }
        default: return state;
    }
}