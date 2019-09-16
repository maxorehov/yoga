// let btn = document.getElementsByTagName('button'),
//     wrap = document.querySelector('.wrapper');

// btn[0].addEventListener('click', function(event) {
//     console.log("Произошло событие" + event.type + " на элементе " + event.target);
// });

// wrap.addEventListener('click', function(event) {
//     console.log("Произошло событие" + event.type + " на элементе " + event.target);
// })

let timerID = setTimeout(timeout, 3000);
clearTimeout(timerID)
function timeout() {
    alert('Hello');
}