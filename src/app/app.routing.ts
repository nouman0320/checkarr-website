import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './Components/main/main.component';
import { StartComponent } from './Components/start/start.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { TermsAndPolicyComponent } from './Components/terms-and-policy/terms-and-policy.component';
import { RecoveryPasswordChangeComponent } from './Components/start/recovery-password-change/recovery-password-change.component';
import { RedirectRecoveryComponent } from './Components/redirect-components/redirect-recovery/redirect-recovery.component';
import { RedirectActivationComponent } from './Components/redirect-components/redirect-activation/redirect-activation.component';
import { AuthGuard } from './Guard/auth.guard';

const APP_ROUTES: Routes = [

    {   path: '', component: MainComponent,  canActivate: [AuthGuard]},
    {   path: 'welcome', component: StartComponent  , canActivate: [AuthGuard]},
    {   path: 'login', component: LoginComponent   },
    {   path: 'register', component: RegisterComponent , canActivate: [AuthGuard]},
    {   path: 'terms-and-policy', component: TermsAndPolicyComponent },
    {   path: 'password-change', component: RecoveryPasswordChangeComponent },
    {   path: 'redirect/recovery/:recoveryToken/:recoveryEmail/:recoveryCode' , component: RedirectRecoveryComponent},
    {   path: 'redirect/activation/:activationToken/:userId/:activationCode' , component: RedirectActivationComponent },
    {   path: '**', component: NotFoundComponent    }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
