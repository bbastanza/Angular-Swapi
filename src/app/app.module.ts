import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SplashComponent } from './pages/splash/splash.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'main', component: MainComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    MainComponent,
    PaginationComponent,
    TableComponent,
  ],
  imports: [FormsModule, BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
