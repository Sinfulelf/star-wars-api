export function validateEmail(email) {
  if (email) {
    const val = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.exec(email);
    if (val && val.length) {
      return true;
    }
  }
  return false;
}

export function validatePassword(password) {
  return (
    password && password.length && password.length > 5 && password.length < 25
  );
}

export function validateForm(email, password) {
  return validateEmail(email) && validatePassword(password);
}
