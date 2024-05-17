import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./style.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Vermeg Hive';

  constructor() { }

  ngOnInit(): void {
    // Initialization logic here
  }
}
