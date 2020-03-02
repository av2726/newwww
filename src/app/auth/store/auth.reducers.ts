import * as AuthActions from './auth.actions';

export interface ValidationMessage {
    code : string;
    name : string;
    message: string;
}

export interface State {
    token : string;
    authenticated : boolean;
    validationMessage : ValidationMessage;
}

const initialState: State = {
    token: null ,
    authenticated : false,
    validationMessage : {code: null,name:null, message: null,}
};

export function authReducer(state = initialState, action: AuthActions.AuthActions){
    switch(action.type){
        case (AuthActions.SIGNUP) :
        case (AuthActions.SIGNIN) :
            return {
                ...state,
                authenticated: true
            }
        case (AuthActions.LOGOUT) :
            return {
                ...state,
                token: null,
                authenticated: false
            }
        case (AuthActions.SET_TOKEN) :
            return {
                ...state,
                token: action.payload
            }
        case (AuthActions.SIGNUP_VALIDATION_ERROR) :
            return {
                ...state,
                token: null,
                authenticated: false,
                validationMessage : {code: action.payload.code, name: action.payload.name, message:action.payload.message}
            }
        default : 
            return state;
    }
    
}