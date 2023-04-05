import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { marker as TRANSLATE_ME } from "@biesbjerg/ngx-translate-extract-marker";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'my-app';
  supportLanguages = ['vi','en'];
  
  constructor(private translateService: TranslateService){
    if(localStorage.getItem("culture")==undefined){
      localStorage.setItem("culture","vi-VN");
    }
    this.translateService.addLangs(this.supportLanguages);
    let lang = localStorage.getItem("culture") == "vi-VN"?"vi":"en";
    this.translateService.setDefaultLang(lang);
    //const browserlang = this.translateService.getBrowserLang();

    // if (this.supportLanguages.includes(browserlang)) {
    //   this.translateService.use(browserlang);
    // }
  }
  
  ngOnInit(){
    // this.translateService.addLangs(this.supportLanguages);
    // this.translateService.setDefaultLang('vi');
    // localStorage.setItem("culture","vi-VN");
    console.log("app onit");
    //this.isLogin = this.auth.isAuthenticated();
  }
  
}
