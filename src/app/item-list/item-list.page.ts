import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { UpdateItemService } from '../update-item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.page.html',
  styleUrls: ['./item-list.page.scss'],
})
export class ItemListPage implements OnInit {

  itemList: any = [];
  bucketList: any = [];
  totalItem: any = '';
  subscription: Subscription;
  @Output() public newItemEvent = new EventEmitter<string>();

  constructor(
    private loadingctrl: LoadingController,
    public httpClient: HttpClient,
    private storage: Storage,
    public service: UpdateItemService,
    private route: ActivatedRoute,
    private router: Router,
    private events: UpdateItemService
  ) {

    this.subscription = this.events.getUpdatedList().subscribe(text => {
      console.log('subcribed');
      console.log(text);
      this.itemList = text.items;
      this.bucketList = text.cart;
      this.storage.set('cart', this.bucketList);
      this.storage.set('items', this.itemList);

      if (this.itemList.length == 0) {
        this.getItemList();
      }
    })
  }

  getItemList() {

    this.loadingctrl.create({ keyboardClose: true, message: 'Please wait...' }) //show progress bar
      .then(loadingEl => {
        loadingEl.present();

        this.httpClient.get('https://www.mocky.io/v2/5eda4003330000740079ea60').subscribe((response: any) => { // success 
          loadingEl.dismiss();
          this.itemList = response.data;
          this.storage.set('items', this.itemList);
        },
          error => { // error 
            loadingEl.dismiss();
            console.log(error);
          });
      });
  }

  addToCart(item, index) {
    this.bucketList.push(item);
    this.itemList.splice(index, 1);
    this.storage.set('cart', this.bucketList);
    this.storage.set('items', this.itemList);
    this.service.setBucketList(this.bucketList.length);
  }

  ngOnInit() {
    console.log('init');
    this.events.updateList({ 'items': this.itemList, 'cart': this.bucketList });
    // if (this.itemList.length == 0) {
    //   this.getItemList();
    // }
  }

}
