export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const validateAuthForm = ({ name, email, password, confirmPassword }, isRegister) => {
  const errors = {};

  if (isRegister && !name.trim()) {
    errors.name = 'Full name is required.';
  }

  if (!email.trim()) {
    errors.email = 'Email is required.';
  } else if (!isValidEmail(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!password) {
    errors.password = 'Password is required.';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  if (isRegister && confirmPassword !== password) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
};

export const validateCheckoutForm = (values) => {
  const errors = {};

  if (!values.fullName.trim()) errors.fullName = 'Full name is required.';
  if (!values.email.trim()) errors.email = 'Email is required.';
  if (!values.address.trim()) errors.address = 'Address is required.';
  if (!values.city.trim()) errors.city = 'City is required.';
  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!/^\d{10}$/.test(values.phone.trim())) {
    errors.phone = 'Enter a valid 10-digit number.';
  }

  return errors;
};
