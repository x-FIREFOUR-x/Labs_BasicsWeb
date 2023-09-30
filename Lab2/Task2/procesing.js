const tableWidth = 6;
const tableHeight = 6;
const numberVariant = 6;


function CreateTable() {
    let content = "<table>";
    for (let i = 0; i < tableHeight; i++) {
        content += "<tr>"
        for (let j = 0; j < tableWidth; j++) {
            content += "<td id='td-" + i + "-" + j + "'>" + (i * tableWidth + j + 1) + "</td>"
        }
        content += "</tr>"
    }
    content += "</table>"
    document.body.innerHTML += content;
}

function SetRandomColor(cell){
	let randomColor = Math.floor(Math.random()*16777215);
	this.style.background = '#'+(randomColor.toString(16));
}

function SetSelectedColor(cell){
	let color = document.getElementById('color-selecter').value;
	this.style.background = color;
}

function SetRectangleColor(cell, numberCell){
	let color = document.getElementById('color-selecter').value;
    const y = Math.floor((numberCell - 1) / tableHeight);
    const x = (numberCell - 1) % tableWidth;

	for (let i = y; i < tableHeight; i++){
		for (let j = x; j < tableWidth; j++){
			document.getElementById(`td-${i}-${j}`).style.background = color;
		}
	}
}

function SetEventHandlers(cellIndex){
	if (cellIndex < 0 || cellIndex >= tableHeight * tableWidth){
		throw (new RangeError("Out of tables range"))
	}

	let targetCell = document.getElementById(`td-${Math.floor(cellIndex / tableWidth)}-${cellIndex % tableWidth}`);
	targetCell.onmouseover = SetRandomColor;
	targetCell.onclick = SetSelectedColor;
	targetCell.ondblclick = ()=> SetRectangleColor(targetCell, numberVariant);
}


CreateTable();
SetEventHandlers(numberVariant - 1);