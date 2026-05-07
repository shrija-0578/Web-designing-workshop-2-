let employees = [];
function addEmployee() {
    let name = document.getElementById("name").value;
    let empid = document.getElementById("empid").value;
    let empsal = document.getElementById("empsal").value;
    let department = document.getElementById("department").value;

    if(name === "" || empid === "" || empsal === "" || department === "") {
        alert("Please fill in all fields.");
        return;
    }
    let employee = {
        name: name,
        empid: empid,
        empsal: empsal,
        department: department 
    };
    employees.push(employee);
    alert("emplyee added successfully!");
    document.getElementById("name").value = "";
    document.getElementById("empid").value = "";
    document.getElementById("empsal").value = "";
    document.getElementById("department").value = "";
}
function displayEmployees() {
    let output = "<h3>All Employees</h3>";

    employees.forEach(emp => {
        output += `
            Name: ${emp.name} |
            ID: ${emp.empid} |
            Salary: ₹${emp.empsal} |
            Dept: ${emp.department} <br>
        `;
    });
    document.getElementById("output").innerHTML = output;
}
function totalSalary() {
    let total = employees.reduce((sum, emp) => sum + parseInt(emp.empsal), 0);

    document.getElementById("output").innerHTML = 
        "<h3>Total Salary Payout: ₹" + total + "</h3>";
}

function averageSalary() {
    if (employees.length === 0) {
        document.getElementById("output").innerHTML = 
            "<h3>No employee records available</h3>";
        return;
    }

    let total = employees.reduce((sum, emp) => sum + parseInt(emp.empsal), 0);
    let avg = total / employees.length;

    document.getElementById("output").innerHTML = 
        "<h3>Average Salary: ₹" + avg.toFixed(2) + "</h3>";
}

function countDepartment() {
    let deptName = prompt("Enter Department Name:");
    let count = employees.filter(emp => emp.department === deptName).length;

    document.getElementById("output").innerHTML = 
        "<h3>Employees in " + deptName + ": " + count + "</h3>";
}