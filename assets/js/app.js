const inputFrom  = document.querySelector('.input-list');
const inputField = document.querySelector('.input-list input');
const listBtn    = document.querySelector('.input-list .add-list-btn');
const collection = document.querySelector('.list-box .collection');
const colItem    = document.querySelector('.collection .collection-item');
const listLink   = document.querySelector('.collection-item .list-link');
const pendText   = document.querySelector('.clear-box span');
const clearBtn   = document.querySelector('.clear-btn');
const filter     = document.querySelector('.filter');
let countNum   = document.querySelector('.count-list');

callBackFunctions();

function callBackFunctions(thisEvent){
    document.addEventListener('DOMContentLoaded', getFromStorage);
    inputFrom.addEventListener('submit', addList);
    collection.addEventListener('click', deleteList);
    clearBtn.addEventListener('click', clearList);
    filter.addEventListener('keyup', searchList);

}
// get from session storage
function getFromStorage(thisEvent) {
    let data;
    if (sessionStorage.getItem('data') === null) {
        data = [];
    } else {
        data = JSON.parse(sessionStorage.getItem('data'));
        data.forEach(function (getArray){
            //create new list
            const li = document.createElement('li');
            li.className = 'collection-items';
            li.textContent = getArray;
            const delLink = document.createElement('a');
            delLink.className = 'list-link';
            delLink.innerHTML = '<i class="fas fa-trash"></i>';
            li.appendChild(delLink);
            collection.appendChild(li);
            countList();
        });
    }

}
// count list
function countList() {
    let data;
    if (sessionStorage.getItem('data') === null) {
        data = [];
    } else {
        data = JSON.parse(sessionStorage.getItem('data'));
        let numb = data.length;
        countNum.textContent = `You have ${numb} pending task`;       
    }
}

function addList(thisEvent){
    if (inputField.value === '') {
        alert('Please add a list first');
    } else {
        //create new list
        const li = document.createElement('li');
        li.className = 'collection-items';
        li.textContent = inputField.value;
        const delLink = document.createElement('a');
        delLink.className = 'list-link';
        delLink.innerHTML = '<i class="fas fa-trash"></i>';
        li.appendChild(delLink);
        collection.appendChild(li);
        addDataToSession(inputField.value);
        countList();
        inputField.value = '';
        thisEvent.preventDefault();
    }     
}
// add data to Session Storage
function addDataToSession(val) {
    let data;
    if (sessionStorage.getItem('data') === null) {
        data = [];
    } else {
        data = JSON.parse(sessionStorage.getItem('data'));
    }
    data.push(val);
    sessionStorage.setItem('data', JSON.stringify(data));
}

// delete list function
function deleteList(thisEvent){
    if (thisEvent.target.parentElement.classList.contains('list-link')) {
        thisEvent.target.parentElement.parentElement.remove();
        deleteFromStorage(thisEvent.target.parentElement.parentElement);
        countList();
    } else if (thisEvent.target.classList.contains('list-link')) {
        thisEvent.target.parentElement.remove();
        deleteFromStorage(thisEvent.target.parentElement);
        countList();
    }
}

// delete form session storage
function deleteFromStorage(delData) {
    let data;
    if (sessionStorage.getItem('data') === null) {
        data = [];
    } else {
        data = JSON.parse(sessionStorage.getItem('data'));
        data.forEach(function (getArray){
            if (delData.textContent === getArray) {
                data.splice(getArray, 1);
            }
        });
        sessionStorage.setItem('data', JSON.stringify(data));
    }
}
// clear all lists
function clearList(thisEvent){
    while(collection.firstChild){
        collection.removeChild(collection.firstChild);
        clearFromSession();
        countList();
    }
}
// clear from session storage
function clearFromSession() {
    sessionStorage.clear();
}

// filter list
function searchList(thisEvent){
    const text = thisEvent.target.value.toLowerCase();
    document.querySelectorAll('.collection-items').forEach(
        function(item){
            const newText = item.firstChild.textContent;
            if (newText.toLowerCase().indexOf(text) != -1) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
    );
}