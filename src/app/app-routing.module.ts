import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'item-list',
    pathMatch: 'full'
  },
  {
    path: 'item-list',
    loadChildren: () => import('./item-list/item-list.module').then(m => m.ItemListPageModule)
  },
  {
    path: 'bucket-list',
    loadChildren: () => import('./bucket-list/bucket-list.module').then(m => m.BucketListPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
