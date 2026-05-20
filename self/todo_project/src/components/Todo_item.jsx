function Todo_item() {
    let item="buy milk";
    let date="2024-06-30";
    return (
         <div class="container text-center ">
            <div class="row myrow"> 
            <div class="col-6">{item}</div>
            <div class="col-4">{date}</div>
            <div class="col-2"><button type="button" class="btn btn-danger mybtn">Delete</button> </div>
            </div>  
         </div>
    )
}
export default Todo_item;