// let originalString: string = 'Hello';
// let reversedString: string = '';

// for (let i = originalString.length - 1; i >= 0; i--) {
//   reversedString += originalString[i];
// }

// console.log(`Original: ${originalString}`);
// console.log(`Reversed: ${reversedString}`);


// const numbers: number[] = [12, 45, 3, 67, 22, 89, 5];
// let max = numbers[0]; // Assume first number is the largest

// for (let i = 1; i < numbers.length; i++) {
//   if (numbers[i] > max) {
//     max = numbers[i];
//   }
// }

// console.log(`Largest number: ${max}`);


const input = "ABCDEFG";
const result = input.split('').join(',');

console.log(result); // Output: A,B,C,D,E,F,G
