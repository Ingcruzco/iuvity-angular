import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-switch-lang',
  templateUrl: './switch-lang.component.html',
  styleUrls: ['./switch-lang.component.scss']
})
export class SwitchLangComponent {

  constructor(public translate:TranslateService) { }

  switchLang(lang:string="es"): void{
    this.translate.use(lang)
  }

}
