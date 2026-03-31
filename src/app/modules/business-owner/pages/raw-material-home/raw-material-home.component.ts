import { Component } from '@angular/core';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
interface RawMaterialItem {
  name: string;
  type: string;
  minQty: number;
  price: string;
  colors: string;
  vendor: string;
  image: string;
  title:string;
}
@Component({
  selector: 'app-raw-material-home',
  standalone: true,
  imports: [ProductCardComponent,CarouselModule],
  templateUrl: './raw-material-home.component.html',
  styleUrl: './raw-material-home.component.css'
})
export class RawMaterialHomeComponent {
  //owl caroseal options
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay:true,
    autoplayTimeout:2000,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: true,
  }
  // Filter fields (bound to inputs)
  searchName = '';
  searchVendor = '';
  minQtyFilter: number | null = null;

  // All items
  items: RawMaterialItem[] = [
    {
      name: 'Nylon 6,6',
      type: 'Synthetic',
      minQty: 500,
      price: '$4.80 / m',
      colors: 'Black, Navy',
      vendor: 'TexSupplies',
      image:
        'https://i.pinimg.com/1200x/b7/af/82/b7af82c2cd99a76f1020746e5eeaae2c.jpg',
      title:'cotton dress'
    },
    {
      name: 'Organic Cotton Knit',
      type: 'Natural',
      minQty: 300,
      price: '$3.10 / m',
      colors: 'White, Cream',
      vendor: 'GreenFiber Co.',
      image:
        'https://i.pinimg.com/1200x/f8/ff/a8/f8ffa8318021e19de6f350998f637115.jpg',
      title:'cotton dress'
    },
    {
      name: 'Polyester Satin',
      type: 'Synthetic',
      minQty: 800,
      price: '$2.60 / m',
      colors: 'Emerald, Royal Blue',
      vendor: 'ShineTex Global',
      image:
        'https://i.pinimg.com/736x/23/d2/22/23d2225c1d5f995ba53a8ca04f8bf898.jpg',
      title:'cotton dress'
    },
    {
      name: 'Rayon Challis',
      type: 'Semi-synthetic',
      minQty: 400,
      price: '$3.80 / m',
      colors: 'Olive, Mustard',
      vendor: 'SoftWeave Mills',
      image:
        'https://i.pinimg.com/736x/23/d2/22/23d2225c1d5f995ba53a8ca04f8bf898.jpg',
      title:'cotton dress'
    },
    {
      name: 'Linen Blend',
      type: 'Natural Blend',
      minQty: 200,
      price: '$5.20 / m',
      colors: 'Natural, Stone',
      vendor: 'Heritage Looms',
      image:
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      title:'cotton dress'
    },
    {
      name: 'Microfiber Twill',
      type: 'Synthetic',
      minQty: 600,
      price: '$4.10 / m',
      colors: 'Charcoal, Steel Blue',
      vendor: 'Precision Textiles',
      image:
        'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=800&q=80',
      title:'cotton dress'
    },
    {
      name: 'Bamboo Jersey',
      type: 'Natural',
      minQty: 250,
      price: '$4.50 / m',
      colors: 'Forest, Slate',
      vendor: 'EcoBlend Fabrics',
      image:
        'https://images.unsplash.com/photo-1582719478584-6a85f2baf44d?auto=format&fit=crop&w=800&q=80',
      title:'cotton dress'
    },
    {
      name: 'Recycled PET Fleece',
      type: 'Recycled',
      minQty: 700,
      price: '$3.90 / m',
      colors: 'Heather Grey, Black',
      vendor: 'LoopCycle Textiles',
      image:
        'https://images.unsplash.com/photo-1616309275760-c81c8e8d5c5b?auto=format&fit=crop&w=800&q=80',
      title:'cotton dress'
    }
  ];

  // Items after filtering
  filteredItems: RawMaterialItem[] = [...this.items];

  /** Called when user clicks the Filter button */
  applyFilters(): void {
    const name = this.searchName.trim().toLowerCase();
    const vendor = this.searchVendor.trim().toLowerCase();
    const minQty = this.minQtyFilter;

    this.filteredItems = this.items.filter(item => {
      const matchesName =
        !name || item.name.toLowerCase().includes(name);

      const matchesVendor =
        !vendor || item.vendor.toLowerCase().includes(vendor);

      const matchesQty =
        minQty == null || item.minQty >= minQty;

      return matchesName && matchesVendor && matchesQty;
    });
  }

  /** Optional: clear all filters */
  clearFilters(): void {
    this.searchName = '';
    this.searchVendor = '';
    this.minQtyFilter = null;
    this.filteredItems = [...this.items];
  }
}

