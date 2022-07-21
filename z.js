var stars = document.querySelectorAll('.star-icon');
                  
document.addEventListener('click', function(e){
  var classStar = e.target.classList;
  if(!classStar.contains('ativo')){
    stars.forEach(function(star){
      star.classList.remove('ativo');
    });
    classStar.add('ativo');
    console.log(e.target.getAttribute('data-avaliacao'));
  }
});

const button = document.querySelector('#like');
const number = document.querySelector('#number');

button.addEventListener('click', () => {
  let likeValue = document.querySelector('#number').textContent;
  let newValue = Number(likeValue) + 1;
  button.classList.add('like');
  number.innerHTML = newValue;
});