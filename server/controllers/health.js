const getHealth = (req, res) => {
  res.json({ status: 'OK' });
};

const getHome = (req, res) => {
  res.json({ message: 'Welcome to Tiny Tours API'});
};

export { getHealth, getHome };