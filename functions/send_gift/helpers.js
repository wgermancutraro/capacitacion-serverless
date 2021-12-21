exports.setGift = (role) => {
  switch (role.toLowerCase()) {
    case 'admin':
      return 'Mac OS';
    case 'user':
      return 'ChromeBook';
    default:
      return 'Pizza';
  }
};
