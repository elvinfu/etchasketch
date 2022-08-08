const gridSize = 32;

const size = 500/gridSize - 2;
const margin = 1;

const grid = document.querySelector('.grid');
const clearButton = document.getElementById('clearButton');

let selectedColor = 'red';
let mousedown = false;

document.querySelector('body').addEventListener('mouseup', cancelAction);

const areaHeight = document.querySelector('.area').offsetHeight;
console.log(areaHeight);

grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
grid.addEventListener('mousedown', cancelAction);
grid.addEventListener('mouseup', cancelAction);
grid.addEventListener('dragstart', (e) => {e.preventDefault()});
grid.addEventListener('drop', (e) => {e.preventDefault()});
grid.style.width = '30vw';
grid.style.height = '30vw';

for(i = 0; i < gridSize * gridSize; i++){
        const square = document.createElement('div');
        square.classList.add('square');
        square.setAttribute('colored', false);
        square.setAttribute('ogColor', 'white');
        square.addEventListener('mouseover', updateGrid);
        square.addEventListener('mousedown', updateGrid);
        square.addEventListener('mouseout', updateGrid);
        square.addEventListener('mouseup', updateGrid);
        square.addEventListener('dragstart', (e) => {e.preventDefault()});
        square.addEventListener('drop', (e) => {e.preventDefault()});
        square.style.width = grid.style.width / 50;
        square.style.backgroundColor = 'white';

        grid.appendChild(square);
}

addToPalette('red');
addToPalette('darkorange');
addToPalette('orange');
addToPalette('gold');
addToPalette('yellow');
addToPalette('greenyellow');
addToPalette('skyblue');
addToPalette('dodgerblue');
addToPalette('blue');
addToPalette('indigo');
addToPalette('indianred');
addToPalette('violet');

function addToPalette(col){
    const color = document.createElement('div');
    color.classList.add('color');
    color.style.flex = '1 0 0';
    //color.style.width = document.documentElement.clientWidth / 50 + 'px';
    //color.style.height = document.documentElement.clientWidth / 50 + 'px';
    color.style.backgroundColor = col;
    color.addEventListener('mousedown', changeColor);
    document.querySelector('.palette').appendChild(color);
}


clearButton.addEventListener('mousedown', clearGrid);

function cancelAction(e){
    if(e.type == 'mousedown'){
        mousedown = true;
    }
    if(e.type == 'mouseup'){
        mousedown = false;
    }
}

function changeColor(e){
    selectedColor = e.target.style.backgroundColor;
}

function updateGrid(e){
    if(e.type == 'mouseover'){
        e.target.setAttribute('ogColor', e.target.style.backgroundColor);
        e.target.style.backgroundColor = selectedColor;
    }
    if(e.type == 'mouseup'){
        if(mousedown){
            e.target.setAttribute('ogColor', selectedColor);
        }
    }
    if(e.type == 'mouseout'){
        if(mousedown){
            e.target.style.backgroundColor = selectedColor;
            e.target.setAttribute('ogColor', selectedColor);
        } else {
            e.target.style.backgroundColor = e.target.getAttribute('ogColor');
        }
    }
}

function clearGrid(e){
    mousedown = false;
    const squares = document.getElementsByClassName('square');
    for(const square of [...squares]){
        square.style.backgroundColor = 'white';
        square.setAttribute('colored', false);
    }
}

function eraserButtonClick(e){
    selectedColor = 'white';
}