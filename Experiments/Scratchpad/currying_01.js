function add(a) {
  return function (b) {
    return a + b;
  };
}

console.log(add(2)(5)); // 7