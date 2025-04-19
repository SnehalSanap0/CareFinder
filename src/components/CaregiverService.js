import axios from 'axios';

const API_URL = "/api/caregiver";

class CaregiverService {
  // Get all caregivers - no authentication required
  getAllCaregivers() {
    return axios.get(`${API_URL}/all`);
  }
  
  // Get caregiver by ID - no authentication required
  getCaregiverById(id) {
    return axios.get(`${API_URL}/${id}`);
  }
  
  // Get current user's caregiver application - requires token
  getMyApplication(token) {
    return axios.get(`${API_URL}/application`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  // Apply as caregiver - requires token
  applyAsCaregiver(token, applicationData, qrCodeFile) {
    const formData = new FormData();
    formData.append('application', new Blob([JSON.stringify(applicationData)], {
      type: 'application/json'
    }));
    
    if (qrCodeFile) {
      formData.append('qrCode', qrCodeFile);
    }
    
    return axios.post(`${API_URL}/apply`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
  }
  
  // Update caregiver application - requires token
  updateApplication(token, applicationData, qrCodeFile) {
    const formData = new FormData();
    formData.append('application', new Blob([JSON.stringify(applicationData)], {
      type: 'application/json'
    }));
    
    if (qrCodeFile) {
      formData.append('qrCode', qrCodeFile);
    }
    
    return axios.put(`${API_URL}/update`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
  }
}

export default new CaregiverService();