import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Interface for JWT payload (matches Symfony token)
interface JWTPayload {
  username: string;
  firstname?: string;
  lastname?: string;
  id?: number;
  roles: string[];
  exp: number;
  iat: number;
}

// User interface
interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  roles: string[];
}

// AuthContext interface
interface AuthContextType {
  user: User | null;                 
  token: string | null;                
  isLoading: boolean;
  isAuthenticated: boolean;                    
  login: (email: string, password: string) => Promise<boolean>;  
  logout: () => void;                              
}

// CREATE CONTEXT
const AuthContext = createContext<AuthContextType | undefined>(undefined);

function decodeToken(token: string): any {
  try {
    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload);
    return JSON.parse(payload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

// AUTH PROVIDER COMPONENT
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check auth status on app load
  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = localStorage.getItem('token');
      
      if (storedToken) {
        try {
          const decoded = jwtDecode<JWTPayload>(storedToken);
          const currentTime = Date.now() / 1000;

          if (decoded.exp < currentTime) {
            console.log("Token expired");
            localStorage.removeItem('token');
            localStorage.removeItem('cart'); // Clear cart on token expiry
          } else {
            setToken(storedToken);
            setUser({
              id: decoded.id || 0,
              email: decoded.username,
              firstname: decoded.firstname || '',
              lastname: decoded.lastname || '',
              roles: decoded.roles || []
            });
          }
        } catch (error) {
          console.error("Invalid token", error);
          localStorage.removeItem('token');
          localStorage.removeItem('cart');
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // FUNCTION: Login
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:8080/api/login_check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const newToken = data.token;
        
        localStorage.setItem('token', newToken);
        setToken(newToken);
        
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
        
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // FUNCTION: Logout - FIXED: Now clears cart too
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Remove cart from localStorage - FIX FOR CART BUG
    localStorage.removeItem('cart');
    
    // Clear state
    setToken(null);
    setUser(null);
    
    // Force page reload to reset all React state (cart, wishlist, etc.)
    window.location.href = '/home';
  };

  const isAuthenticated = !!token && !!user;

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