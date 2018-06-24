import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./Components/main/main.component";
import { StartComponent } from "./Components/start/start.component";
import { LoginComponent } from "./Components/login/login.component";
import { RegisterComponent } from "./Components/register/register.component";
import { NotFoundComponent } from "./Components/not-found/not-found.component";
import { TermsAndPolicyComponent } from './Components/terms-and-policy/terms-and-policy.component';

const APP_ROUTES: Routes =[

    {   path: '', component: MainComponent   },
    {   path: 'welcome', component: StartComponent  },
    {   path: 'login', component: LoginComponent   },
    {   path: 'register', component: RegisterComponent   },
    {   path:  'terms-and-policy', component: TermsAndPolicyComponent },
    {   path: '**', component: NotFoundComponent    }
];

export const routing = RouterModule.forRoot(APP_ROUTES);