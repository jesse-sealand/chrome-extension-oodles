window.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, (tabs) => {

        var table = document.getElementById("rankTable");
        for (let i = 0; i < tabs.length; i++) {
    
            // Create new record for this table
            var row = table.insertRow(0);
    
            // Create new cells for this record
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
    
            // Add values for each cell
            cell1.innerHTML = `${tabs[i].url}`;
            cell2.innerHTML = `${tabs[i].id}`;
        };
    
      });


})