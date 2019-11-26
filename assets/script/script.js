const firstinput = document.querySelector('#firstinput');
const ul = document.querySelector('.ul');
var details = document.querySelector('.details');
const itemsleft = document.querySelectorAll('#itemsleft');
function putdown(event){
    if(event.keyCode == 13){
        ul.innerHTML = ul.innerHTML + ` <li class="list-items">
        <input type="checkbox" id="secondinput">
        <p>${firstinput.value}</p>
        <span id ='xman'>x</span>
    </li>`
    firstinput.value = '';
    }
}

function putdown1 (event){
    var li = document.createElement('li');
    li.classList.add('list-items');
    var check = document.createElement('input');
    check.setAttribute('type', 'checkbox')
    check.classList.add('secondinput')
    var newp = document.createElement('p')
    var spa = document.createElement('span');
    spa.classList.add('xman')
    spa.textContent = 'x';
    if(event.keyCode == 13){
        newp.textContent = firstinput.value ;
        li.append(check, newp, spa);
        ul.append(li);
        firstinput.value = "";
    }
}


function putdown2 (event){
    var li = document.createElement('li');
    li.classList.add('list-items');
    var check = document.createElement('input');
    check.setAttribute('type', 'checkbox')
    check.classList.add('secondinput')
    var newp = document.createElement('p')
    var spa = document.createElement('button');
    spa.classList.add('xman')
    spa.textContent = 'x';
    if(event.keyCode == 13){
        if(firstinput.value){
        details.classList.add('details1');
        newp.textContent = firstinput.value ;
        li.append(check, newp, spa);
        ul.append(li);
        firstinput.value = "";
        function itemcount(){
            check.checked==false?p=p+1:p;
            itemsleft[0].innerText = p;
        }
        itemcount();
        function uncheck(e){
            e.checked?Number(temsleft[0].innerText)-1:'';
        }
            check.addEventListener('click',uncheck);
        // details.classList.toggle('details1')
        }
    } 
    spa.addEventListener('click',deleteit);


}


firstinput.addEventListener('keyup',putdown2);

function deleteit(event){
    event.target.parentElement.remove()
    // li.remove();
    // console.log(event);
}


// spa.addEventListener('click',deleteit);

var p = 0;
var l = document.getElementsByClassName('secondinput');

