import {Component, Input} from '@angular/core';
import {Platform, NavParams, ViewController} from 'ionic-angular';

@Component({
  selector: 'rating',
  templateUrl: './build/components/rating.html'
})
export class Rating {
  @Input()
  value: number;

  stars:Array<boolean> = [];

  ngOnInit() {
    for(let i=0; i<5; i++) {
      this.stars.push(i<this.value);
    }
  }
}
