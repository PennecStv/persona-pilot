import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'personapilot';

  myDataArray: Array<any> = [
    {
      last_name: 'Grimes',
      first_name: 'Amos',
      occupation: 'Dynamic Tactics Liaison',
      email: 'email 1',
      bio: 'bio 1',
      id: '1',
    },
    {
      last_name: 'Batz',
      first_name: 'Gerry',
      occupation: 'Future Data Officer',
      email: 'email 2',
      bio: 'bio 2',
      id: '2',
    },
    {
      last_name: 'Ankunding',
      first_name: 'Clyde',
      occupation: 'Chief Optimization Director',
      email: 'email 3',
      bio: 'bio 3',
      id: '3',
    },
  ];

  columnsToDisplay = ['id', 'first_name', 'last_name', 'email'];
}
