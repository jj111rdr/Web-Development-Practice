function findSmallest(arrayOfNum)
{
    let smallest = arrayOfNum[0];
    for (let i = 1; i < arrayOfNum.length; i++)
    {
        if (arrayOfNum[i] < smallest)
        {
            smallest = arrayOfNum[i];
        }
    }
    return smallest;
}
let sumOfNumbers = (variable) => {
    let sum = 0;
    for (let i = 1; i <= variable; i++) {
        sum += i;
    }
    return sum;
};
let print = () => {
    console.log("Hello World");
}
let removeChars = (str) =>{
    return str.substring(1, str.length - 1);
}

let doubleArrayElements = (array) => {
    let doubledArray = [];
    doubledArray = array.map((element) => element * 2);
    return doubledArray;
}


print();
let array = [2,-5,6,0,3,-1];
let smallestNumber = findSmallest(array);
console.log("The smallest number in the array is: " + smallestNumber);
console.log("The string after removing the first and last character is: " + 
    removeChars("This is a test string"));
console.log("The array with doubled elements is: " + doubleArrayElements(array));

console.log("The sum of numbers from 0 to 10 is: " + sumOfNumbers(10));