import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {TestComponent} from './test/test.component';
import {AppRoutingModule} from './routing/app-routing.module';
import {SectionService} from './dao/section.service';
import {StudentService} from './dao/student.service';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    SectionService,
    StudentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
