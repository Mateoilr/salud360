import { Component } from '@angular/core';
import { IonicModule  } from '@ionic/angular';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, RouterOutlet, RouterLink],
})
export class HomePage {
  constructor() {}
}
