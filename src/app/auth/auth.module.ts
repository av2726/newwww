import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { VerifyComponent } from './verify/verify.component';

@NgModule({
    declarations:[
       SigninComponent,
       SignupComponent,
       VerifyComponent
],
    imports:[
        FormsModule,
        AuthRoutingModule,
        ReactiveFormsModule
        ]
    
})
export class AuthModule{
    
}