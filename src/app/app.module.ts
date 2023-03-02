import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddBarComponent } from './add-bar/add-bar.component';
import { GlobalListComponent } from './global-list/global-list.component';
import { TodoComponent } from './todo/todo.component';
import { ChoicePrintComponent } from './choice-print/choice-print.component';
import { SwitchComponent } from './switch/switch.component';
import { BockTodoComponent } from './bock-todo/bock-todo.component';

@NgModule({
  declarations: [
    AppComponent,
    AddBarComponent,
    GlobalListComponent,
    TodoComponent,
    ChoicePrintComponent,
    SwitchComponent,
    BockTodoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
