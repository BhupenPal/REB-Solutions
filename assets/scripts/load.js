$(document).ready(function(){
   $('.search-data-row').slice(0,8).show()
   $('body').on('click touchstart' , '#load' , (e)=> {
       e.preventDefault()
       $('.search-data-row:hidden').slice(0,6).slideDown()
        if($('.search-data-row:hidden').length == 0 ){
            $('#load').css('visibility' , 'hidden')
        }
    

   })

})