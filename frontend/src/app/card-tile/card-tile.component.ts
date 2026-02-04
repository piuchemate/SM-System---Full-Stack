import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-tile',
  templateUrl: './card-tile.component.html',
  styleUrls: ['./card-tile.component.css']
})
export class CardTileComponent {
@Input() icon: string = '<i class="fa-solid fa-screen-users"></i>';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() link: string = '';

}
