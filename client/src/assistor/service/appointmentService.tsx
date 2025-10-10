import { api } from "../../api/api";

export const AppointmentService = {
  async getAppointments() {
    try {
      const response = await api.get('/appointments');
      return response.data;
    } catch (err) {
      console.error('Lỗi khi fetch appointment', err);
    }
  }
}