import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperModule } from 'ngx-image-cropper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap';





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
import { MediaService } from './Services/media.service';
import { LeftMainComponent } from './Components/main/left-main/left-main.component';
import { MiddleMainComponent } from './Components/main/middle-main/middle-main.component';
import { RightMainComponent } from './Components/main/right-main/right-main.component';
import { DefaultPostComponent } from './Components/main/middle-main/posts/default-post/default-post.component';
import { CreatePostComponent } from './Components/main/middle-main/posts/create-post/create-post.component';
import { ErrorInterceptorProvider } from './Services/error.interceptor';
import { LoadingComponent } from './Components/helper-components/loading/loading.component';
import { AlertifyService } from './Services/alertify.service';
import { AuthGuard } from './Guard/auth.guard';


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
    RedirectActivationComponent,
    LeftMainComponent,
    MiddleMainComponent,
    RightMainComponent,
    DefaultPostComponent,
    CreatePostComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    HttpClientModule,
    NgbModule.forRoot(),
    FormsModule,
    ImageCropperModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    WebService,
    AccountService,
    TokenService,
    MediaService,
    ErrorInterceptorProvider,
    AlertifyService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
