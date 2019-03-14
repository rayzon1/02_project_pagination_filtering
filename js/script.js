const studentListChildren = document.querySelector('ul.student-list').children;
const page = document.querySelector('div.page');

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

const div = createEl('div', 'class', 'pagination');
const ul = createEl('div', 'class', 'pages');
div.appendChild(ul);
page.appendChild(div);

// Need to dynamically add links based on amount of people on the list.
// CreateLi function within the appendPageLinks function is to create elements used in the loop.
function appendPageLinks(num){
   for (let i = 1; i <= num; i ++){
      let li = createEl('li', 'class', 'link');
      let a = createEl('a', 'href', '#');
      a.textContent = i;
      li.appendChild(a);
      ul.appendChild(li);
   }
}

// This event listener is for the created ul of numbered pagination links
ul.addEventListener('click',  (e) => {
   showPage(studentListChildren, e.target.textContent);
});

let number = Math.ceil(studentListChildren.length / 10);
showPage(studentListChildren, 1);
appendPageLinks(number);
