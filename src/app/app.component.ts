

import { Component } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Placement_Cell';
  isLoading$ = this.loadingService.loading$;  // Subscribe to loading observable

  constructor(private loadingService: LoadingService) {}
}
