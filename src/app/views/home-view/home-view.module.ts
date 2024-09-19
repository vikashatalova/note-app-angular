import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeViewComponent } from './home-view.component';
import { HomeViewRoutingModule } from './home-view-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewModule } from './../../core/components/view/view.module';
import { CardsListModule } from 'src/app/core/components/cards-list/cards-list.module';
import { ColorSketchModule } from 'ngx-color/sketch';

@NgModule({
    declarations: [
        HomeViewComponent
    ],
    imports: [
        CommonModule,
        HomeViewRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ViewModule,
        CardsListModule,
        ColorSketchModule
    ],
    schemas: []
})
export class HomeViewModule {}
