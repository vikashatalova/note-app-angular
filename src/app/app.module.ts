import { CardsListItemModule } from 'src/app/core/components/cards-list-item/cards-list-item.module';
import { FavoriteViewModule } from './views/favorite-view/favorite-view.module';
import { ViewModule } from './core/components/view/view.module';
import { ShellModule } from './core/components/shell/shell.module';
import { HomeViewModule } from './views/home-view/home-view.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeletedViewModule } from './views/deleted-view/deleted-view.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ShellModule,
    ViewModule,
    HomeViewModule,
    DeletedViewModule,
    FavoriteViewModule,
    CardsListItemModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
