<?php
include '../load.php';
include '../../connect/login.php';


$userid = login::isLoggedIn();

if(isset($_POST['fetchImgInfo'])){
    $userid = $_POST['fetchImgInfo'];
    $postid = $_POST['postid'];
    $imgSrc = $_POST['imageSrc'];

            // $main_react = $loadFromPost->main_react($userid, $postid);
            // $react_max_show = $loadFromPost->react_max_show($postid);
            // $main_react_count = $loadFromPost-> main_react_count($postid);

            // $commentDetails = $loadFromPost->commentFetch($postid);
            // $totalCommentCount = $loadFromPost->totalCommentCount($postid);
            // $totalShareCount = $loadFromPost->totalShareCount($postid);
 
            ?>
                <div class="top-wrap" style="position:fixed;top:0px; bottom:0px;right:0px;justify-content:center;left:0px;display:flex;background-color:#000000c4;    z-index: 99;">

                       <div class="post-img-wrap" style="display:flex;background-color:white;width:70%;justify-content:center;align-items:center; height:100vh;">

                         <div class="post-img-action" style="background-color:#0000008c; height:100%; align-items:center;display:flex;">
                         <img src="<?php echo $imgSrc; ?>" alt="" style="width:500px;">
                       </div>
                    <div class="post-img-details">


             <div class="nf-3">
               
            </div>
            <div class="nf-4">
                <div class="like-action-wrap">
                    <div class="like-action ra">
                        <div class="like-action-icon">
                            <img  src="assets/image/likeAction.JPG"/>
                        </div>
                          <div class="like-action-text"><span>Like</span></div>
                    </div>
                </div>
                <div class="comment-action ra">
                    <div class="comment-action-icon">
                        <img src="assets/image/commentAction.JPG" alt="">
                    </div>
                    <div class="comment-action-text">
                        <div class="comment-count-text-wrap">
                            <div class="comment-wrap"></div>
                            <div class="comment-text">Comment</div>
                        </div>
                    </div>
                </div>
                <div class="share-action ra data-postid="<?php echo $post->post_id; ?> data-userid="<?php echo $user_id ?>" data-profilePic="<?php echo $post->profilePic; ?>">
                    
                  <div class="share-action-icon">
                     <img  src="assets/image/likeAction.JPG"/>
                </div>
                <div class="share-action-text">Share</div>
            </div>
                </div>

            <div class="nf-5"></div> 

            </div>
                </div>
            </div>

               <?php

           }