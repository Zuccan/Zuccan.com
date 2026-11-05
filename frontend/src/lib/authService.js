export const authService = {
  getCurrentUser() {
    if (typeof localStorage === 'undefined') return null;
    const raw = localStorage.getItem('zuccano_user');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },
};

export default authService;

