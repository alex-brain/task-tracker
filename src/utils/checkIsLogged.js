export default () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  return userData !== null && userData.access_token;
};
