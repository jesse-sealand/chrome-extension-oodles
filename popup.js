window.addEventListener('DOMContentLoaded', () => {

    chrome.tabs.query({
        windowId: chrome.windows.WINDOW_ID_CURRENT
    }, (tabs) => {

        var table = document.getElementById("rankTable");
        var header = document.getElementById("tableHead");

        // Create records for table head
        var row = header.insertRow(0);

        var headerCols = ["Url", "Tab ID"];

        for (let i = 0; i < headerCols.length; i++) {

            let th = document.createElement("th");
            let text = document.createTextNode(`${headerCols[i]}`);
            th.appendChild(text);
            row.appendChild(th);

            th.addEventListener("click", function() {
                sortTable(i);
            });
        };

        var body = document.getElementById("tableBody");

        // Create records for table body
        for (let i = 0; i < tabs.length; i++) {

            // Create new record for this table
            var row = body.insertRow(0);

            // Create new cells for this record
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            // Add values for each cell
            cell1.innerHTML = `${tabs[i].url}`;
            cell2.innerHTML = `${tabs[i].id}`;
        };

    });

    function sortTable(columnIndex) {

        var table = document.getElementById("rankTable");
        var rows = Array.prototype.slice.call(table.querySelectorAll("tbody > tr"));

        rows.sort(function(rowA, rowB) {
            var cellA = rowA.cells[columnIndex].textContent;
            var cellB = rowB.cells[columnIndex].textContent;

            // Handle numerical values
            if (!isNaN(cellA) && !isNaN(cellB)) {
                return cellA - cellB;
            }

            // Default to string comparison
            return cellA.localeCompare(cellB);
        });

        rows.forEach(function(row) {
            table.querySelector("tbody").appendChild(row);
        });
    };

})