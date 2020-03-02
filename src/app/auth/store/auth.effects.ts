import { Effect, Actions, ofType  } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as AuthActions from './auth.actions';
import { map, tap, switchMap, mergeMap } from 'rxjs/operators';
//import * as firebase from 'firebase';
import { from } from 'rxjs';//fromPromise
import { Auth } from 'aws-amplify';
import { CognitoUser, CognitoUserSession, CognitoAccessToken } from 'amazon-cognito-identity-js';


@Injectable()
export class AuthEffects {
    
    //@Effect({dispatch: false})
    @Effect()
    authSignup = this.actions$.pipe(ofType(AuthActions.TRY_SIGNUP), map(
        (action: AuthActions.TrySignup) =>{
            return action.payload;
        }
        ), switchMap((authData: {username : string, password: string})=>{
            return from(Auth.signUp({ username:authData.username, password: authData.password,attributes: {email:authData.username }}));
          //return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));  
        }), mergeMap((data)=>{
                console.log(data);
                if(!data.userConfirmed) {
                    return [
                        {
                            type:AuthActions.SIGNUP
                        },
                        {
                            type:AuthActions.SIGNUP_VALIDATION_ERROR,
                            payload:{code: 'User is not confirmed yet', name:'User is not confirmed yet', message:'User is not confirmed yet'}
                        }
                    ]
                }
                if(data.userConfirmed) {
                    const cognitoUserSession : CognitoUserSession = data.user.getSignInUserSession();
                    const cognitoAccessToken : CognitoAccessToken = cognitoUserSession.getAccessToken();
                    const token =  cognitoAccessToken.getJwtToken();
                    return [
                        {
                            type:AuthActions.SIGNUP
                        },
                        {
                            type:AuthActions.SET_TOKEN,
                            payload:token
                        }
                    ]
                }
            
        }) /*, switchMap(()=>{
            //return from(firebase.auth().currentUser.getIdToken());
        })*///, tap((/*token:string*/)=>{
            //this.router.navigate(['/']);
            //return [
             //   {
              //      type:AuthActions.SIGNUP
            //    }/*,
                //{
                //    type:AuthActions.SET_TOKEN,
                //    payload:token
            //    }*/
              //  ];
        //})
        );
    @Effect({dispatch:false})
    authVerify =  this.actions$.pipe(ofType(AuthActions.TRY_VERIFY), map(
        (action: AuthActions.TryVerify) =>{
            return action.payload;
        }),
        switchMap((verifyData: {username : string, verifycode: string})=>{
            return from(Auth.confirmSignUp(verifyData.username, verifyData.verifycode, {forceAliasCreation: true}));
        }),tap((data)=>{
            if(data==='SUCCESS'){
                alert("Verification Complete. Kindly Signin to continue");
                this.router.navigate(['/signin']);    
            }else {
                alert("Verification Failed. Kindly Try Again");
                console.log(data);
            }
        })
        );
    @Effect()
    authSignin = this.actions$.pipe(ofType(AuthActions.TRY_SIGNIN), map(
        (action: AuthActions.TrySignin) =>{
            return action.payload;
        }
        ), switchMap((authData: {username : string, password: string})=>{
          //return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));  
          return from(Auth.signIn(authData.username, authData.password));
        })/*, tap((user)=> {console.log(user)})*/, switchMap((user: CognitoUser)=>{
             //console.log(user);
             //return null;
             const cognitoUserSession : CognitoUserSession = user.getSignInUserSession();
             const cognitoAccessToken : CognitoAccessToken = cognitoUserSession.getAccessToken();
             return from(cognitoAccessToken.getJwtToken());
            //return from(firebase.auth().currentUser.getIdToken());
        }), mergeMap((token:string)=>{
            this.router.navigate(['/']);
            return [
                {
                    type:AuthActions.SIGNIN
                },
                {
                    type:AuthActions.SET_TOKEN,
                    payload:token
                }
                ];
        }));
    
    @Effect({ dispatch: false})
    authLogout = this.actions$.pipe(ofType(AuthActions.LOGOUT), switchMap(()=>{
        return from(Auth.signOut());
    }),tap(() =>{
        this.router.navigate(['/']);    
    }));
    constructor(private actions$: Actions, private router: Router){}
    
}