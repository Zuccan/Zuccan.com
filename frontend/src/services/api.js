/**
 * Unified API Client for Zuccano FastAPI Backend
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const apiClient = {
  /**
   * Submit customer inquiry or waitlist request
   */
  async submitCustomerLead(data) {
    const response = await fetch(`${API_BASE_URL}/customers/inquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to submit inquiry');
    }
    return response.json();
  },

  /**
   * Submit B2B business partnership inquiry
   */
  async submitBusinessInquiry(data) {
    const response = await fetch(`${API_BASE_URL}/business/partner-inquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to submit partnership request');
    }
    return response.json();
  },

  /**
   * Submit general corporate contact message
   */
  async submitContactMessage(data) {
    const response = await fetch(`${API_BASE_URL}/contact/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to send message');
    }
    return response.json();
  },

  /**
   * Check backend health status
   */
  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return await response.json();
    } catch (err) {
      return { status: 'offline', error: err.message };
    }
  },
};
