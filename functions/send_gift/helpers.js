exports.setGift = (role) => {
  switch (role.toLowerCase()) {
    case 'admin':
      return 'House';
    case 'user':
      return 'Car';
    default:
      return 'Pizza';
  }
};
