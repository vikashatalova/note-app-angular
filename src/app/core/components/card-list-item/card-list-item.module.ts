import { ViewModule } from './../view/view.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardListItemComponent } from './card-list-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        CardListItemComponent
    ],
    imports: [
        CommonModule,
        ViewModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [CardListItemComponent]
})
export class CardsListItemModule {}