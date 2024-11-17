import { Component, Input  } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './stat-card.component.html',
})
export class StatCardComponent {
  @Input() title: string = '';
  @Input() value: number = 0;
  @Input() bgColor: string = 'bg-blue-100';

}
