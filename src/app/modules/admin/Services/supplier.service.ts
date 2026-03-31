// src/app/modules/admin/services/supplier.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../../modules/auth/services/auth.service';

export interface Supplier {
  id: number;
  name: string;
  contactName?: string;
  email?: string;
  phone?: string;
  address?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  errors: string[];
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.apiUrl = this.authService.apiUrl;
  }

  /**
   * GET /api/AdminSupplier - جلب كل الموردين
   */
  getAllSuppliers(params?: {
    search?: string;
    isActive?: boolean;
    pageIndex?: number;
    pageSize?: number;
  }): Observable<ApiResponse<Supplier[]>> {
    const url = `${this.apiUrl}/api/AdminSupplier`;
    return this.http.get<ApiResponse<Supplier[]>>(url, { params });
  }

  /**
   * GET /api/AdminSupplier/{id} - جلب مورد واحد
   */
  getSupplierById(id: number): Observable<ApiResponse<Supplier>> {
    const url = `${this.apiUrl}/api/AdminSupplier/${id}`;
    return this.http.get<ApiResponse<Supplier>>(url);
  }

  /**
   * POST /api/AdminSupplier - إضافة مورد جديد
   */
  createSupplier(supplierData: any): Observable<ApiResponse<Supplier>> {
    const url = `${this.apiUrl}/api/AdminSupplier`;
    return this.http.post<ApiResponse<Supplier>>(url, supplierData);
  }

  /**
   * PUT /api/AdminSupplier/{id} - تحديث مورد
   */
  updateSupplier(id: number, supplierData: any): Observable<ApiResponse<Supplier>> {
    const url = `${this.apiUrl}/api/AdminSupplier/${id}`;
    return this.http.put<ApiResponse<Supplier>>(url, supplierData);
  }

  /**
   * DELETE /api/AdminSupplier/{id} - حذف مورد
   */
  deleteSupplier(id: number): Observable<ApiResponse<any>> {
    const url = `${this.apiUrl}/api/AdminSupplier/${id}`;
    return this.http.delete<ApiResponse<any>>(url);
  }

  /**
   * تفعيل/تعطيل مورد
   */
  toggleSupplierStatus(id: number, isActive: boolean): Observable<ApiResponse<Supplier>> {
    return this.updateSupplier(id, { isActive });
  }
}