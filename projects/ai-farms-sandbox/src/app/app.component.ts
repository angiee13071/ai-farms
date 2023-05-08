import { Component } from '@angular/core';
import { CommonService } from './common/services/common.service';
// import { CredentialsService } from './common/services/credentials.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private _common: CommonService,
    //   private _credencials: CredentialsService
    //
  ) {
    // _credencials.getPlataformToken().subscribe({
    //   next: (res: any) => {
    //     _credencials.platformAccessToken = res.access_token;
    //   }
    // })

    window.addEventListener('resize', () => this.checkViewport());
    this.checkViewport();
  }
  private checkViewport() {
    if (window.screen.width <= 500) this._common.device = 'mobile';
    else if (window.screen.width > 500 && window.screen.width <= 768) this._common.device = 'tablet';
    else if (window.screen.width > 768) this._common.device = 'web';
  }
}
