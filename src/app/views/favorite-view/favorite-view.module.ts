import { ViewModule } from '../../core/components/view/view.module';
import { FavoriteViewComponent } from './favorite-view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavoriteViewRoutingModule } from './favorite-view-routing.module';
import { CardsListModule } from 'src/app/core/components/cards-list/cards-list.module';


@NgModule({
    declarations: [
        FavoriteViewComponent
    ],
    imports: [
        CommonModule,
        FavoriteViewRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ViewModule,
        CardsListModule
    ]
})
export class FavoriteViewModule {}
