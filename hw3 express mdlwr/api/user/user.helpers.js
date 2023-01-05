module.exports = {
  // eslint-disable-next-line no-useless-escape
  isEmailValid: (email) => RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).test(email)
};
