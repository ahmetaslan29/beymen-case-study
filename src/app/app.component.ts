import { Component } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { NavComponent } from './component/nav/nav.component';
import { HeaderComponent } from './component/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, HeaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {

  title = 'beymen-case-study';



}
