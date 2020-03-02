import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { VerifyComponent } from './verify/verify.component';

const authRoutes : Routes = [
        {path:'signup',component:SignupComponent, children:[
            
            ]},
    {path:'signin',component:SigninComponent},
    {path:'verify',component:VerifyComponent, children:[
        {path: ':username', component: VerifyComponent},
        ]}
        
    ];
    


@NgModule({
    imports : [
        RouterModule.forChild(authRoutes)
        ],
    exports:[
        RouterModule
        ]
    
})
export class AuthRoutingModule{
    
}