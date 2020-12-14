import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UpdateItemService } from '../update-item.service';

@Component({
  selector: 'app-bucket-list',
  templateUrl: './bucket-list.page.html',
  styleUrls: ['./bucket-list.page.scss'],
})

export class BucketListPage implements OnInit {

  bucketList: any = [];
  itemList: any = [];
  quantity: any = '';
  subTotalArray: any = [];
  total: any = '0';
  @Output() public newItemEvent = new EventEmitter<string>();

  constructor(
    private storage: Storage,
    private alertCtrl: AlertController,
    public service: UpdateItemService,
    public viewCtrl: ModalController,
    private events: UpdateItemService

  ) {
    this.storage.get('cart').then((val) => {
      if (val != null) {
        this.bucketList = val;
        console.log(this.bucketList);
        if (this.bucketList.length > 0) {
          for (let i = 0; i < this.bucketList.length; i++) {
            this.subTotalArray.push(parseInt(this.bucketList[i].quantity) * parseInt(this.bucketList[i].price));
          }
        }

        this.total = this.subTotalArray.reduce(function (accumulator, currentValue) {
          return accumulator + currentValue
        }, 0).toString();
        console.log(this.total);
      }
    });

    this.storage.get('items').then((val) => {
      if (val != null) {
        this.itemList = val;
        console.log(this.itemList.length);
      }
    });
  }

  getSubTotal(quantity, price) {
    return parseInt(quantity) * parseInt(price);
  }

  async removeItem(i, item) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmation !',
      message: 'Are you sure you want to remove this item?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah'); // this is used to cancel
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.bucketList.splice(i, 1);  // this navigate to logout().
            // this.newItemEvent.emit(this.bucketList.length);
            this.itemList.push(item);
            this.events.updateList({ 'items': this.itemList, 'cart': this.bucketList });
            this.service.setBucketList(this.bucketList.length);
            this.viewCtrl.dismiss();
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
  }

}
