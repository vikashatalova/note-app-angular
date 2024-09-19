import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './cards.component';
import { CardsListItemModule } from '../card-list-item/card-list-item.module';
import { CardsRoutingModule } from './cards-routing.module';

@NgModule({
    declarations: [
        CardsComponent
    ],
    imports: [
        CommonModule,
        CardsListItemModule,
        CardsRoutingModule
    ],
    exports: [CardsComponent]
})
export class CardsModule {}