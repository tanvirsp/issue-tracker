

//Collect Data
const form = document.getElementById('form');
form.addEventListener('submit', function(e){
    e.preventDefault();

    const formData =  {};

    [...this.elements].forEach(el =>{
        if(el.type !== 'submit'){
            formData[el.name] = el.value;
        }
    })
    
    const id =Math.round( Math.random() * 10000000 + 9999);
    formData.id = id;
    formData.status = "open";

    addToArray(formData);
    loadData();
})



let allData = [];

function addToArray(arr){
    allData.push(arr);
    //localStorage
    localStorage.setItem('data', JSON.stringify(allData));
    form.reset();
}


function loadData(){
    const data = JSON.parse(localStorage.getItem('data'));
    if(data.length > 0){
        allData = data;
        displayData( allData); 
    } else if(data.length == 0) {
        const container = document.getElementById('dataInfo');
        container.innerHTML = '';
        allData = [];
    
    }
}

loadData()


function displayData(arr){
    
    const container = document.getElementById('dataInfo');
    let text = '';
    for(const data of arr){
        const {description, priority, assignTo, id, status} = data;
        text += `<div class="container">
                    <div>
                        <p class="issue-id">Issue ID: ${id}</p>
                        <div class="tag">${status}</div>
                        <h3 id="description">${description}</h3>
                        <div>
                            <i class="fa-solid fa-stopwatch"></i>
                            <span id="priority">${priority}</span>
                        </div>
                        <div>
                            <i class="fa-solid fa-user"></i>
                            <span id="assignTo">${assignTo}</span>
                        </div>
                        <div>
                            <button id="close" onclick="closeItem(${id})">Close</button>
                            <button id="delete" onclick="deleteItem(${id})">Delete</button>
                        </div>
                    </div>
                </div>
                `
    }
    container.innerHTML = text;
}



function deleteItem(id){
    const items =JSON.parse(localStorage.getItem('data'));
    const remain= items.filter(item => item.id !== id );
    localStorage.setItem('data', JSON.stringify(remain));
    loadData();
}

function closeItem(id){

    const items =JSON.parse(localStorage.getItem('data'));
    const findItem = items.find(item => item.id == id);
    findItem.description = `<del>${findItem.description}</del>`
    findItem.status="close";
    localStorage.setItem('data', JSON.stringify(items))
    loadData();
  
}






