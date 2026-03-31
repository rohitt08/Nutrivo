import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateAuthForm } from '../utils/validators';

const AuthPage = ({ mode = 'login' }) => {
  const isRegister = mode === 'register';
  const navigate = useNavigate();
  const { login, register, isAuthenticated, authReady } = useAuth();

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const title = useMemo(() => (isRegister ? 'Create account' : 'Welcome back'), [isRegister]);

  useEffect(() => {
    if (authReady && isAuthenticated) {
      navigate('/');
    }
  }, [authReady, isAuthenticated, navigate]);

  if (!authReady) {
    return (
      <section className="container section-space auth-page">
        <div className="auth-card">
          <h2>Checking session...</h2>
          <p>Please wait a moment.</p>
        </div>
      </section>
    );
  }

  const updateValue = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: '' }));
    }
    if (formError) {
      setFormError('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;
    const validationErrors = validateAuthForm(formValues, isRegister);
    setErrors(validationErrors);
    setFormError('');

    if (Object.keys(validationErrors).length) {
      return;
    }

    try {
      setSubmitting(true);
      if (isRegister) {
        await register({ name: formValues.name, email: formValues.email, password: formValues.password });
        navigate('/');
      } else {
        await login({ email: formValues.email, password: formValues.password });
        navigate('/');
      }
    } catch (error) {
      setFormError(error.message || 'Authentication failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="container section-space auth-page">
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <h2>{title}</h2>
        <p>Order healthy meals with a seamless premium experience.</p>

        {formError && <p className="status-note error">{formError}</p>}

        {isRegister && (
          <label>
            Full Name
            <input
              type="text"
              value={formValues.name}
              onChange={(event) => updateValue('name', event.target.value)}
              placeholder="Enter full name"
              disabled={submitting}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </label>
        )}

        <label>
          Email
          <input
            type="email"
            value={formValues.email}
            onChange={(event) => updateValue('email', event.target.value)}
            placeholder="you@example.com"
            disabled={submitting}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </label>

        <label>
          Password
          <input
            type="password"
            value={formValues.password}
            onChange={(event) => updateValue('password', event.target.value)}
            placeholder="At least 6 characters"
            disabled={submitting}
          />
          {errors.password && <span className="field-error">{errors.password}</span>}
        </label>

        {isRegister && (
          <label>
            Confirm Password
            <input
              type="password"
              value={formValues.confirmPassword}
              onChange={(event) => updateValue('confirmPassword', event.target.value)}
              placeholder="Re-enter password"
              disabled={submitting}
            />
            {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
          </label>
        )}

        <button type="submit" className="primary-btn" disabled={submitting}>
          {submitting ? 'Please wait...' : isRegister ? 'Create Account' : 'Login'}
        </button>

        <p className="switch-text">
          {isRegister ? 'Already have an account?' : 'New to Nutrivo?'}{' '}
          <Link to={isRegister ? '/login' : '/register'}>{isRegister ? 'Login' : 'Register'}</Link>
        </p>
      </form>
    </section>
  );
};

export default AuthPage;
