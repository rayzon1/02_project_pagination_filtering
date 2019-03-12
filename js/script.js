/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

const studentListChildren = document.querySelector('ul.student-list').children;
const body = document.querySelector('body');
const studentList = document.querySelector('ul.student-list');
const page = document.querySelector('div.page');



/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

function showPage(list, page) {
   let end = page * 10;
   let start = end - 10;
   for (let i = 0; i < list.length; i ++){
     if(i >= start && i <= end){
        list[i].style.display = '';
     } else {
        list[i].style.display = 'none';
     }
   }
}
showPage(studentListChildren, 1);
/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

const div = document.createElement('div');
const ul = document.createElement('ul')

function appendPageLinks(num){
   
   for (let i = 1; i <= num; i ++){
      let li = document.createElement('li');
      let a = document.createElement('a');
      ul.setAttribute('class', 'pages')
      a.setAttribute('href', '#');
      a.textContent = i;
      li.setAttribute('class', `${i}`)
      li.appendChild(a);
      ul.appendChild(li);
   }
   div.className = 'pagination';
   div.appendChild(ul);
   page.appendChild(div);
   console.log(div);
   
}

// This event listener is for the created ul of numbered pagination links
ul.addEventListener('click',  (e) => {

   function buttonClick(num) {
      let ulPages = document.querySelector('ul.pages').children;
      let liClick = ulPages[num];
      return liClick;
   }

   const pages = document.querySelector('ul.pages').children;
  
   for (let i = 0; i <= pages.length; i ++){
      console.log(i);
   }
   if(e.target === pages){
      console.log('hello');
      showPage(studentListChildren, 1);
   } else if (e.target === buttonClick(1)){
      showPage(studentListChildren, 2);
   }

   
   console.log(pages);
});

appendPageLinks(6);





// Remember to delete the comments that came with this file, and replace them with your own code comments.