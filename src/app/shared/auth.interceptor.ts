import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import { switchMap, take } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private store: Store<fromApp.AppState>){}
    
    intercept(req: HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>>{// before sending the request
        console.log('Intercepted : - ',req);
        return this.store.select('auth')
                .pipe(take(1), switchMap(
                    (authState: fromAuth.State) =>{
                        const copiedRequest = req.clone({params:req.params.set('auth',authState.token)});
                        return next.handle(copiedRequest);
                    }
                    ));
    }
}