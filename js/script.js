/*
Description: This script dynamically splits the list into different pages as well as creates pagination links dynamically based
on number of items in the list. I have also added a search bar as well as a submit button that will display the name of the 
person searched for if they are on the list. If they are not on the list the page will reload. If no text is entered the page 
will also reload.
Author: Gerardo Keys
Date: 03/15/19
*/

const studentListChildren = document.querySelector("ul.student-list").children;
const page = document.querySelector("div.page");
const pageHeader = document.querySelector("div.page-header");
const div = createEl("div", "class", "pagination");
const ul = createEl("ul", "class", "pages");

// This function creates the pages with a max of 10 items per list.
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

// This function creates the element and sets the attribute to the arguments given.
function createEl(elem, attr, name) {
  let element = document.createElement(elem);
  element.setAttribute(attr, name);
  return element;
}

// Need to dynamically add links based on amount of people on the list.
// CreateLi function within the appendPageLinks function is to create elements used in the loop.
function appendPageLinks(num) {
  for (let i = 1; i <= num; i++) {
    let li = createEl("li", "class", "link");
    let a = createEl("a", "href", "#");
    a.setAttribute("class", "active");
    a.textContent = i;
    li.appendChild(a);
    ul.appendChild(li);
    a.addEventListener("click", e => {
      showPage(studentListChildren, e.target.textContent);
    });
  }
}

// This function creates the search elements and then appends them to the page.
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

// This function will display the list item search results to the page while hiding all other list items.
function getSearch() {
  const getInput = document.querySelector("input.input");
  const getButton = document.querySelector("button.button");
  const getNames = document.querySelectorAll("h3");
  const getLinks = document.querySelector("ul.pages");

  getButton.addEventListener("click", () => {
    let value = getInput.value;

    for (let i = 0; i < studentListChildren.length; i++) {
      if (value === getNames[i].textContent) {
        studentListChildren[i].style.display = "";
      } else if (value === "") {
        location.reload();
      } else {
        studentListChildren[i].style.display = "none";
      }
    }

    getLinks.style.display = "none";
    getInput.style.display = "none";
    getButton.textContent = "Show List";

    getButton.addEventListener("click", () => {
      location.reload();
    });
  });
}

// Main function will be called first.
function main() {
  let number = Math.ceil(studentListChildren.length / 10);
  div.appendChild(ul);
  page.appendChild(div);
  showPage(studentListChildren, 1);
  appendPageLinks(number);
  inputSearch();
  getSearch();
}

main();
