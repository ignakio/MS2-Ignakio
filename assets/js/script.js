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

//LOCAL STORAGE
// Function to store items data locally
function saveItem(action, itenName){
    // Compare two strings for packed items
    if (action.localeCompare('packed') ===0){
        var currentSavedItemsPacked = localStorage.getItem('packed');
        if (currentSavedItemsPacked=== null){
            const itemsPacked = [itenName];
            /* Storing Objects in HTML5 localStorage original line of code with modification for project from: https://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage */
            localStorage.setItem('packed',JSON.stringify(itemsPacked));
        }
        else{
            /* Return data and convert text into a JavaScript object original line of code with modification for project from: https://stackoverflow.com/questions/35273539/json-parse-from-localstorage-issue */
            var currentPackedItems = JSON.parse(localStorage.getItem('packed'));
            // add item to list
            currentPackedItems.push(itenName);
            localStorage.setItem('packed',JSON.stringify(currentPackedItems));
        }
    }
    // Compare two strings for to buy items
    if (action.localeCompare('bought') ===0){
        var currentSavedItemsBought = localStorage.getItem('bought');
        if (currentSavedItemsBought=== null){
            const itemsBought = [itenName];
            localStorage.setItem('bought',JSON.stringify(itemsBought));
        }
        else{
            var currentBoughtItems = JSON.parse(localStorage.getItem('bought'));
            // add item to list
            currentBoughtItems.push(itenName);
            localStorage.setItem('bought',JSON.stringify(currentBoughtItems));
        }
    }
}
// To remove items from lists once checked in storage
function removeItem(action, item){
    // To retrieve it from the store and convert
    var currentPackedItems = JSON.parse(localStorage.getItem('packed')) || [];
    var currentBoughtItems = JSON.parse(localStorage.getItem('bought')) || [];
    // To check if item on list
    if (action.localeCompare('bought') ===0){
        // To find item
        const elementIndex = currentBoughtItems.indexOf(item);
        console.log("trying to find element", item, elementIndex);
        if (elementIndex > -1){
            // To remove element
            currentBoughtItems.splice(elementIndex, 1);
            /* Put the object into storage orginal line of code with modifications for project from https://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage */
            localStorage.setItem('bought',JSON.stringify(currentBoughtItems));
        }
    }
    if (action.localeCompare('packed') ===0){
        // To find item
        const elementIndex = currentSavedItemsPacked.indexOf(item);
        if (elementIndex > -1){
            // To remove element
            currentSavedItemsPacked.splice(elementIndex, 1);
            localStorage.setItem('packed',JSON.stringify(currentSavedItemsPacked));
        }
    }
}