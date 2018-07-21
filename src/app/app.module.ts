import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperModule } from 'ngx-image-cropper';




import { AppComponent } from './app.component';
import { StartComponent } from './Components/start/start.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { MainComponent } from './Components/main/main.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { routing } from './app.routing';
import { WebService } from './Services/web.service';
import { AccountService } from './Services/account.service';
import { TermsAndPolicyComponent } from './Components/terms-and-policy/terms-and-policy.component';
import { TokenService } from './Services/token.service';
import { RecoveryPasswordChangeComponent } from './Components/start/recovery-password-change/recovery-password-change.component';
import { RedirectRecoveryComponent } from './Components/redirect-components/redirect-recovery/redirect-recovery.component';
import { RedirectActivationComponent } from './Components/redirect-components/redirect-activation/redirect-activation.component';


@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    NotFoundComponent,
    TermsAndPolicyComponent,
    RecoveryPasswordChangeComponent,
    RedirectRecoveryComponent,
    RedirectActivationComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    NgbModule.forRoot(),
    FormsModule,
    ImageCropperModule
  ],
  providers: [WebService, AccountService, TokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
