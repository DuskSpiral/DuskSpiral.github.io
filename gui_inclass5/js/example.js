// ADD NEW ITEM TO END OF LIST
// create a new list item
var newListItemEnd = document.createElement('li');
var newInnerListItemEnd = document.createTextNode('cream');
newListItemEnd.appendChild(newInnerListItemEnd);

// add element to end of list
document.getElementsByTagName('ul')[0].appendChild(newListItemEnd);

// ADD NEW ITEM START OF LIST
// create a new list item
var newListItemStart = document.createElement('li');
var newInnerListItemStart = document.createTextNode('kale');
newListItemStart.appendChild(newInnerListItemStart);

// get the element we want to place it before + then inserr before
var listElements = document.getElementsByTagName('li');
listElements[0].parentNode.insertBefore(newListItemStart, listElements[0]);
 
// ADD A CLASS OF COOL TO ALL LIST ITEMS
// get list items
listElements = document.getElementsByTagName('li');
// add attribute class="cool" to all
for (let i = 0; i < listElements.length; i++)
{
	listElements[i].setAttribute('class', 'cool');
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
// create a new span based off number of list elements
var newSpan = document.createElement('span');
var newInnerSpan = document.createTextNode(listElements.length);
newSpan.appendChild(newInnerSpan);

// append to h2 tag
var headerElement = document.getElementsByTagName('h2');
headerElement[0].appendChild(newSpan);
