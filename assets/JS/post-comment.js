console.log('Checking for post reply')

var btnComment = document.getElementById('comments')
var commentContent = document.getElementById('comment-container');

commentContent.style.display = 'none'


btnComment.addEventListener('click',function()
{
    if(commentContent.style.display == 'none')
    {
        commentContent.style.display = 'block';
    }
    else
    {
        commentContent.style.display = 'none'
    }
})
