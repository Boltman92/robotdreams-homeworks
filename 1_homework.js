const { argv } = require('node:process');

const recursivelyAdd = (array) => {
  let newSum = 0;
  const recurse = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (!Array.isArray(arr[i])) {
        newSum = newSum + arr[i];
      } else {
        recurse(arr[i]);
      }
    }
  };

  recurse(array, newSum);

  return newSum;
};

const inputArray = argv.slice(2)[0]

try {
    let array = JSON.parse(inputArray);
    const result = recursivelyAdd(array);
    console.log(`sum of your array is ${result}`);
  } catch (e) {
    console.log("sorry, your input does not fit to requirements");
  }