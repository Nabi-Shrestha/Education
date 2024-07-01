
document.getElementById('educationForm').addEventListener('submit', function(event) {
    event.preventDefault(); 


    var level = document.getElementById('level').value.trim();
    var university = document.getElementById('university').value.trim();
    var address = document.getElementById('address').value.trim();
    var board = document.getElementById('board').value.trim();
    var gpa = document.getElementById('gpa').value.trim();
    var passedYear = document.getElementById('passedYear').value.trim();

  
    var errorMessage = '';
    if (!level) {
        errorMessage += 'Please enter your level.\n';
    }
    if (!university) {
        errorMessage += 'Please enter your university.\n';
    }
    if (!address) {
        errorMessage += 'Please enter your address.\n';
    }
    if (!board) {
        errorMessage += 'Please enter your board.\n';
    }
    if (!gpa) {
        errorMessage += 'Please enter your GPA.\n';
    }
    if (!passedYear) {
        errorMessage += 'Please enter your passed year.\n';
    }

    if (errorMessage) {
        alert(errorMessage);
    } else {
        
        if (currentEditingRow === null) {
            addRow(level, university, address, board, gpa, passedYear);
        } else {
            updateRow(currentEditingRow, level, university, address, board, gpa, passedYear);
        }

       
        document.getElementById('educationForm').reset();

        alert('Form submitted successfully!');
    }
});


var currentEditingRow = null;

function addRow(level, university, address, board, gpa, passedYear) {
    var table = document.querySelector('table tbody');
    var newRow = table.insertRow();

    var cellID = newRow.insertCell(0);
    var cellLevel = newRow.insertCell(1);
    var cellUniversity = newRow.insertCell(2);
    var cellAddress = newRow.insertCell(3);
    var cellBoard = newRow.insertCell(4);
    var cellGPA = newRow.insertCell(5);
    var cellPassedYear = newRow.insertCell(6);
    var cellAction = newRow.insertCell(7);

    var rowCount = table.rows.length;
    cellID.innerHTML = rowCount; 
    cellLevel.innerHTML = level;
    cellUniversity.innerHTML = university;
    cellAddress.innerHTML = address;
    cellBoard.innerHTML = board;
    cellGPA.innerHTML = gpa;
    cellPassedYear.innerHTML = passedYear;

    var editButton = document.createElement('button');
    editButton.innerHTML = 'Edit';
    editButton.className = 'edit-button';
    editButton.onclick = function() {
        editRow(newRow);
    };

    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = function() {
        deleteRow(newRow);
    };

    cellAction.appendChild(editButton);
    cellAction.appendChild(deleteButton);
}

function updateRow(row, level, university, address, board, gpa, passedYear) {
    row.cells[1].innerHTML = level;
    row.cells[2].innerHTML = university;
    row.cells[3].innerHTML = address;
    row.cells[4].innerHTML = board;
    row.cells[5].innerHTML = gpa;
    row.cells[6].innerHTML = passedYear;

  
    currentEditingRow = null;
}

function editRow(row) {
   
    document.getElementById('level').value = row.cells[1].innerHTML;
    document.getElementById('university').value = row.cells[2].innerHTML;
    document.getElementById('address').value = row.cells[3].innerHTML;
    document.getElementById('board').value = row.cells[4].innerHTML;
    document.getElementById('gpa').value = row.cells[5].innerHTML;
    document.getElementById('passedYear').value = row.cells[6].innerHTML;

    
    currentEditingRow = row;
}

function deleteRow(row) {
    row.remove();
}
