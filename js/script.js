/*
Description: This script dynamically splits the list into different pages as well as creates pagination links based
on number of items in the list. I have also added a search bar as well as a submit button that will display the name of the 
person searched for. If they are not on the list the page will show an error message. If no input is typed, the page will 
reload. 
Author: Gerardo Keys
Date: 03/15/19
*/

const studentListChildren = document.querySelector("ul.student-list").children;
const page = document.querySelector("div.page");
const pageHeader = document.querySelector("div.page-header");
const getLinks = document.querySelector("ul.pages");
const studentlist = document.querySelector("ul.student-list");

// The showPage function creates the pages with a max of 10 items shown per page.
function showPage(list, page) {
  let end = page * 10;
  let start = end - 10;
  for (let i = 0; i < list.length; i++) {
    if (i >= start && i < end) {
      list[i].style.display = "";
    } else {
      list[i].style.display = "none";
    }
  }
}

// The createEl function takes in 3 arguments which creates an element based on the element and attribute inputed.
function createEl(elem, attr, name) {
  let element = document.createElement(elem);
  element.setAttribute(attr, name);
  return element;
}

// The appendPageLinks function creates the pagination links and appends them to the page. This function takes in
// a list as an argument.
function appendPageLinks(list) {
  const div = createEl("div", "class", "pagination");
  const ul = createEl("ul", "class", "pages");
  const getDiv = document.querySelector("div.pagination");
  const number = Math.ceil(list.length / 10);
  const linkSelector = document.getElementsByTagName("a");
  if (page.lastElementChild === getDiv) {
    getDiv.remove();
  }
  if (page.lastElementChild !== getDiv) {
    for (let i = 1; i <= number; i++) {
      let li = createEl("li", "class", "link");
      let a = createEl("a", "href", "#");
      a.textContent = i;
      li.appendChild(a);
      ul.appendChild(li);
      
      a.addEventListener("click", e => {
        showPage(list, e.target.textContent);
        const link = e.target
        for (let i = 0; i <= linkSelector.length; i ++){
            if (link){
               link.setAttribute('class', 'active');
            }
            linkSelector[i].removeAttribute('class');
        }
      });
    }
    
    div.appendChild(ul);
    page.appendChild(div);
    linkSelector[0].setAttribute('class', 'active');
  }
}

// The inputSearch function creates the input and search buttons which are then appended to the page.
function inputSearch() {
  let divSearch = createEl("div", "class", "student-search");
  let input = createEl("input", "placeholder", "Search for students...");
  let button = createEl("button", "class", "button");
  pageHeader.appendChild(divSearch);
  divSearch.appendChild(input);
  divSearch.appendChild(button);
  button.textContent = "Search";
  input.setAttribute("class", "input");
}

// The getSearch function adds an event listener for the Search button. This will filter the list
// based on the search results from the user input.
function getSearch() {
  const getInput = document.querySelector("input.input");
  const getButton = document.querySelector("button.button");
  const getNames = document.querySelectorAll("h3");
  const divHeader = document.querySelector("div.pagination");

  getButton.addEventListener("click", e => {
    let value = getInput.value.toLowerCase();
    let match = []; // array for matched names
    let notMatch = []; // array for unmatched names

    for (let i = 0; i < studentListChildren.length; i++) {
      if (getNames[i].textContent.includes(value)) {
        match.push(studentListChildren[i]);
        appendPageLinks(match);
        showPage(match, 1);
      } else {
        studentListChildren[i].style.display = "none";
        notMatch.push(getNames[i].textContent);
      }
    }
    if (value === "") {
      location.reload();
    }
    if (match.length == 0) {
      studentlist.innerHTML = `No results found. Please click Show List to try again.`;
      divHeader.remove();
    }
    getInput.style.display = "none";
    getButton.textContent = "Show List";

    getButton.addEventListener("click", () => {
      location.reload();
    });
  });
}

// Main function will be called first.

function main() {
  showPage(studentListChildren, 1);
  appendPageLinks(studentListChildren);
  inputSearch();
  getSearch();
}

main();
