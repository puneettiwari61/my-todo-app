var ide  = 0;
// var state = [{
//     completed:false ,
//     text:"Learn Dom" ,
//     id: 1
// },
// {
//     completed:false ,
//     text:"Learn Css" ,
//     id: 2
// },
// {
//     completed:false ,
//     text:"Learn Js" ,
//     id: 3
// }]
var state = [];

var firstinput = document.querySelector('#firstinput');
var ul = document.querySelector('.ul');

function createUI(todos){
    var li = document.createElement('li');
    li.classList.add('list-items');
    // li.setAttribute('data-li',)
    var check = document.createElement('input');
    check.setAttribute('type', 'checkbox')
    check.classList.add('secondinput')
    var newp = document.createElement('p')
    var spa = document.createElement('button');
    spa.classList.add('xman')
    spa.textContent = 'x';
    newp.textContent = firstinput.value ;
    li.append(check, newp, spa);
     ul.append(li);
    firstinput.value ='';
    check.addEventListener('click',completed);

}
    
function addtodo(event){
    if(event.keyCode == 13 && firstinput.value){
        state.push({
            completed:false,
            text: firstinput.value,
            id:ide++
        })
        createUI(state);
       
    }
    
}

function completed(){
    state.forEach(obj => obj.completed ==false? true:false)
}


firstinput.addEventListener('keyup',addtodo);
// createUI(state);

