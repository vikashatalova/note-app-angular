import { MenuModule } from './../menu/menu.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell.component';
import { AppRoutingModule } from 'src/app/app-routing.module';


@NgModule({
    declarations: [
        ShellComponent
    ],
    imports: [
        CommonModule,
        MenuModule,
        AppRoutingModule
    ],
    exports: [
        ShellComponent
    ]
})
export class ShellModule {}
