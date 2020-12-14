import { Component } from '@angular/core';

import { MenuController, ModalController, Platform, PopoverController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BucketListPage } from './bucket-list/bucket-list.page';
import { Storage } from '@ionic/storage';
import { UpdateItemService } from './update-item.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  totalItem: any = '0';
  bucketList: any = [];
  itemList: any = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public viewCtrl: ModalController,
    private storage: Storage,
    public service: UpdateItemService,
    private router: Router,
    
  ) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
       
    });
  }

  getCount() {
    this.totalItem = this.service.getBucketListCount();
    return this.totalItem;
  }

  async exploreCart() {
    let modal = await this.viewCtrl.create({
      component: BucketListPage
    });

    return await modal.present();
  }

}
