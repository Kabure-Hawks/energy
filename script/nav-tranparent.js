$(window).scroll(function(){
    $('nav').toggleClass('scrolled', $(this).scrollTop() >200 )
  });
  $(window).scroll(function(){
    $(document.getElementsByClassName("dropdown-content")).toggleClass('scrolled', $(this).scrollTop() >200 )
  });