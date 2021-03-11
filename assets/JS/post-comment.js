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
    
    
    try{
        var idData = data.nextElementSibling.nextElementSibling.nextElementSibling.id;
        console.log(data.nextElementSibling.nextElementSibling.nextElementSibling)
    }
    catch{
        var idData = data.nextElementSibling.nextElementSibling.id;
        console.log(data.nextElementSibling.nextElementSibling)
    }
    $('#' + idData).toggleClass("show");
  


})

