var firstinput = document.querySelector('#firstinput');
var ul = document.querySelector('.ul');
var details = document.querySelector('.details');
const itemslefts = document.querySelector('#itemsleft');
const active = document.querySelector('#active');
const all = document.querySelector('#all');
const completed = document.querySelector('#completed');
const clearcompleted = document.querySelector('#clearcompleted');
const fas = document.querySelector('.fas');
let id  = 0;
var switchcheck = false;

let state = JSON.parse(localStorage.getItem('mytodo')) || [];

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
        var newp = document.createElement('p');
        newp.setAttribute('data-id',todo.id);
        newp.classList.add('paran')
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
        active.addEventListener('click',activefun);
        all.addEventListener('click',allfun);
        completed.addEventListener('click',completefun);
        clearcompleted.addEventListener('click',clearcompletedfun);
        fas.addEventListener('click',selectall);
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
        localStorage.setItem('mytodo',JSON.stringify(state));
    }
    
}

function deletetodo(event){
    state = state.filter(todo => todo.id != event.target.dataset.id)
    createUI(state);
    localStorage.setItem('mytodo',JSON.stringify(state));
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
    localStorage.setItem('mytodo',JSON.stringify(state));
}


function itemsleft(){
    var lefts = state.filter(todo => todo.completed == false).length;
    // lefts?itemslefts.parentElement.parentElement.classList.add('details1'):itemslefts.parentElement.parentElement.classList.remove('details1');
    if(lefts){
        itemslefts.parentElement.parentElement.classList.add('details1')
    }
    else if (state == []){
        itemslefts.parentElement.parentElement.classList.remove('details1');
    }
    return itemslefts.innerText = lefts;
}



function activefun(){
    var state_active = state.filter(todo => todo.completed == false)
    createUI(state_active);
}



function allfun(){
    createUI(state);
}


function completefun(){
   var state_inactive = state.filter(todo => todo.completed == true)
    createUI(state_inactive);
    localStorage.setItem('mytodo',JSON.stringify(state));
}

function clearcompletedfun(){
   state = state.filter(todo => todo.completed == false)
    createUI(state);
    localStorage.setItem('mytodo',JSON.stringify(state));
}



function change(d){
    d.target.contentEditable = true;
    console.log(d);
    if (d.keyCode==13){
        state.map(todo => {
           if(todo.id == d.target.dataset.id){
               todo.text = newp.textContent;
           }
        }) 
    }
    // createUI(state);
}

function selectall(event){
    if (switchcheck == false){
    state = state.map(todo => {
        todo.completed = true;
        return todo
    })}
    if (switchcheck){
        state = state.map(todo => {
        todo.completed = false;
        return todo })
    }
    switchcheck = !switchcheck;
    createUI(state);
    localStorage.setItem('mytodo',JSON.stringify(state));
}