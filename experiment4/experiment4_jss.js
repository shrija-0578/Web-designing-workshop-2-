function calculateResult() {
    let n=document.getElementById("subject").value;
    let total=0;
    for(let i=1;i<=n;i++)
    {
        let mark=parseFloat(prompt("Enter marks for subject " + i));
        total+=mark;
    }
    let average=total/n;
    let grade;
    if(average>=90)
        grade='A';
    else if(average>=80)
        grade='B';
    else if(average>=70)    
        grade='C';
    else if(average>=60)
        grade='D';
    else
        grade='F';
    let result;
    if(average>=60)
        result="Pass";
    else
        result="Fail";
    document.getElementById("result").innerHTML 
    = "total marks: " + total + "<br> average marks:
     " + average + "<br> grade: " + grade + "<br> result:
      " + result;

}
