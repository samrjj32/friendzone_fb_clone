        $(function(){

    var u_id = $('.u_p_id').data('uid');
    var p_id = $('.u_p_id').data('pid');
    var BASE_URL = "http://localhost/friendzone/";

            var regex = /[#|@](\w+)$/ig;

            $('#statusEmoji').emojioneArea({
            pickPosition: "right",
            spellcheck: true
            });

              $(document).on('click', '.emojionearea-editor', function() {
                $('.status-share-button-wrap').show('0.5');
            })
            $(document).on('click', '.status-bot', function() {
                $('.status-share-button-wrap').show('0.5');
            })

               var fileCollection = new Array();

               $(document).on("change", "#multiple_files", function(e) {
                var count = 0;
                var files = e.target.files;
                $(this).removeData();
                var text = "";

                $.each(files, function(i, file) {
                    fileCollection.push(file);
                    var reader = new FileReader();

                    reader.readAsDataURL(file);

                    reader.onload = function(e) {
                        var name = document.getElementById("multiple_files").files[i].name;
                        var template = '<li class="ui-state-default del" style="position:relative;"><img id="' + name + '" style="width:60px; height:60px" src="' + e.target.result + '"></li>';
                        $("#sortable").append(template);
                    }
                })

                $("#sortable").append('<div class="remImg" style="position:absolute; top:0;right:0;cursor:pointer; display:flex;justify-content:center; align-items:center; background-color:white; border-radius:50%; height:1rem; width:1rem; font-size: 0.694rem;">X</div>')
                })
                  $(document).on('click', '.remImg', function() {
            $('#sortable').empty();

            $('.input-restore').empty().html(
                '<label for="multiple_files" class="file-upload-label"><div class="status-bot-1"><img src="assets/image/photo.JPG" alt=""><div class="status-bot-text">Photo/Video</div></div></label><input type="file" name="file-upload" id="multiple_files" class="file-upload-input" data-multiple-caption="{count} files selected" multiple="">'
            );
            })


            $('.status-share-button').on('click', function() {
            var statusText = $('.emojionearea-editor').html();

            var formData = new FormData()

            var storeImage = [];

            var error_images = [];

            var files = $('#multiple_files')[0].files;

            if (files.length != 0) {
                if (files.length > 10) {
                    error_images += 'You can not select more than 10 images';
                } else {
                    for (var i = 0; i < files.length; i++) {
                        var name = document.getElementById('multiple_files').files[i].name;

                        storeImage += '{\"imageName\":\"user/' + u_id + '/postImage/' + name + '\"},';

                        var ext = name.split('.').pop().toLowerCase();

                        if (jQuery.inArray(ext, ['gif', 'png', 'jpg', 'jpeg', 'mp4']) == -1) {
                            error_images += '<p>Invalid ' + i + ' File </p>';
                        }

                        var ofReader = new FileReader();

                        ofReader.readAsDataURL(document.getElementById('multiple_files').files[i]);

                        var f = document.getElementById('multiple_files').files[i];

                        var fsize = f.size || f.fileSize;

                        if (fsize > 2000000000) {
                            error_images += '<p>' + i + ' File Size is very big</p>';
                        } else {
                            formData.append('file[]', document.getElementById('multiple_files').files[
                                i]);
                        }

                    }
                }

                if (files.length < 1) {

                } else {
                    var str = storeImage.replace(/,\s*$/, "");

                    var stIm = '[' + str + ']';
                }
                if (error_images == '') {
                    $.ajax({
                        url: 'http://localhost/friendzone/core/ajax/uploadPostImage.php',
                        method: "POST",
                        data: formData,
                        contentType: false,
                        cache: false,
                        processData: false,
                        beforeSend: function() {
                            $('#error_multiple_files').html(
                                '<br/><label> Uploading...</label>');
                        },
                        success: function(data) {
                            $('#error_multiple_files').html(data);
                            $('#sortable').empty();
                        }
                    })
                } else {
                    $('#multiple_files').val('');
                    $('#error_multiple_files').html("<span> " + error_images + "</span>");
                    return false;
                }
            } else {
                var stIm = '';
            }

            var mention_user = statusText.match(regex);
            

            if (stIm == '') {
               
                $.post('http://localhost/friendzone/core/ajax/postSubmit.php', {
                    onlyStatusText: statusText,
                }, function(data) {
                    console.log(stIm,statusText,'ress..1')
                    $('adv_dem').html(data);
                    location.reload();

                })
            } else {
                $.post('http://localhost/friendzone/core/ajax/postSubmit.php', {
                    stIm: stIm,
                    statusText: statusText,
                }, function(data) {
                    $('#adv_dem').html(data);
                    location.reload();
                })
            }
        })   


               $(document).on('click', '.postImage', function() {
            var userid = $(this).data('userid');
            var postid = $(this).data('postid');
            var profileid = $(this).data('profileid');
            var imageSrc = $(this).attr('src');


            $.post('http://localhost/friendzone/core/ajax/imgFetchShow.php', {
                fetchImgInfo: userid,
                postid: postid,
                imageSrc: imageSrc
            }, function(data) {
                $('.top-box-show').html(data);
               
            })

        }) 



        //...........................post option......................
        $(document).on('click', '.post-option', function() {
            $('.post-option').removeAttr('id');
            $(this).attr('id', 'opt-click');
            var postid = $(this).data('postid');
            var userid = $(this).data('userid');

            var postDetails = $(this).siblings('.post-option-details-container');
            $(postDetails).show().html(
                '<div class="post-option-details"><ul><li class="post-edit" data-postid="' +
                postid + '" data-userid="' + userid +
                '">Edit</li><li class="post-delete" data-postid="' + postid + '" data-userid="' +
                userid + '">Delete</li><li class="post-privacy" data-postid="' + postid +
                '" data-userid="' + userid + '">Privacy</li></ul></div>');
        }) 

      $(document).on('click', 'li.post-edit', function() {
            var statusTextContainer = $(this).parents('.nf-1').siblings('.nf-2').find('.nf-2-text');
            var addId = $(statusTextContainer).attr('id', 'editPostPut');
            var getPostText1 = $(statusTextContainer).text();
            var postid = $(statusTextContainer).data('postid');
            var userid = $(statusTextContainer).data('userid');
            var profilePic = $(statusTextContainer).data('profilepic');

            var getPostImg = $(this).parents('.nf-1').siblings('.nf-2').find('.nf-2-img');
            var thiss = $(this).parents('.nf-1').siblings('.nf-2').find('.nf-2-img');
            var getPostText = getPostText1.replace(/\s+/g, " ").trim();


            console.log(getPostText1,profilePic,postid,userid,"pic")
            $('.top-box-show').html(
                '<div class="top-box profile-dialog-show" style="top: 12.5%;left: 22.5%;width: 55%;"> <div class="edit-post-header align-middle " style="justify-content: space-between; padding: 10px; height: 20px; background-color: lightgray;font-size: 14px; font-weight:600; "> <div class="edit-post-text">Edit Post</div> <div class="edit-post-close" style="padding: 5px; color: gray; cursor:pointer;">x</div> </div> <div class="edit-post-value" style="border-bottom: 1px solid lightgray;"> <div class="status-med"> <div class="status-prof"> <div class="top-pic"><img src="' +
                profilePic +
                '" alt=""></div> </div> <div class="status-prof-textarea"><textarea data-autoresize rows="5" columns="5" placeholder="" name="textStatus" class="editStatus align-middle" style="font-family:sens-serif; font-weight:400; padding:5px;">' +
                getPostText +
                '</textarea></div> </div> </div> <div class="edit-post-submit" style="position: absolute;right:0; bottom: 0; display: flex; align-items: center; margin: 10px;"> <div class="status-privacy-wrap"> <div class="status-privacy "> <div class="privacy-icon align-middle"><img src="assets/images/profile/publicIcon.JPG" alt=""></div> <div class="privacy-text">Public</div> <div class="privacy-downarrow-icon align-middle"><img src="assets/images/watchmore.png" alt=""></div> </div> <div class="status-privacy-option"></div> </div> <div class="edit-post-save" style="padding: 3px 15px; background-color: #4267bc;color: white; font-size: 14px; margin-left:5px; cursor:pointer;" data-postid="' +
                postid + '" data-userid="' + userid + '" data-tag="' + thiss +
                '">Save</div> </div> </div>');



        })


       $(document).on('click', '.edit-post-save', function() {
            var postid = $(this).data('postid');
            var userid = $(this).data('userid');
            var editedText = $(this).parents('.edit-post-submit').siblings('.edit-post-value').find(
                '.editStatus');
            var editedTextVal = $(editedText).val();


            $.post('http://localhost/friendzone/core/ajax/editPost.php', {
                editedTextVal: editedTextVal,
                postid: postid,
                userid: userid

            }, function(data) {
                            console.log(editedTextVal,"ress")

                $('#editPostPut').html(data).removeAttr('id');
                $('.top-box-show').empty();
            })
        })

        $(document).on('click', '.post-delete', function() {
            var postid = $(this).data('postid');
            var userid = $(this).data('userid');
            var postContainer = $(this).parents('.profile-timeline');
            var r = confirm("Do you want to delete the post?");

            if (r == true) {
                $.post('http://localhost/friendzone/core/ajax/editPost.php', {
                    deletePost: postid,
                    userid: userid
                }, function(data) {
                    $(postContainer).empty();



                })
            }
        })

      //...........................post option end......................

              $(document).on('change', '#profile-upload', function() {

                var name = $('#profile-upload').val().split('\\').pop();
                var file_data = $('#profile-upload').prop('files')[0];
                var file_size = file_data['size'];
                var file_type = file_data['type'].split('/').pop();
                var userid = u_id;
                var imgName = 'user/' + userid + '/profilePhoto/' + name + '';
                var form_data = new FormData();
                form_data.append('file', file_data);


                if (name != '') {
                    $.post('http://localhost/friendzone/core/ajax/profilePhoto.php', {
                        imgName: imgName,
                        userid: userid
                    }, function(data) {
                        
                    })

                    $.ajax({
                        url: 'http://localhost/friendzone/core/ajax/profilePhoto.php',
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: form_data,
                        type: 'post',
                        success: function(data) {
                            $('.profile-pic-me').attr('src', " " + data + " ");
                            $('.profile-dialoge-show').hide();
                        }
                    })

                }

            })

             $('.profile-pic-upload').on('click', function() {
                $('.top-box-show').html('<div class="top-box align-vertical-middle profile-dialoge-show "> <div class="profile-pic-upload-action"> <div class="pro-pic-up "> <div class="file-upload"> <label for="profile-upload" class="file-upload-label"> <snap class="upload-plus-text align-middle"> <snap class="upload-plus-sign">+</snap>Upload Photo</snap> </label> <input type="file" name="file-upload" id="profile-upload" class="file-upload-input"> </div> </div> <div class="pro-pic-choose"></div> </div> </div>')
            })
           
           $('.add-cover-photo').on('click', function(){
             $('.add-cov-opt').toggle();
           })
         
            $('#cover-upload').on('change', function() {
                 var name = $('#cover-upload').val().split('\\').pop();
                 var file_data = $('#cover-upload').prop('files')[0];
                 var file_size = file_data["size "];
                 var file_type = file_data['type'].split('/').pop();
         
                 var userid = u_id;
                 var imgName = 'user/' + userid + '/coverphoto/' + name + '';
         
                  var form_data = new FormData();
                  form_data.append('file', file_data);

                 console.log(u_id,userid,imgName)
         
                 if (name != '') {
                     $.post('http://localhost/friendzone/core/ajax/profile.php', {
                         imgName: imgName,
                         userid: userid
                     }, function(data) {
                         
         
                     })
         
                    $.ajax({
                     url: 'http://localhost/friendzone/core/ajax/profile.php',
                     cache: false,
                     contentType: false,
                     processData: false,
                     data: form_data,
                     type: 'post',
                     success: function(data) {
                        
                         $('.profile-cover-wrap').css('background-image', 'url(' + data + ')');
                         $('.add-cov-opt').hide();
                     }
         
                 })
                 }
             
             });



        //...........................Main react......................
        $(document).on('click', '.like-action', function() {
            var likeActionIcon = $(this).find('.like-action-icon img');
            var likeReactParent = $(this).parents('.like-action-wrap');
            var nf4 = $(likeReactParent).parents('.nf-4');
            var nf_3 = $(nf4).siblings('.nf-3').find('.react-count-wrap');
            var reactCount = $(nf4).siblings('.nf-3').find('.nf-3-react-username');
            var reactNumText = $(reactCount).text();
            var postId = $(likeReactParent).data('postid');
            var userId = $(likeReactParent).data('userid');
            var typeText = $(this).find('.like-action-text span');
            var typeR = $(typeText).text();
            var spanClass = $(this).find('.like-action-text').find('span');


            if ($(spanClass).attr('class') !== undefined) {

                if ($(likeActionIcon).attr('src') == 'assets/image/likeAction.JPG') {
                    (spanClass).addClass('like-color');
                    $(likeActionIcon).attr('src', 'assets/image/react/like.png').addClass(
                        'reactIconSize');
                    spanClass.text('like');
                    mainReactSubmit(typeR, postId, userId, nf_3);
                } else {
                    $(likeActionIcon).attr('src', 'assets/image/likeAction.JPG');
                    spanClass.removeClass();
                    spanClass.text('Like');
                    mainReactDelete(typeR, postId, userId, nf_3);
                }
            } else if ($(spanClass).attr('class') === undefined) {
                (spanClass).addClass('like-color');
                $(likeActionIcon).attr('src', 'assets/image/react/like.png').addClass('reactIconSize');
                spanClass.text('like');
                mainReactSubmit(typeR, postId, userId, nf_3);
            } else {
                (spanClass).addClass('like-color');
                $(likeActionIcon).attr('src', 'assets/image/react/like.png').addClass('reactIconSize');
                spanClass.text('like');
                mainReactSubmit(typeR, postId, userId, nf_3);
            }


        })

                 function mainReactSubmit(typeR, postId, userId, nf_3) {
                var profileid = "<?php echo $profileId; ?>";
                $.post('http://localhost/friendzone/core/ajax/react.php', {
                    reactType: typeR,
                    postId: postId,
                    userId: userId,
                    profileid: profileid
                }, function(data) {
                   
                    $(nf_3).empty().html(data);
                })
            }

             function mainReactDelete(typeR, postId, userId, nf_3) {
            var profileid = "<?php echo $profileId; ?>";
            $.post('http://localhost/friendzone/core/ajax/react.php', {
                deleteReactType: typeR,
                postId: postId,
                userId: userId,
                profileid: profileid
            }, function(data) {
                $(nf_3).empty().html(data);
            })
        }


           //...........................Comment start ......................

        $(document).on('click', '.comment-action', function() {
            $(this).parents('.nf-4').siblings('.nf-5').find('input.comment-input-style.comment-submit')
                .focus();
        })

          $('.comment-submit').keyup(function(e) {
            if (e.keyCode == 13) {
                var inputNull = $(this);
                var comment = $(this).val();
                var postid = $(this).data('postid');
                var userid = $(this).data('userid');
                var profileid = "<?php echo $profileId; ?>";
                var commentPlaceholder = $(this).parents('.nf-5').find('ul.add-comment');

                if (comment == '') {
                    alert("Please Enter Some Text");
                } else {
                    $.ajax({
                        type: "POST",
                        url: "http://localhost/friendzone/core/ajax/comment.php",
                        data: {
                            comment: comment,
                            userid: userid,
                            postid: postid,
                            profileid: profileid
                        },
                        cache: false,
                        success: function(html) {
                            console.log(html,"ress")
                            $(commentPlaceholder).append(html);
                            $(inputNull).val('');
                            
                        }
                    })
                }



            }
        })



               $(document).on('click', '.com-dot', function() {
            $('.com-dot').removeAttr('id');
            $(this).attr('id', 'com-opt-click');
            var postid = $(this).data('postid');
            var userid = $(this).data('userid');
            var commentid = $(this).data('commentid');
            var comDetails = $(this).siblings('.com-option-details-container');
            $(comDetails).show().html(
                '<div class="com-option-details" style="z-index:2;"><ul><li class="com-edit" data-postid="' +
                postid + '" data-userid="' + userid + '" data-commentid="' + commentid +
                '">Edit</li><li class="com-delete" data-postid="' + postid + '" data-userid="' +
                userid + '" data-commentid="' + commentid +
                '">Delete</li><li class="com-privacy" data-postid="' + postid + '" data-userid="' +
                userid + '">privacy</li></ul></div>');
        })

                     $(document).on('click', 'li.com-edit', function() {
            var comTextContainer = $(this).parents('.com-dot-option-wrap').siblings('.com-pro-text')
                .find('.com-text');
            var addId = $(comTextContainer).attr('id', 'editComPut');
            var getComText1 = $(comTextContainer).text();
            var postid = $(comTextContainer).data('postid');
            var userid = $(comTextContainer).data('userid');
            var commentid = $(comTextContainer).data('commentid');
            var profilepic = $(comTextContainer).data('profilepic');
            var getComText = getComText1.replace(/\s+/g, " ").trim();
            $('.top-box-show').html(
                '<div class="top-box profile-dialog-show" style="top: 12.5%;left: 22.5%;width: 55%;"><div class="edit-post-header align-middle " style="justify-content: space-between; padding: 10px; height: 20px; background-color: lightgray;font-size: 14px; font-weight:600; "><div class="edit-post-text">Edit Comment</div><div class="edit-post-close" style="padding: 5px; color: gray; cursor:pointer;">x</div></div><div class="edit-post-value" style="border-bottom: 1px solid lightgray;"><div class="status-med"><div class="status-prof"><div class="top-pic"><img src="' +
                profilepic +
                '" alt=""></div></div><div class="status-prof-textarea"><textarea data-autoresize rows="5" columns="5" placeholder="" name="textStatus" class="editCom align-middle" style="font-family:sens-serif; font-weight:400; padding:5px;">' +
                getComText +
                '</textarea></div></div></div><div class="edit-post-submit" style="position: absolute;right:0; bottom: 0; display: flex; align-items: center; margin: 10px;"><div class="status-privacy-wrap"><div class="status-privacy  "><div class="privacy-icon align-middle"><img src="assets/image/profile/publicIcon.JPG" alt=""></div><div class="privacy-text">Public</div><div class="privacy-downarrow-icon align-middle"><img src="assets/image/watchmore.png" alt=""></div></div><div class="status-privacy-option"></div></div><div class="edit-com-save" style="padding: 3px 15px; background-color: #4267bc;color: white; font-size: 14px; margin-left:5px; cursor:pointer;" data-postid="' +
                postid + '" data-userid="' + userid + '" data-commentid="' + commentid +
                '" >Save</div></div></div>');
        })

                  $(document).on('click', '.edit-com-save', function() {
            var postid = $(this).data('postid');
            var userid = $(this).data('userid');
            var commentid = $(this).data('commentid');
            var editedText = $(this).parents('.edit-post-submit').siblings('.edit-post-value').find(
                '.editCom');
            var editedTextVal = $(editedText).val();
            $.post('http://localhost/friendzone/core/ajax/editComment.php', {
                postid: postid,
                userid: userid,
                editedTextVal: editedTextVal,
                commentid: commentid
            }, function(data) {
                $('#editComPut').html(data).removeAttr('id');
                $('.top-box-show').empty();
                $('.com-option-details-container').empty();
            })
        })
        $(document).on('click', '.com-delete', function() {
            var postid = $(this).data('postid');
            var userid = $(this).data('userid');
            var commentid = $(this).data('commentid');
            var comContainer = $(this).parents('.new-comment');
            var profileid = "<?php echo $profileId; ?>";;

            var r = confirm('Do you want to delete the comment?');
            if (r === true) {
                $.post('http://localhost/friendzone/core/ajax/editComment.php', {
                    deletePost: postid,
                    userid: userid,
                    commentid: commentid
                }, function(data) {
                    $(comContainer).empty();
                })
            }
        })


        //...........................Comment end ......................   

        //...........................frnd requst ......................   


          $(document).on('click', '.profile-add-friend', function() {
            $(this).parents('.profile-action').find('.profile-follow-button').removeClass().addClass(
                'profile-unfollow-button').html(
                '<img src="assets/image/rightsignGray.JPG" alt=""><div class="profile-activity-button-text">Following</div>'
            );
            $(this).find('.edit-profile-button-text').text('Friend Request Sent');
            $(this).removeClass().addClass('profile-friend-sent');
            var userid = $(this).data('userid');
            var profileid = $(this).data('profileid');

            $.post('http://localhost/friendzone/core/ajax/request.php', {
                request: profileid,
                userid: userid
            }, function(data) {

            })

            $.post('http://localhost/friendzone/core/ajax/request.php', {
                follow: profileid,
                userid: userid
            }, function(data) {})
        })     



        $(document).on('click', '.accept-req', function() {

            var userid = $(this).data('userid');
            var profileid = $(this).data('profileid');

            $(this).parent().empty().html(
                '<div class="con-req align-middle"><img src="assets/image/rightsignGray.JPG" alt="">Friend</div><div class="request-unfriend" data-userid="' +
                userid + '" data-profileid="' + profileid + '">Unfriend</div>');

            $.post('http://localhost/friendzone/core/ajax/request.php', {
                confirmRequest: profileid,
                userid: userid
            }, function(data) {})
        });   
         
         $(document).mouseup(function(e) {
         var container = new Array();
         container.push($('.add-cov-opt'));
         container.push($('.profile-dialoge-show'));
         // container.push($('.top-box-show'));
         $.each(container, function(key, value) {
             if (!$(value).is(e.target) && $(value).has(e.target).length === 0) {
                 $(value).hide();
             }
         })
         
         })

         $(document).mouseup(function(e) {
                var container = new Array();
                container.push($('.profile-status-write'));

                $.each(container, function(key, value) {
                    if (!$(value).is(e.target) && $(value).has(e.target).length === 0) {
                        $('.status-share-button-wrap').hide('0.2');
                    }
                })


            })

           $(document).mouseup(function(e) {
            var container = new Array();
            container.push($('.post-img-wrap'));
           

            $.each(container, function(key, value) {
                if (!$(value).is(e.target) && $(value).has(e.target).length === 0) {
                    // $('.top-box-show').empty();
                }
            })

        })

               $(document).mouseup(function(e) {
            var container = new Array();
            container.push($('.post-option-details-container'));
            container.push($('.top-box-show'));

            
            $.each(container, function(key, value) {
                if (!$(value).is(e.target) && $(value).has(e.target).length === 0) {
                    $(value).empty();
                }
            })

        })

         
         })