var firstinput = document.querySelector('#firstinput');
var ul = document.querySelector('.ul');
var details = document.querySelector('.details');
const itemslefts = document.querySelector('#itemsleft');

let id  = 0;

let state = [];

function createUI(todos){
    ul.innerHTML = "";
    todos.forEach(todo => {
        var li = document.createElement('li');
        li.classList.add('list-items');
        var check = document.createElement('input');
        check.setAttribute('type', 'checkbox');
        check.setAttribute('data-id',todo.id);
        check.classList.add('secondinput')
        check.checked = todo.completed
        var newp = document.createElement('p')
        var spa = document.createElement('button');
        spa.setAttribute('data-id',todo.id);
        spa.classList.add('xman')
        spa.textContent = 'x';
        newp.textContent = todo.text;
        li.append(check, newp, spa);
        ul.append(li);
        spa.addEventListener('click',deletetodo);
        check.addEventListener('click',checkcount);
        newp.addEventListener('click',change);
    });
    itemsleft();
}

function addtodo(event){
    if(event.keyCode==13 && firstinput.value){
        state.push({
            completed: false,
            text: firstinput.value,
            id: id++
        })
        details.classList.add('details1');
        createUI(state);
        firstinput.value ="";
    }
    
}

function deletetodo(event){
    state = state.filter(todo => todo.id != event.target.dataset.id)
    createUI(state);
}

firstinput.addEventListener('keyup', addtodo);
createUI(state);

function checkcount(event){
    state = state.map(todo => {
        if(todo.id == event.target.dataset.id){
            todo.completed = !todo.completed
        }
        return todo 
    })
    createUI(state);
}


function itemsleft(){
    var lefts = state.filter(todo => todo.completed == false).length;
    // lefts?itemslefts.parentElement.parentElement.classList.add('details1'):itemslefts.parentElement.parentElement.classList.remove('details1');
    if(lefts){
        itemslefts.parentElement.parentElement.classList.add('details1')
    }
    else {
        itemslefts.parentElement.parentElement.classList.remove('details1');
    }
    return itemslefts.innerText = lefts;
}

function change(d){
    event.target.contentEditable = true;

}