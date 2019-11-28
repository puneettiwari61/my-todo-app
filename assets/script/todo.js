// naming camelCase
// Better naming
// Function use actions like add, remove, set, get etc
// When to use function expression and declaration
// callback => arrow, expression
// remove unwanted listeners away from loop
// create a standalone function

(function () {
	const firstInput = document.querySelector('#firstinput');
	const ul = document.querySelector('.ul');
	const details = document.querySelector('.details');
	const itemsLefts = document.querySelector('#itemsleft');
	const active = document.querySelector('#active');
	const all = document.querySelector('#all');
	const completed = document.querySelector('#completed');
	const clearCompleted = document.querySelector('#clearcompleted');
	const fas = document.querySelector('.fas');
	function randomGen(str = 'qwertyuio') {
		return str.split('')
			.sort(() => Math.random() - 0.5)
			.join('') + '_' + Math.floor(Math.random() * 1000)
	};
	let switchCheck = false;
	let state = JSON.parse(localStorage.getItem('mytodo')) || [];

	function createUI(todos = []) {
		ul.innerHTML = "";
		todos.forEach(todo => {
			const li = document.createElement('li');
			li.classList.add('list-items');
			const check = document.createElement('input');
			check.setAttribute('type', 'checkbox');
			check.setAttribute('data-id', todo.id);
			check.classList.add('secondinput')
			check.checked = todo.completed
			const newp = document.createElement('p');
			newp.setAttribute('data-id', todo.id);
			newp.classList.add('paran');
			const editInput = document.createElement('input');
			editInput.classList.add('editinput');
			const spa = document.createElement('button');
			spa.setAttribute('data-id', todo.id);
			spa.classList.add('xman')
			spa.textContent = 'x';
			newp.textContent = todo.text;
			li.append(check, newp, spa);
			ul.append(li);
			spa.addEventListener('click', deleteTodo);
			completed.addEventListener('click', completeFun);
			active.addEventListener('click', activeFun);
			clearCompleted.addEventListener('click', clearCompletedFun);
			check.addEventListener('click', checkCount);
			all.addEventListener('click', allFun);
			fas.addEventListener('click', selectAll);
			function editIt(event) {
				spa.style.visibility = 'hidden';
				check.style.display = 'none';
				li.replaceChild(editinput, newp);
				editInput.focus();
				if (event.target.dataset.id == todo.id) {
					editInput.value = todo.text;
					editInput.addEventListener('keyup', event => {
						if (event.keyCode == 13) {
							todo.text = editInput.value;
							// newp.textContent = todo.text;
							createUI(state);
							localStorage.setItem('mytodo', JSON.stringify(state));
						}
					})
					editInput.addEventListener('blur', event => {
						todo.text = editInput.value;
						// newp.textContent = todo.text;
						createUI(state);
						localStorage.setItem('mytodo', JSON.stringify(state));
					})

				}
			}
			newp.addEventListener('dblclick', editIt);
		});
		itemsLeft();
	}

	function addtodo({ keyCode }) {
		if (keyCode == 13 && firstInput.value) {
			state.push({
				completed: false,
				text: firstInput.value,
				id: randomGen()
			})
			details.classList.add('details1');
			createUI(state);
			firstInput.value = "";
			localStorage.setItem('mytodo', JSON.stringify(state));
		}
	}

	function deleteTodo({ target }) {
		state = state.filter(todo => todo.id != target.dataset.id)
		createUI(state);
		localStorage.setItem('mytodo', JSON.stringify(state));
	}


	function checkCount(event) {
		state = state.map(todo => {
			if (todo.id == event.target.dataset.id) {
				todo.completed = !todo.completed
			}
			return todo
		})
		createUI(state);
		localStorage.setItem('mytodo', JSON.stringify(state));
	}


	function itemsLeft() {
		var lefts = state.filter(todo => todo.completed == false).length;
		if (lefts) {
			itemsLefts.parentElement.parentElement.classList.add('details1')
		}
		else if (state == []) {
			itemsLefts.parentElement.parentElement.classList.remove('details1');
		}
		return itemsLefts.innerText = lefts;
	}



	function activeFun() {
		var stateActive = state.filter(todo => todo.completed == false)
		createUI(stateActive);
	}

	function allFun() {
		createUI(state);
	}

	function completeFun() {
		const stateInactive = state.filter(todo => todo.completed == true)
		createUI(stateInactive);
		localStorage.setItem('mytodo', JSON.stringify(state));
	}

	function clearCompletedFun() {
		state = state.filter(todo => todo.completed == false)
		createUI(state);
		localStorage.setItem('mytodo', JSON.stringify(state));
	}

	function selectAll() {
		if (switchCheck) {
			state = state.map(todo => {
				todo.completed = false;
				return todo
			})
		} else {
			state = state.map(todo => {
				todo.completed = true;
				return todo
			})
		}
		switchCheck = !switchCheck;
		createUI(state);
		localStorage.setItem('mytodo', JSON.stringify(state));
	}
	console.log(state);
	firstInput.addEventListener('keyup', addtodo);
	createUI(state);
})();