var wrapper = document.querySelectorAll('.wrapperr');
var btn = document.querySelector('.load');

var current = 4;
btn.addEventListener('click', function(){
   for(var i = current; i< current + 2; i++){
    if(wrapper[i]){
        wrapper[i].style.display = 'block';
    }
   }

   current += 2; 
   
})