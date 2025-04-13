window.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, (tabs) => {

        var table = document.getElementById("rankTable");

        // Create table header
        var header = table.createTHead();
        var row = header.insertRow(0);

        var headerCols = ["Url","Tab ID"];

        for (let i = 0; i < headerCols.length; i++) {

            //var cell = row.insertCell(i);
            //cell.innerHTML = `${headerCols[i]}`;

            let th = document.createElement("th");
            let text = document.createTextNode(`${headerCols[i]}`);
            th.appendChild(text);
            row.appendChild(th);

        };

        // Create table records
        for (let i = 0; i < tabs.length; i++) {
    
            // Create new record for this table
            var row = table.insertRow(1);
    
            // Create new cells for this record
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
    
            // Add values for each cell
            cell1.innerHTML = `${tabs[i].url}`;
            cell2.innerHTML = `${tabs[i].id}`;
        };
    
      });


})