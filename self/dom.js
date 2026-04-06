// console.log("hello world");
console.dir(document.head);
// console.dir(document.body);

// let txt=document.querySelector("h1");
// // console.log(txt);
// console.log(txt.getAttribute("class"))
// console.log(txt.style);
// // txt.style.color="red";

let div1=document.querySelector("#div1");
let el= document.createElement("button");
el.innerText="Click Me";
el.style.backgroundColor="blue";
el.style.color="white";
console.log(el);

div1.append(el); 