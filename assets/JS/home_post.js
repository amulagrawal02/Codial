
{

    let createPost = function () {
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    let newPost = AddNewPost(data.data,data.data.post, data.data.UserDetails);
                    console.log(data.data.time)

                    $(`#post-list-container`).prepend(newPost);
                    new Noty({
                        theme: 'relax',
                        type: 'success',
                        layout: 'topRight',
                        text: "Post Uploaded!",
                        timeout: 1000
                    }).show();
                    deletePost(' .delete-post-btn', newPost);
                    console.log($(` .delete-post-btn`, newPost).prop('href'));
                },
                error: function (error) {
                    console.log(error.responseText)
                }
            })
        })
    }

    let AddNewPost = function (data,post, UserDetails) {
        return $(`<div class = "post-container" id = "post-container-${post._id}">
       
        <div class="post-name">
             <i class="fas fa-user-circle small-margin"></i>
             <class="small-margin">
                 ${UserDetails.name}
         </div>
     
         <div class="post-time medium-margin">
         <small><i class="far fa-clock"></i>
         ${data.time}
        </small>
               
             </small>
         </div>
     
         <div class="post-content medium-margin">
             ${post.content}
     
         </div>
         <a href="#"><i class="far fa-thumbs-up" id="like"></i></a>
         <i class=" comments far fa-comments"></i>
         <a href="#"><i class="fas fa-share" id="share"></i></a>
         
            <a class="delete-post-btn" href="/posts/destroy/${post._id}"><i class="delete far fa-trash-alt" id="delete"></i></a>

     
                 <div class="comment-container" id="${post._id}">
                     <div id="post-comment">
                         <form action="/comment/create-comment" method="POST">
                             <input type="text" name="content" placeholder="Add comment..." required>
                             <input type="hidden" name="post" value="${post._id}">
                             <input class="btn-blue" type="submit" value="Add Comment">
                         </form>
                     </div>
                     
                 </div>
            
         <script src="/JS/post-comment.js"></script>
     </div>`)

    }

    // for deleting post form DOM
    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#post-container-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        type: 'success',
                        layout: 'topRight',
                        text: "Post Delete!",
                        timeout: 1000
                    }).show();
                }, error: function (error) {
                    console.log(error);
                }
            })

        })
    }
    createPost();


}