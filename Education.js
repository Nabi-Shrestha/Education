const form = document.getElementById('educationForm');
const tableBody = document.getElementById('educationTableBody');

let currentEditingRow = null;

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const level = document.getElementById('level').value.trim();
    const university = document.getElementById('university').value.trim();
    const address = document.getElementById('address').value.trim();
    const board = document.getElementById('board').value.trim();
    const gpa = document.getElementById('gpa').value.trim();
    const passedYear = document.getElementById('passedYear').value.trim();

    let errorMessage = '';
    if (!level) errorMessage += 'Please enter your level.\n';
    if (!university) errorMessage += 'Please enter your university.\n';
    if (!address) errorMessage += 'Please enter your address.\n';
    if (!board) errorMessage += 'Please enter your board.\n';
    if (!gpa || isNaN(gpa) || parseFloat(gpa) < 0 || parseFloat(gpa) > 4.0)
        errorMessage += 'Please enter a valid GPA (0.0 - 4.0).\n';
    if (!passedYear || isNaN(passedYear) || parseInt(passedYear) < 1900 || parseInt(passedYear) > 2024)
        errorMessage += 'Please enter a valid passed year.\n';

    if (errorMessage) {
        alert(errorMessage);
        return;
    }

    if (currentEditingRow) {
        updateRow(currentEditingRow, level, university, address, board, gpa, passedYear);
    } else {
        addRow(level, university, address, board, gpa, passedYear);
    }

    form.reset();
    currentEditingRow = null;
});

function addRow(level, university, address, board, gpa, passedYear) {
    const newRow = document.createElement('tr');

    const rowCount = tableBody.rows.length + 1;

    newRow.innerHTML = `
        <td>${rowCount}</td>
        <td>${level}</td>
        <td>${university}</td>
        <td>${address}</td>
        <td>${board}</td>
        <td>${gpa}</td>
        <td>${passedYear}</td>
        <td>
            <button class="edit-button">Edit</button>
            <button class="delete-button">Delete</button>
        </td>
    `;

    newRow.querySelector('.edit-button').addEventListener('click', () => editRow(newRow));
    newRow.querySelector('.delete-button').addEventListener('click', () => deleteRow(newRow));

    tableBody.appendChild(newRow);
}

function editRow(row) {
    document.getElementById('level').value = row.cells[1].textContent;
    document.getElementById('university').value = row.cells[2].textContent;
    document.getElementById('address').value = row.cells[3].textContent;
    document.getElementById('board').value = row.cells[4].textContent;
    document.getElementById('gpa').value = row.cells[5].textContent;
    document.getElementById('passedYear').value = row.cells[6].textContent;

    currentEditingRow = row;
}

function updateRow(row, level, university, address, board, gpa, passedYear) {
    row.cells[1].textContent = level;
    row.cells[2].textContent = university;
    row.cells[3].textContent = address;
    row.cells[4].textContent = board;
    row.cells[5].textContent = gpa;
    row.cells[6].textContent = passedYear;
}

function deleteRow(row) {
    row.remove();
    updateIDs();
}

function updateIDs() {
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach((row, index) => {
        row.cells[0].textContent = index + 1;
    });
}
