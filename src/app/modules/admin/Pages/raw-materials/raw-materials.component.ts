// src/app/modules/admin/pages/raw-materials/raw-materials.component.ts
import { Component, OnInit } from '@angular/core';
import { RawMaterialService, RawMaterial } from '../../Services/raw-material.service';

@Component({
  selector: 'app-raw-materials',
  templateUrl: './raw-materials.component.html',
  styleUrls: ['./raw-materials.component.css']
})
export class RawMaterialsComponent implements OnInit {
  materials: RawMaterial[] = [];
  loading = false;
  error: string | null = null;
  
  // للبحث والفلترة
  searchTerm: string = '';
  selectedCategory: string = '';
  categories: string[] = ['خشب', 'حديد', 'بلاستيك', 'زجاج']; // مثال
  
  // للـ Pagination
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  totalItems: number = 0;
  
  // للـ Modal (إضافة/تعديل)
  showModal: boolean = false;
  isEditMode: boolean = false;
  currentMaterial: any = {};
  
  constructor(private rawMaterialService: RawMaterialService) { }

  ngOnInit(): void {
    this.loadMaterials();
  }

  loadMaterials(): void {
    this.loading = true;
    this.error = null;
    
    const params: any = {
      pageIndex: this.currentPage,
      pageSize: this.pageSize
    };
    
    if (this.searchTerm) params.search = this.searchTerm;
    if (this.selectedCategory) params.category = this.selectedCategory;
    
    this.rawMaterialService.getAllMaterials(params).subscribe({
      next: (response: any) => {
        console.log('مواد خام:', response);
        if (response.isSuccess) {
          this.materials = response.data?.items || [];
          this.totalPages = response.data?.totalPages || 1;
          this.totalItems = response.data?.totalCount || 0;
        } else {
          this.error = response.message || 'حدث خطأ في تحميل البيانات';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('خطأ:', err);
        this.error = 'فشل الاتصال بالخادم';
        this.loading = false;
      }
    });
  }

  // البحث
  search(): void {
    this.currentPage = 1;
    this.loadMaterials();
  }

  // تغيير الصفحة
  changePage(page: number): void {
    this.currentPage = page;
    this.loadMaterials();
  }

  // فتح نافذة الإضافة
  openAddModal(): void {
    this.isEditMode = false;
    this.currentMaterial = {};
    this.showModal = true;
  }

  // فتح نافذة التعديل
  openEditModal(material: any): void {
    this.isEditMode = true;
    this.currentMaterial = { ...material };
    this.showModal = true;
  }

  // حفظ المادة (إضافة/تعديل)
  saveMaterial(): void {
    if (this.isEditMode) {
      // تحديث
      this.rawMaterialService.updateMaterial(this.currentMaterial.id, this.currentMaterial).subscribe({
        next: (response: any) => {
          if (response.isSuccess) {
            this.showModal = false;
            this.loadMaterials();
          }
        }
      });
    } else {
      // إضافة
      this.rawMaterialService.createMaterial(this.currentMaterial).subscribe({
        next: (response: any) => {
          if (response.isSuccess) {
            this.showModal = false;
            this.loadMaterials();
          }
        }
      });
    }
  }

  // حذف مادة
  deleteMaterial(id: number): void {
    if (confirm('هل أنت متأكد من حذف هذه المادة؟')) {
      this.rawMaterialService.deleteMaterial(id).subscribe({
        next: (response: any) => {
          if (response.isSuccess) {
            this.loadMaterials();
          }
        }
      });
    }
  }

  // إعادة تخزين
  restockMaterial(id: number, quantity: number): void {
    this.rawMaterialService.restockMaterial(id, quantity).subscribe({
      next: (response: any) => {
        if (response.isSuccess) {
          this.loadMaterials();
        }
      }
    });
  }
}