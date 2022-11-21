const methods = {
  // get random element from any given array
  get_random: (list) => {
    return list[Math.floor(Math.random() * list.length)];
  },
};

export default methods;
