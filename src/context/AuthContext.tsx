import { createContext, useContext, useState, useEffect, ReactNode } from 'react';


// User interface - represents the logged-in user's data
interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  roles: string[];
}

// AuthContext interface - all data and functions available
interface AuthContextType {
  user: User | null;                 
  token: string | null;                
  isLoading: boolean;                   
  login: (email: string, password: string) => Promise<boolean>;  
  logout: () => void;                   
  isAuthenticated: boolean;             
}

// CREATE CONTEXT

const AuthContext = createContext<AuthContextType | undefined>(undefined);


function decodeToken(token: string): any {
  try {
    // Split token by '.' and get the middle part (payload)
    const base64Payload = token.split('.')[1];
    
    // Decode from base64
    const payload = atob(base64Payload);
    
    // Parse JSON string to object
    return JSON.parse(payload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

// Check if token is expired
function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;
  
  // exp is in seconds, Date.now() is in milliseconds
  const expirationTime = decoded.exp * 1000;
  return Date.now() > expirationTime;
}

// AUTH PROVIDER COMPONENT

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // State for user data
  const [user, setUser] = useState<User | null>(null);
  
  // State for JWT token
  const [token, setToken] = useState<string | null>(null);
  
  // State for loading (checking auth on app start)
  const [isLoading, setIsLoading] = useState(true);

  // EFFECT: Check for existing token on app start
  useEffect(() => {
    const initializeAuth = async () => {
      // Check if token exists in localStorage
      const storedToken = localStorage.getItem('token');
      
      if (storedToken) {
        // Check if token is still valid (not expired)
        if (!isTokenExpired(storedToken)) {
          setToken(storedToken);
          
          // Fetch user data from API
          await fetchUserData(storedToken);
        } else {
          // Token expired, clean up
          localStorage.removeItem('token');
        }
      }
      
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // FUNCTION: Fetch user data from API
  const fetchUserData = async (authToken: string) => {
    try {
      const response = await fetch('http://localhost:8080/api/me', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // Token invalid, clean up
        logout();
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // For now, decode user info from token itself
      const decoded = decodeToken(authToken);
      if (decoded) {
        setUser({
          id: decoded.id || 0,
          email: decoded.username || '',
          firstname: decoded.firstname || 'User',
          lastname: decoded.lastname || '',
          roles: decoded.roles || [],
        });
      }
    }
  };

  // FUNCTION: Login
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Send credentials to Symfony JWT endpoint
      const response = await fetch('http://localhost:8080/api/login_check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,    // Symfony expects 'username' not 'email'
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const newToken = data.token;
        
        // Store token in localStorage
        localStorage.setItem('token', newToken);
        setToken(newToken);
        
        // Decode and set user data
        const decoded = decodeToken(newToken);
        if (decoded) {
          setUser({
            id: decoded.id || 0,
            email: decoded.username || email,
            firstname: decoded.firstname || 'User',
            lastname: decoded.lastname || '',
            roles: decoded.roles || [],
          });
        }
        
        return true;  // Login successful
      } else {
        return false;  // Login failed
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // FUNCTION: Logout
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Clear state
    setToken(null);
    setUser(null);
  };

  // COMPUTED: Is user authenticated?
  const isAuthenticated = !!token && !!user;

  // RENDER: Provide context to children
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// CUSTOM HOOK: useAuth

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}