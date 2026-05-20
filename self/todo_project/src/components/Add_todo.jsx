function Add_todo() {   
    return (
    <div class="container text-center myadd">
        <div class="row myrow">
            <div class="col-6">
            <input type="text" placeholder="Enter your task here"/>
            </div>
            <div class="col-4">
            <input type="date"/>
            </div>
            <div class="col-2">
            <button type="button" class="btn btn-info mybtn">Add</button>
            </div>
        </div>
    </div>
)
}
export default Add_todo;    