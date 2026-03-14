console.log("This is an external JavaScript file.");
let name = "tony";
// can be name="tony"
let age = 25;
let price = 99.99;
console.log("Name: " + name);
console.log("Age: " + age);
console.log("Salary: " + price);
x=null;
console.log("Value of x: " + x);
y=undefined;
console.log("Value of y: " + y);
isfollowing = true; 
console.log("Is following: " + isfollowing);
// amazon product an object
let product = {
    name: "ball pen",
    ratting: 4.5,
    offer:20,
    deal:true,
    price: 270,
};
console.log(product);
// console.log("Product Name: " + product.name);
// console.log("Product Price: " + product.price); 
// console.log(product.name);
//loop
str = "hello";
for(let i of str)
{
    console.log(i);
}
for(let key in product)
{
    console.log(key + ": " + product[key]);//product[key] is used instead of product["key"]
}
//string interpolation
console.log(`the cost of ${product.name} is ${product.price} `);
let str2="hello_world"  ;
str2=str2.toUpperCase();
console.log(str2);
console.log(str2.slice(5));
str2.concat("3>");
console.log(str2.concat("3>"));
//ques
            // let nam;
            // nam=prompt("enter your name");
            // console.log("@" + nam + (nam.length));  
//array
let arr=[1,2,3,4,5];
console.log(arr);
arr.push("hello",34);
console.log(arr);
let poppedElement = arr.pop();
console.log("Popped element: " + poppedElement);
console.log(arr);
// console.log(arr.toString); 

//function
function greet(name)
{
    console.log("hello " + name);
}   
greet("tony");

function sum(a,b){
    return a+b;
}
console.log(sum(2,3));
//arrow function
const arrow_sum = (a,b) =>{ return a+b;};
console.log(arrow_sum(5,6));
//for each loop by arrow function
arr=[1,2,3,4,5];
arr.forEach((val)=>{console.log(val*val);});
//map function
let squaredArr = arr.map((val) => val * val);
console.log(squaredArr);
//filter function
let evenArr = arr.filter((val) => val % 2 === 0);
console.log(evenArr);
// reduce function
let sumOfArr = arr.reduce((acc, val) => acc + val, 0);
console.log(sumOfArr);

