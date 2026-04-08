
let heading=document.querySelector("h1");
let paragraph=document.querySelector("p");
let input=document.querySelector("#inputfield");
let fontsize=24;

// Change heading text (onclick using addEventListener)
document.getElementById("changeheading").addEventListener("click", 
    function () {
    if (input.value !== "") {
        heading.innerHTML = input.value;
    }
    }
);
// Change background color
document.getElementById("background").onclick = 
function () {
    const randomHex = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`;
    document.body.style.backgroundColor = randomHex();
       
};

// increase font size
document.getElementById("infsize").addEventListener("click", 
    function () {
    fontsize += 2;
    paragraph.style.fontSize = fontsize + "px";
    });
// decrease font size
document.getElementById("defsize").addEventListener("click", 
    function () {
    fontsize -= 2;
    paragraph.style.fontSize = fontsize + "px";
    });


//toggleParagraph 
document.getElementById("toggleParagraph").addEventListener("click",
    function(){
        if(paragraph.style.display === "none") {
            paragraph.style.display = "block";
        } 
        else{
            paragraph.style.display = "none";
        } 
    });

    //reset
    document.getElementById("reset").addEventListener("click",
    function(){
        heading.innerHTML="welcome to JavaScript lab";
        paragraph.style.fontSize = "24px";
        paragraph.style.display = "block";
        document.body.style.backgroundColor ="white";
        input.value="";
        fontsize=24;
    });