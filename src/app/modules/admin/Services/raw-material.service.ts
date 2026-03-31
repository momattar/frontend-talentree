// src/app/modules/admin/services/raw-material.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../../modules/auth/services/auth.service'; 

export interface RawMaterial {
  id: number;
  name: string;
  description?: string;
  category?: string;
  price?: number;
  unit?: string;
  stockQuantity?: number;
  isAvailable?: boolean;
  supplierId?: number;
  supplierName?: string;
  imageUrl?: string;
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
export class RawMaterialService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService // ← حقن AuthService
  ) {
    this.apiUrl = this.authService.apiUrl; // ← استخدام apiUrl من AuthService
  }

  /**
   * GET /api/AdminRawMaterial - جلب كل المواد الخام
   */
  getAllMaterials(params?: {
    category?: string;
    search?: string;
    isAvailable?: boolean;
    pageIndex?: number;
    pageSize?: number;
  }): Observable<ApiResponse<RawMaterial[]>> {
    const url = `${this.apiUrl}/api/AdminRawMaterial`;
    return this.http.get<ApiResponse<RawMaterial[]>>(url, { params });
  }

  /**
   * GET /api/AdminRawMaterial/{id} - جلب مادة خام واحدة
   */
  getMaterialById(id: number): Observable<ApiResponse<RawMaterial>> {
    const url = `${this.apiUrl}/api/AdminRawMaterial/${id}`;
    return this.http.get<ApiResponse<RawMaterial>>(url);
  }

  /**
   * POST /api/AdminRawMaterial - إضافة مادة خام جديدة
   */
  createMaterial(materialData: any): Observable<ApiResponse<RawMaterial>> {
    const url = `${this.apiUrl}/api/AdminRawMaterial`;
    return this.http.post<ApiResponse<RawMaterial>>(url, materialData);
  }

  /**
   * PUT /api/AdminRawMaterial/{id} - تحديث مادة خام
   */
  updateMaterial(id: number, materialData: any): Observable<ApiResponse<RawMaterial>> {
    const url = `${this.apiUrl}/api/AdminRawMaterial/${id}`;
    return this.http.put<ApiResponse<RawMaterial>>(url, materialData);
  }

  /**
   * DELETE /api/AdminRawMaterial/{id} - حذف مادة خام
   */
  deleteMaterial(id: number): Observable<ApiResponse<any>> {
    const url = `${this.apiUrl}/api/AdminRawMaterial/${id}`;
    return this.http.delete<ApiResponse<any>>(url);
  }

  /**
   * PATCH /api/AdminRawMaterial/{id}/restock - إعادة تخزين
   */
  restockMaterial(id: number, quantity: number): Observable<ApiResponse<RawMaterial>> {
    const url = `${this.apiUrl}/api/AdminRawMaterial/${id}/restock`;
    return this.http.patch<ApiResponse<RawMaterial>>(url, { quantity });
  }

  /**
   * POST /api/AdminRawMaterial/{id}/upload-image - رفع صورة
   */
  uploadImage(id: number, file: File): Observable<ApiResponse<any>> {
    const url = `${this.apiUrl}/api/AdminRawMaterial/${id}/upload-image`;
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<ApiResponse<any>>(url, formData);
  }
}