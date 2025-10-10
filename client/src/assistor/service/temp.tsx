import { api } from "../../api/api";
import type { RestResponse } from "../../api/api";
import type { AppointmentModel } from "../../models/Appointment.model";

export type AppointmentFilters = {
  page?: number;
  limit?: number;
  roomId?: number;
  departmentId?: number;
  status?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
};

export type AppointmentListResponse = {
  appointments: AppointmentModel[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type CreateAppointmentRequest = {
  fullName: string;
  phone: string;
  time: string;
  note?: string;
  departmentId: number;
  doctorId: number;
  roomId: number;
};

export const appointmentService = {
  async getAppointments(filters: AppointmentFilters = {}): Promise<RestResponse> {
    try {
      const params = new URLSearchParams();
      
      if (filters.page) params.append('page', filters.page.toString());
      if (filters.limit) params.append('limit', filters.limit.toString());
      if (filters.roomId) params.append('roomId', filters.roomId.toString());
      if (filters.departmentId) params.append('departmentId', filters.departmentId.toString());
      if (filters.status) params.append('status', filters.status);
      if (filters.search) params.append('search', filters.search);
      if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
      if (filters.dateTo) params.append('dateTo', filters.dateTo);

      const response = await api.get(`/appointments?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  },

  async getAppointmentById(id: number): Promise<RestResponse> {
    try {
      const response = await api.get(`/appointments/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching appointment:', error);
      throw error;
    }
  },

  async createAppointment(data: CreateAppointmentRequest): Promise<RestResponse> {
    try {
      const response = await api.post('/appointments', data);
      return response.data;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  },

  async updateAppointmentStatus(id: number, status: AppointmentModel['status']): Promise<RestResponse> {
    try {
      const response = await api.patch(`/appointments/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating appointment status:', error);
      throw error;
    }
  }
}