import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { StartComponent } from "./start/start.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { NotFoundComponent } from "./not-found/not-found.component";

const APP_ROUTES: Routes =[

    {   path: '', component: MainComponent   },
    {   path: 'welcome', component: StartComponent  },
    {   path: 'login', component: LoginComponent   },
    {   path: 'signup', component: RegisterComponent   },
    {   path: '**', component: NotFoundComponent    }
];

export const routing = RouterModule.forRoot(APP_ROUTES);