import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonService } from './common/services/common.service';
import { UserService } from './common/services/user.service';
import { CredentialsService } from './common/services/credentials.service';
import { TokenInterceptor } from './common/services/interceptors/token.service';
import { environment } from './environments/environment';
import { AngularFireModule } from '@angular/fire/compat';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),

  ],
  providers: [
    { provide: 'commonService', useExisting: CommonService },
    { provide: 'UserService', useExisting: UserService },
    { provide: 'CredentialsService', useExisting: CredentialsService },
    { provide: 'environment', useValue: environment },
    //  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
