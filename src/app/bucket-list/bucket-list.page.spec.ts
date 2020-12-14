import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BucketListPage } from './bucket-list.page';

describe('BucketListPage', () => {
  let component: BucketListPage;
  let fixture: ComponentFixture<BucketListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BucketListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BucketListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
