// src/app/modules/admin/pages/suppliers/suppliers.component.ts
import { Component, OnInit } from '@angular/core';
import { SupplierService, Supplier, ApiResponse } from '../../Services/supplier.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {
  suppliers: Supplier[] = [];
  loading = false;
  error: string | null = null;
  successMessage: string | null = null;
  
  // للبحث والفلترة
  searchTerm: string = '';
  showInactive: boolean = false;
  
  // للـ Pagination
  currentPage: number = 1;
  pageSize: number = 20; // مطابق للـ default في API
  totalPages: number = 1;
  totalItems: number = 0;
  
  // للـ Modal
  showModal: boolean = false;
  isEditMode: boolean = false;
  currentSupplier: any = {
    name: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    isActive: true
  };

  constructor(private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.loading = true;
    this.error = null;
    this.successMessage = null;
    
    const params: any = {
      pageIndex: this.currentPage,
      pageSize: this.pageSize
    };
    
    if (this.searchTerm) params.search = this.searchTerm;
    
    // isActive: لو showInactive = true، مبنعتش isActive (يعنى الكل)
    // لو showInactive = false، نبعث isActive = true (النشطين فقط)
    if (!this.showInactive) {
      params.isActive = true;
    }
    
    console.log('📤 Fetching suppliers with params:', params);
    
    this.supplierService.getAllSuppliers(params).subscribe({
      next: (response) => {
        console.log('✅ Suppliers response:', response);
        
        if (response.success) {
          // الـ data ممكن تكون array مباشرة أو object فيه items
          if (Array.isArray(response.data)) {
            this.suppliers = response.data;
            this.totalItems = response.data.length;
            this.totalPages = Math.ceil(this.totalItems / this.pageSize);
          } else if (response.data && (response.data as any).items) {
            this.suppliers = (response.data as any).items;
            this.totalItems = (response.data as any).totalCount || this.suppliers.length;
            this.totalPages = (response.data as any).totalPages || 1;
          } else {
            this.suppliers = [];
          }
          
          this.successMessage = response.message || 'تم تحميل البيانات بنجاح';
        } else {
          this.error = response.message || 'حدث خطأ في تحميل البيانات';
        }
        
        this.loading = false;
        
        // إخفاء رسالة النجاح بعد 3 ثواني
        setTimeout(() => this.successMessage = null, 3000);
      },
      error: (err) => {
        console.error('❌ Error loading suppliers:', err);
        this.error = err.message || 'فشل الاتصال بالخادم';
        this.loading = false;
      }
    });
  }

  search(): void {
    this.currentPage = 1; // الرجوع لأول صفحة عند البحث
    this.loadSuppliers();
  }

  toggleShowInactive(): void {
    this.currentPage = 1;
    this.loadSuppliers();
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.loadSuppliers();
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.currentSupplier = {
      name: '',
      contactName: '',
      email: '',
      phone: '',
      address: '',
      isActive: true
    };
    this.showModal = true;
  }

  openEditModal(supplier: Supplier): void {
    this.isEditMode = true;
    this.currentSupplier = { ...supplier };
    this.showModal = true;
  }

  saveSupplier(): void {
    if (!this.currentSupplier.name) {
      this.error = 'الاسم مطلوب';
      return;
    }
    
    this.loading = true;
    this.error = null;
    
    if (this.isEditMode) {
      this.supplierService.updateSupplier(this.currentSupplier.id, this.currentSupplier).subscribe({
        next: (response) => {
          this.loading = false;
          if (response.success) {
            this.showModal = false;
            this.successMessage = 'تم تحديث المورد بنجاح';
            this.loadSuppliers();
          } else {
            this.error = response.message || 'فشل تحديث المورد';
          }
        },
        error: (err) => {
          this.loading = false;
          console.error('❌ Error updating:', err);
          this.error = err.message || 'فشل تحديث المورد';
        }
      });
    } else {
      this.supplierService.createSupplier(this.currentSupplier).subscribe({
        next: (response) => {
          this.loading = false;
          if (response.success) {
            this.showModal = false;
            this.successMessage = 'تم إضافة المورد بنجاح';
            this.loadSuppliers();
          } else {
            this.error = response.message || 'فشل إضافة المورد';
          }
        },
        error: (err) => {
          this.loading = false;
          console.error('❌ Error creating:', err);
          this.error = err.message || 'فشل إضافة المورد';
        }
      });
    }
  }

  deleteSupplier(id: number): void {
    if (confirm('هل أنت متأكد من حذف هذا المورد؟')) {
      this.loading = true;
      
      this.supplierService.deleteSupplier(id).subscribe({
        next: (response) => {
          this.loading = false;
          if (response.success) {
            this.successMessage = 'تم حذف المورد بنجاح';
            this.loadSuppliers();
          } else {
            this.error = response.message || 'فشل حذف المورد';
          }
        },
        error: (err) => {
          this.loading = false;
          console.error('❌ Error deleting:', err);
          this.error = err.message || 'فشل حذف المورد';
        }
      });
    }
  }

  toggleStatus(supplier: Supplier): void {
    const newStatus = !supplier.isActive;
    
    this.supplierService.toggleSupplierStatus(supplier.id, newStatus).subscribe({
      next: (response) => {
        if (response.success) {
          supplier.isActive = newStatus;
          this.successMessage = `تم ${newStatus ? 'تفعيل' : 'تعطيل'} المورد بنجاح`;
          setTimeout(() => this.successMessage = null, 3000);
        } else {
          this.error = response.message || 'فشل تغيير الحالة';
        }
      },
      error: (err) => {
        console.error('❌ Error toggling status:', err);
        this.error = err.message || 'فشل تغيير الحالة';
      }
    });
  }

  closeModal(): void {
    this.showModal = false;
    this.error = null;
  }

  // للـ Pagination
  get pagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
}