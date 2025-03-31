// Mock users for development/testing
export const TEST_USERS = [
  {
    id: "1",
    name: "Test User",
    email: "test@example.com",
    password: "password123", // In a real app, never store plain text passwords
    role: "user",
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
  },
];

// Simple function to validate credentials in development
export function validateCredentials(email: string, password: string) {
  const user = TEST_USERS.find((user) => user.email === email);
  if (!user || user.password !== password) {
    return null;
  }

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
