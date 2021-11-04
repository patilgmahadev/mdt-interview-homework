export const isAuthenticated = () => {
  let isAuthenticated = false;

  const token = localStorage.getItem("token");

  if ([undefined, null, ''].includes(token)) {
    isAuthenticated = false;
  } else {
    isAuthenticated = true;
  }

  return isAuthenticated;
};
