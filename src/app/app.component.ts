import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NumberService } from './shared/number.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private numberService: NumberService) {
  }

  ngOnInit(): void {

  }


}

