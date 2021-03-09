console.log('Checking for post reply')

// var btnComment = document.getElementById('comments')
var commentContent = document.getElementById('comment-container');

// commentContent.style.display = 'none'


$('.comments').click(function(event)
{
    // if(commentContent.style.display == 'none')
    // {
    //     commentContent.style.display = 'block';
    // }
    // else
    // {
    //     commentContent.style.display = 'none'
    // }
    console.log(event.target)
    var data = event.target;
    var idData = data.nextElementSibling.id;
    $('#' + idData).toggleClass("show");
  


})

