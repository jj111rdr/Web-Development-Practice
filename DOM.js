/* DOM stands for Document Object Model
Use it to manipulate Content, Style and Structure of a webpage. 
DOM itself is a property of window object, which is a global
top level object representing a tab in the browser. This window
object has access to information as toolbar, height and width 
of window, prompts and alerts. DOM is inside the inner window*/

/* DOM is a tree structure, where each node is an object
 The document object is the root of the DOM tree
 The document object has properties and methods to access and 
 manipulate the DOM */

 // getElementById returns a single element or null if no matching element is found
var playground = document.getElementById("playground");
playground.append(' Wizard', ' ', 'Crystal Ball'); 

/* var playground = document.querySelector("div");
playground.append(' Wizard');
var playground = document.querySelector("#playground");
playground.append(' Wizard');*/

var scrollOfWisdom = document.createElement('p');
playground.append(scrollOfWisdom);
scrollOfWisdom.innerText = 'Ancient Wisdom lies within the scroll.';
console.log(scrollOfWisdom.innerText);
// inner text gets/sets the visible text content while textContent fetches all 
var magicaOrb = document.createElement('div');
magicaOrb.textContent = 'Magical Orb';
playground.append(magicaOrb);

var spellBook = document.createElement('div');
spellBook.innerHTML = '<h3 style="color: blueviolet;">Spell includes:</h3><p>Levitation</p> and <strong>Invisibility</strong>';
// innerHTML also replaces the original HTML
playground.append(spellBook);

var tempElement = document.createElement('p');
tempElement.textContent = 'This is a temporary element';
playground.append(tempElement);
//tempElement.remove(); // removes the element from the DOM
playground.removeChild(tempElement);

var fruitBasket = document.createElement('div');
fruitBasket.innerHTML = '<ul><li>Apple</li><li>Banana</li><li>Cherry</li></ul>';
playground.append(fruitBasket);

while(fruitBasket.firstChild) {
    fruitBasket.removeChild(fruitBasket.firstChild);
}
var magicWand = document.createElement('div');
magicWand.setAttribute('id', 'id-magicWand');
magicWand.setAttribute('class', 'class-magicWand');
magicWand.textContent = 'Magic Wand!!!'
playground.append(magicWand);

console.log(magicWand.getAttribute('id'));
console.log(magicWand.className);
magicWand.id ='new-id-magicWand';
console.log(magicWand.id);

var secretScroll = document.createElement('div');
secretScroll.id = 'id-secretScroll';
secretScroll.dataset.spell = 'Invisibility';
secretScroll.dataset.components = 'Feather, Ink, Paper';
secretScroll.textContent = 'Secret Scroll containing a spell';
playground.append(secretScroll);
console.log(secretScroll.dataset.spell);
console.log(secretScroll.dataset.components.split(', '));

var shapeShifter = document.createElement('div');
shapeShifter.textContent = 'Shape Shifter';
playground.append(shapeShifter);

shapeShifter.classList.add('weird', 'mysterious');
console.log("Initial Classes: ", shapeShifter.className);

shapeShifter.classList.remove('weird');
shapeShifter.classList.add('quirky');
// can also use toggle, use double toggle to remove that class
shapeShifter.classList.toggle('absurd');
shapeShifter.classList.toggle('absurd');
// classList is used for dynamic manipulation, its more secure than className
console.log("Updated Classes: ", shapeShifter.className);

var magicMirror = document.createElement('div');
magicMirror.textContent = 'Magic Mirror';
magicMirror.className = 'magic-mirror';
magicMirror.style.backgroundColor = 'lightblue';
magicMirror.style.border = '2px solid darkblue';
magicMirror.style.padding = '10px';
magicMirror.style.fontFamily = 'cursive';
magicMirror.style.fontSize = '20px';
playground.append(magicMirror);

var lineBreak = document.createElement('div');
lineBreak.id = 'break-line';
lineBreak.innerHTML = '<br>';
playground.append(lineBreak);

var magicButton = document.createElement('button');
magicButton.textContent = 'Reveal Secrets';
playground.append(magicButton);

var viewSecret = () => {
    alert('The secrets are hidden in plain sight!');
};
magicButton.addEventListener('click',viewSecret);
//magicButton.removeEventListener('click', viewSecret);

var magicItemList = document.createElement('ul');
playground.append(magicItemList);

function addRemoveMagicItem(itemName){
    var magicItem = document.createElement('li');
    magicItem.textContent = itemName;
    var removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove Item';
    removeBtn.addEventListener('click', () => magicItem.remove());
    magicItem.append(removeBtn);
    magicItemList.append(magicItem);
}
addRemoveMagicItem('Fireball    ');
addRemoveMagicItem('Snowfrost   ');

var fragment = document.createDocumentFragment();

for (var i = 0; i<5 ; i++){
    var magicalItem = document.createElement('li');
    magicalItem.textContent = `Magical Item # ${i+1}`;
    fragment.append(magicalItem);
}
var unorderedList = document.createElement('ul');
playground.append(unorderedList);
unorderedList.append(fragment);

