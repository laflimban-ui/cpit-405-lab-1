let ascending = true;

// Handle sort click events
function sort(elem) {
  let table = document.querySelector('table');
  let colIndex = elem.cellIndex;
  const rows = table.querySelectorAll('tr');
  let headerRow = document.querySelector('thead');
  let rowsArray = [];
  
  // Skip the header row
  for (let i = 1; i < rows.length; i++) {
    rowsArray.push(rows[i]);
  }

  // Sort the rows
  rowsArray.sort((a, b) => {
    let aVal = a.cells[colIndex].innerText;
    let bVal = b.cells[colIndex].innerText;

    if (!isNaN(aVal) && !isNaN(bVal)) {
      aVal = Number(aVal);
      bVal = Number(bVal);
    }

    if (aVal < bVal) {
      return ascending ? -1 : 1;
    }
    if (aVal > bVal) {
      return ascending ? 1 : -1;
    }
    return 0;
  });

  // Update the arrow icon
  if (ascending) {
    elem.children[0].className = "desc";
  } else {
    elem.children[0].className = "asc";
  }

  // Toggle the ascending variable
  ascending = !ascending;

  // Re-render table
  table.innerHTML = "";
  table.appendChild(headerRow);
  rowsArray.forEach(row => table.appendChild(row));
}

// Handle win score filtering (>= number)


// Reset filter

