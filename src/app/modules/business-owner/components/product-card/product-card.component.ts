import { Component , Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() image!: string;
  @Input() title!: string;
  @Input() type!: string;
  @Input() minQuantity!: number;
  @Input() price!: string;
  @Input() colors!: string;
  @Input() vendor!: string;

}
