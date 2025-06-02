import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login, register } from '../services/authService';
import type { LoginFormValues, RegisterFormValues } from '../types/authTypes';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import EyeIcon from '../assets/icons/Eye.svg?react';
import EyeOffIcon from '../assets/icons/EyeOff.svg?react';

// Validation schemas
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Ogiltigt e-postformat')
    .required('E-post är obligatoriskt'),
  password: Yup.string()
    .required('Lösenord är obligatoriskt'),
});

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Namnet måste vara minst 2 tecken')
    .required('Fullständigt namn är obligatoriskt'),
  email: Yup.string()
    .email('Ogiltigt e-postformat')
    .required('E-post är obligatoriskt'),
  password: Yup.string()
    .min(6, 'Lösenordet måste vara minst 6 tecken')
    .required('Lösenord är obligatoriskt'),
});

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login: loginContext } = useAuth();
  const navigate = useNavigate();

  // Handle login submission
  const handleLogin = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    setError('');

    try {
      const data = await login(values);
      loginContext(data.user, data.token);
      navigate('/');
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err && err.response && typeof err.response === 'object' && 'data' in err.response && err.response.data && typeof err.response.data === 'object' && 'message' in err.response.data) {
        setError((err.response.data as { message?: string }).message || 'Login failed. Please try again.');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle registration submission
  const handleRegister = async (values: RegisterFormValues) => {
    setIsSubmitting(true);
    setError('');

    try {
      const data = await register(values);
      loginContext(data.user, data.token);
      navigate('/');
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err && err.response && typeof err.response === 'object' && 'data' in err.response && err.response.data && typeof err.response.data === 'object' && 'message' in err.response.data) {
        setError((err.response.data as { message?: string }).message || 'Registration failed. Please try again.');
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-top bg-marianblue p-8">
      <div className="w-full max-w-md bg-white rounded-md shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {isRegistering ? 'Bli medlem' : 'Logga in'}
        </h1>

        {error && (
          <div className="mb-4 p-3 text-red-700 text-sm">
            {isRegistering
              ? error.replace('Registration failed. Please try again.', 'Registrering misslyckades. Försök igen.')
              : error.replace('Login failed. Please try again.', 'Inloggning misslyckades. Försök igen.')}
          </div>
        )}

        {isRegistering ? (
          // Registration Form
          <Formik
            initialValues={{ name: '', email: '', password: '' }}
            validationSchema={RegisterSchema}
            onSubmit={handleRegister}
          >
            {() => (
              <Form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Fullständigt namn
                  </label>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Anna Andersson"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-mahogany text-sm mt-1"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-post
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="din@email.se"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-mahogany text-sm mt-1"
                  />
                </div>

                <div className="relative">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Lösenord
                  </label>
                  <Field
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    className="absolute right-3 top-2/3 -translate-y-2/3 text-marianblue text-lg focus:outline-none cursor-pointer"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Dölj lösenord' : 'Visa lösenord'}
                  >
                    {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-mahogany text-sm mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  className={`w-full py-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={isSubmitting}
                >
                  {isRegistering
                    ? (isSubmitting ? 'Skapar konto...' : 'Skapa konto')
                    : (isSubmitting ? 'Loggar in...' : 'Logga in')}
                </Button>
              </Form>
            )}
          </Formik>
        ) : (
          // Login Form
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {() => (
              <Form className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-post
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="din@email.se"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-mahogany text-sm mt-1"
                  />
                </div>

                <div className="relative">
                  <div className="flex justify-between mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Lösenord
                    </label>
                    <a href="#" className="text-sm font-medium text-marianblue hover:text-mahogany">
                      Glömt lösenord?
                    </a>
                  </div>
                  <Field
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    className="absolute right-3 top-2/3 -translate-y-2/3 text-marianblue text-lg focus:outline-none cursor-pointer"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Dölj lösenord' : 'Visa lösenord'}
                  >
                    {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-mahogany text-sm mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  className={`w-full py-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={isSubmitting}
                >
                  {isRegistering
                    ? (isSubmitting ? 'Skapar konto...' : 'Skapa konto')
                    : (isSubmitting ? 'Loggar in...' : 'Logga in')}
                </Button>
              </Form>
            )}
          </Formik>
        )}

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isRegistering ? 'Har du redan ett konto?' : 'Har du inget konto?'}
          </p>
          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError('');
            }}
            className="mt-2 text-marianblue font-medium hover:text-mahogany transition-colors cursor-pointer"
          >
            {isRegistering ? 'Logga in' : 'Skapa konto'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
