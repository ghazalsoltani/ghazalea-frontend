import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RegisterPage() {
  // Form fields state
  // Each input field has its own state variable
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // UI state for errors and loading
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get login function to auto-login after registration
  const { login } = useAuth();
  
  // Navigation hook for redirecting after success
  const navigate = useNavigate();

  // Form validation function
  // Returns error message string or null if valid
  const validateForm = (): string | null => {
    // Check all fields are filled
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      return 'Veuillez remplir tous les champs';
    }
    
    // Validate email format using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Veuillez entrer une adresse email valide';
    }
    
    // Check password length
    if (password.length < 6) {
      return 'Le mot de passe doit contenir au moins 6 caractères';
    }
    
    // Check passwords match
    if (password !== confirmPassword) {
      return 'Les mots de passe ne correspondent pas';
    }
    
    return null; // No errors
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    // Prevent default form behavior (page reload)
    e.preventDefault();
    
    // Clear any previous errors
    setError(null);
    
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Send registration request to Symfony API
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          firstname,
          lastname,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Registration successful
        console.log('Registration successful:', data);
        
        // Auto-login the user after registration
        const loginSuccess = await login(email, password);
        
        if (loginSuccess) {
          // Redirect to home page
          navigate('/');
        } else {
          // If auto-login fails, redirect to login page
          navigate('/login');
        }
      } else {
        // Registration failed - show error from server
        setError(data.error || 'Une erreur est survenue lors de l\'inscription');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Impossible de contacter le serveur. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo / Title */}
        <Link to="/" className="flex justify-center">
          <h1 className="text-2xl font-bold text-gray-900">
            🛍️ Ghazaléa
          </h1>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Créer un compte
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Déjà inscrit ?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-500">
            Se connecter
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-md rounded-lg sm:px-10">
          {/* Error message display */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Registration form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name fields - side by side on larger screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Firstname field */}
              <div>
                <label 
                  htmlFor="firstname" 
                  className="block text-sm font-medium text-gray-700"
                >
                  Prénom
                </label>
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  required
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Jean"
                />
              </div>

              {/* Lastname field */}
              <div>
                <label 
                  htmlFor="lastname" 
                  className="block text-sm font-medium text-gray-700"
                >
                  Nom
                </label>
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  required
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Dupont"
                />
              </div>
            </div>

            {/* Email field */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700"
              >
                Adresse email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="vous@exemple.com"
              />
            </div>

            {/* Password field */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700"
              >
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
              />
              <p className="mt-1 text-xs text-gray-500">
                Minimum 6 caractères
              </p>
            </div>

            {/* Confirm password field */}
            <div>
              <label 
                htmlFor="confirmPassword" 
                className="block text-sm font-medium text-gray-700"
              >
                Confirmer le mot de passe
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                  ${isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  }`}
              >
                {isSubmitting ? 'Inscription en cours...' : 'S\'inscrire'}
              </button>
            </div>
          </form>

          {/* Terms notice */}
          <p className="mt-6 text-xs text-center text-gray-500">
            En vous inscrivant, vous acceptez nos{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              conditions d'utilisation
            </a>{' '}
            et notre{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              politique de confidentialité
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;