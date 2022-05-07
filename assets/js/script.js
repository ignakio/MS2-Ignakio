// CHECKLIST STORAGE FEATURE
// Creates an array from items in To Pack list
let toPackList = Array.prototype.slice.call(document.querySelectorAll('#optionsHolder li.list-group-item'));

// Function to get stored items
function loadInitialData(){
    console.log("loaded", toPackList);
    /*Get session object for items in already packed & to buy lists and parse 
    Add "[]" so that error is not returned if no data stored*/ 
    var currentPackedItems = JSON.parse(localStorage.getItem('packed')) || [];
    var currentBoughtItems = JSON.parse(localStorage.getItem('bought')) || [];

    toPackList.forEach(function (element){
        // To remove words from list otherwise won't be able to compare data later
        const elementText = element.innerText.replace('option', '').replace('Buy', '').replace('Check', '').replace('BUY', '').replace('CHECK', '').replace(/\s+/g,' ').trim();
        if (currentPackedItems.includes(elementText)){
            element.classList.add('hideItem');
            var targetList = document.getElementById('packedItems');
            // Create new item if selected 
            var newItem = ' <li class="list-group-item"> ' + elementText + ' </li>';
            // Where new item should be created
            var currentPackedList = targetList.innerHTML;
            targetList.innerHTML = currentPackedList + newItem;
        }
        if (currentBoughtItems.includes(elementText)){
            element.classList.add('hideItem');
            let targetList = document.getElementById('toBuyItems');
            // Create new item if selected 
            newBuyItem = ' <li class="list-group-item">  <div role="group" aria-label="Checklist Buttons"> <button type="button" onClick="markPacked(event);" class="btn btn-check checkItem" data-itemname="' + elementText + '">Check</button> </div> ' + elementText + '</li>';
            // Where new item should be created
            var currentBuyList = targetList.innerHTML;
            targetList.innerHTML = currentBuyList + newBuyItem;
        }
    });
}
// To check if document has loaded the JavaScript
if (document.readyState === "complete" || document.readyState === "interactive") {
    document.addEventListener("DOMContentLoaded", loadInitialData);
} else {
    document.addEventListener("DOMContentLoaded", loadInitialData);
}