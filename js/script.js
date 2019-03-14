const studentListChildren = document.querySelector('ul.student-list').children;
const page = document.querySelector('div.page');

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

function createLi(elem, attr, name) {
   let element = document.createElement(elem);
   element.setAttribute(attr, name);
   return element;
}

const div = createLi('div', 'class', 'pagination');
const ul = createLi('div', 'class', 'pages');
div.appendChild(ul);
page.appendChild(div);
console.log(div);

// Need to dynamically add links based on amount of people on the list.
// CreateLi function within the appendPageLinks function is to create elements used in the loop.
function appendPageLinks(num){
   for (let i = 1; i <= num; i ++){
      let li = createLi('li', 'class', `${i}`);
      let a = createLi('a', 'href', '#');
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
