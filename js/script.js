/*
Description: This script dynamically splits the list to different pages as well as creates pagination links dynamically based
on number of items in the list. I have also added a search bar as well as a submit button.
Author: Gerardo Keys
Date: 03/15/19
*/ 

const studentListChildren = document.querySelector('ul.student-list').children;
const page = document.querySelector('div.page');
const pageHeader = document.querySelector('div.page-header');
const div = createEl('div', 'class', 'pagination');
const ul = createEl('ul', 'class', 'pages');


// This function creates the pages with a max of 10 items per list.
function showPage(list, page) {
   let end = page * 10;
   let start = end - 10;
   for (let i = 0; i < list.length; i ++){
     if(i >= start && i < end){
        list[i].style.display = '';
     } else {
        list[i].style.display = 'none';
     }
   }
}

// This function creates the element and sets the attribute to the arguments given.
function createEl(elem, attr, name) {
   let element = document.createElement(elem);
   element.setAttribute(attr, name);
   return element;
}

// Need to dynamically add links based on amount of people on the list.
// CreateLi function within the appendPageLinks function is to create elements used in the loop.
function appendPageLinks(num){
   for (let i = 1; i <= num; i ++){
      let li = createEl('li', 'class', 'link');
      let a = createEl('a', 'href', '#');
      a.setAttribute('class', 'active');
      a.textContent = i;
      li.appendChild(a);
      ul.appendChild(li);
      a.addEventListener('click',  (e) => {
         showPage(studentListChildren, e.target.textContent);
      });
   }
}

function inputSearch() {
   let divSearch = createEl('div', 'class', 'student-search');
   let input = createEl('input', 'placeholder', 'Search for students...');
   let button = createEl('button', 'class', 'button');
   pageHeader.appendChild(divSearch);
   divSearch.appendChild(input);
   divSearch.appendChild(button);
   button.textContent = 'Search';
   input.setAttribute('class', 'input');

}

// function showLinks(num){
//    const getLinks = document.querySelector('ul.pages');
//    getLinks.remove();
//    appendPageLinks(num);
// }



function getSearch() {
   const getInput = document.querySelector('input.input');
   const getButton = document.querySelector('button.button');
   const getNames = document.querySelectorAll('h3');
   const getLinks = document.querySelector('ul.pages');
   
   getButton.addEventListener('click', (e) => {
      let value = getInput.value;

      for(let i = 0; i < studentListChildren.length; i ++){
         if(value === getNames[i].textContent ){
            studentListChildren[i].style.display = '';
         } else if (value === '') {
            location.reload();
         } else {
            studentListChildren[i].style.display = 'none';
         }
      } 
      
      console.log(getLinks);
      getLinks.style.display = 'none';
      getInput.style.display = 'none';
      getButton.textContent = 'Show List';

      getButton.addEventListener('click', (e) => {
         location.reload();
      })
   });
   
}

// This event listener is for the created ul of numbered pagination links
function main(){
   let number = Math.ceil(studentListChildren.length / 10);
   div.appendChild(ul);
   page.appendChild(div);
   showPage(studentListChildren, 1);
   appendPageLinks(number);
   inputSearch();
   getSearch();
}

main();




