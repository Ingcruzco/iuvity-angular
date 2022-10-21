import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Prueba técnica';
  constructor(
    public translate: TranslateService
  ) {
    console.log("entre")
    translate.addLangs(['es', 'en']);
    translate.setDefaultLang('es');

  }
}
