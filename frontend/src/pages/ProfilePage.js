import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();
  const [formValues, setFormValues] = useState({
    name: user?.name || user?.userName || '',
    email: user?.email || '',
  });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);



  const updateValue = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: '' }));
    }
    if (successMsg) {
      setSuccessMsg('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};

    if (!formValues.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formValues.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    try {
      setSubmitting(true);
      // TODO: Call API to update profile
      // For now, just show success message
      setSuccessMsg('Profile updated successfully! (Feature coming soon)');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      setErrors({ form: error.message || 'Failed to update profile' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="container section-space">
      <div className="checkout-form auth-card profile-card">
        <h2>✏️ Edit Profile</h2>
        <p>Update your personal information below.</p>

        {successMsg && <p className="status-note">{successMsg}</p>}
        {errors.form && <p className="status-note error">{errors.form}</p>}

        <form onSubmit={handleSubmit} noValidate>
          <label>
            Full Name
            <input
              type="text"
              value={formValues.name}
              onChange={(event) => updateValue('name', event.target.value)}
              placeholder="Enter your full name"
              disabled={submitting}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </label>

          <label>
            Email Address
            <input
              type="email"
              value={formValues.email}
              onChange={(event) => updateValue('email', event.target.value)}
              placeholder="your email"
              disabled={submitting}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </label>

          <button type="submit" className="primary-btn" disabled={submitting}>
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
        </form>

        <p className="profile-note">
          Password changes and dangerous actions can be managed separately.
        </p>
      </div>
    </section>
  );
};

export default ProfilePage;
