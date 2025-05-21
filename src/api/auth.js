// Mock user data for development
const MOCK_USER = {
  email: 'admin@example.com',
  password: 'admin123',
  name: 'Admin User'
};

export const login = async (email, password) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // For development, check against mock user
  if (email === MOCK_USER.email && password === MOCK_USER.password) {
    return {
      token: 'mock-jwt-token',
      user: {
        email: MOCK_USER.email,
        name: MOCK_USER.name
      }
    };
  }

  throw new Error('Invalid credentials');
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  if (!token || !user) {
    return null;
  }

  return JSON.parse(user);
}; 