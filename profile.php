
       <?php include 'include/header.php'; ?>
      <main>
         <div class="main-area">
            <div class="profile-left-wrap">
               <div class="profile-cover-wrap" style="background-image: url(<?php echo $profileData->coverPic; ?>)">
                  <div class="upload-cov-opt-wrap">
                     <?php if($profileId == $userid) { ?>
                     <div class="add-cover-photo">
                        <img src="assets/image/profile/uploadCoverPhoto.JPG" alt="">
                        <div class="add-cover-text">Add a cover photo</div>
                     </div>
                     <?php  }else{ ?>
                     <div class="dont-add-cover-photo">
                     </div>
                     <?php }?>
                     <div class="add-cov-opt">
                        <div class="select-cover-photo">Select Photo</div>
                        <div class="file-upload">
                           <label for="cover-upload" class="file-upload-label">Upload Photo</label>
                           <input type="file" name="file-upload" id="cover-upload" class="file-upload-input"/>
                        </div>
                     </div>

                     <div class="cover-photo-rest-wrap">
                        <div class="profile-pic-name">
                           <div class="profile-pic">
                              <?php if($profileId == $userid){
                                 ?>
                              <div class="profile-pic-upload">
                                 <div class="add-pro">
                                    <img src="assets//image/profile/uploadCoverPhoto.JPG" alt="">
                                    <div>Update</div>
                                 </div>
                              </div>
                              <?php
                                 } ?>
                              <img src="<?php echo $profileData->profilePic; ?>" alt="" class="profile-pic-me">
                           </div>
                           <div class="profile-name">
                              <?php echo ''.$profileData->first_name.' '.$profileData->last_name.'' ?>
                           </div>
                        </div>
                          <!--profile action -->
                                                   <div class="profile-action">
                            <?php
                                if($userid == $profileId){ ?>
                            <a href="about.php">
                                <div class="profile-edit-button" data-userid="<?php  echo $userid; ?>"
                                    data-profileid="<?php echo $profileId; ?>">
                                    <img src="assets/image/profile//editProfile.JPG" alt="">
                                    <div class="edit-profile-button-text" data-userid="<?php  echo $userid; ?>"
                                        data-profileid="<?php echo $profileId; ?>">Edit Profile</div>
                                </div>
                            </a>

                            <?php
                                                    }else{
                                if(empty($requestCheck)){
                                    if(empty($requestConf)){  ?>

                            <div class="profile-add-friend" data-userid="<?php echo $userid; ?>"
                                data-profileid="<?php echo $profileId; ?>">
                                <img src="assets/image/friendRequestGray.JPG" alt="">
                                <div class="edit-profile-button-text">Add Friend</div>
                            </div>

                            <?php

                                            }else if($requestConf->reqStatus == '0'){ ?>
                            <div class="profile-friend-confirm" data-userid="<?php  echo $userid; ?>"
                                data-profileid="<?php echo $profileId; ?>">
                                <div class="edit-profile-confirm-button" style="position:relative;">
                                    <div class="con-req accept-req align-middle" data-userid="<?php echo $userid; ?>"
                                        data-profileid="<?php echo $profileId; ?>">
                                        <img src="assets/image/friendRequestGray.JPG" alt="">Confirm Request
                                    </div>
                                    <div class="request-cancel" data-userid="<?php  echo $userid; ?>"
                                        data-profileid="<?php echo $profileId; ?>">Cancel Request</div>
                                </div>
                            </div>


                            <?php
                                            }else if($requestConf->reqStatus == '1'){ ?>
                            <div class="profile-friend-confirm" data-userid="<?php  echo $userid; ?>"
                                data-profileid="<?php echo $profileId; ?>">
                                <div class="edit-profile-confirm-button" style="position:relative;">
                                    <div class="con-req align-middle">
                                        <img src="assets/image/rightsignGray.JPG" alt="">Friend
                                    </div>
                                    <div class="request-unfriend" data-userid="<?php  echo $userid; ?>"
                                        data-profileid="<?php echo $profileId; ?>">Unfriend</div>
                                </div>
                            </div>

                            <?php

                                            }else{}
                                                    }else if($requestCheck->reqStatus == '0'){ ?>

                            <div class="profile-friend-sent" data-userid="<?php echo $userid; ?>"
                                data-profileid="<?php echo $profileId; ?>">
                                <img src="assets/image/friendRequestGray.JPG" alt="">
                                <div class="edit-profile-button-text">Friend Request Sent</div>
                            </div>
                            <?php
                                                }else if($requestCheck->reqStatus == '1'){ ?>
                            <div class="profile-friend-confirm" data-userid="<?php  echo $userid; ?>"
                                data-profileid="<?php echo $profileId; ?>">
                                <div class="edit-profile-confirm-button" style="position:relative;">
                                    <div class="con-req align-middle">
                                        <img src="assets/image/rightsignGray.JPG" alt="">Friend
                                    </div>
                                    <div class="request-unfriend" data-userid="<?php  echo $userid; ?>"
                                        data-profileid="<?php echo $profileId; ?>">
                                        Unfriend
                                    </div>
                                </div>
                            </div>

                            <?php
                                                        }else{echo 'Not found'; }

                                                        if(empty($followCheck)){ ?>

                            <div class="profile-follow-button" data-userid="<?php echo $userid; ?>"
                                data-profileid="<?php echo $profileId; ?>" style="border-right:1px solid gray;">
                                <img src="assets/image/followGray.JPG" alt="">
                                <div class="profile-activity-button-text">Follow</div>
                            </div>


                            <?php
                                                            } else{ ?>
                            <div class="profile-unfollow-button" data-userid="<?php echo $userid; ?>"
                                data-profileid="<?php echo $profileId; ?>" style="border-right:1px solid gray;">
                                <img src="assets/image/rightsignGray.JPG" alt="">
                                <div class="profile-activity-button-text">Unfollow</div>
                            </div>

                            <?php
        }
                                    ?>
                            <div class="block-wrap">
                                <div class="block-action">
                                    <img src="assets/image/profile/dots.JPG" alt="">
                                </div>
                                <div class="block-show" data-userid="<?php echo $userid; ?>"
                                    data-profileid="<?php echo $profileId; ?>">
                                    block-user
                                </div>
                            </div>

                            <?php


    }
    ?>



                        </div>
                     </div>
                  </div>
               </div>
               <div class="cover-bottom-part">
                  <div class="timeline-button align-middle cover-but-css" data-userid="<?php echo $userid; ?>" data-profileid="<?php echo $profileId; ?>">
                      Timeline
                </div>
               <div class="about-button align-middle cover-but-css" data-userid="<?php echo $userid; ?>" data-profileid="<?php echo $profileId; ?>">
                      About
               </div>
               <div class="friends-button align-middle cover-but-css" data-userid="<?php echo $userid; ?>" data-profileid="<?php echo $profileId; ?>">
                     Friends
               </div>
               <div class="photos-button align-middle cover-but-css" data-userid="<?php echo $userid; ?>" data-profileid="<?php echo $profileId; ?>">
                     Photos
                </div>
               </div>

                     <div class="bio-timeline">

                    <div class="bio-wrap">
                        <div class="bio-intro">
                            <div class="intro-wrap">
                                <img src="assets/image/profile/intro.JPG" alt="">
                                <div>Intro</div>
                            </div>
                            <div class="intro-icon-text">
                                <img src="assets/image/profile/addBio.JPG" alt="">
                                <div class="add-bio-text">Add a short bio to tell people more yourself.</div>
                                <div class="add-bio-click"><a href="">Add Bio</a></div>
                            </div>
                            <div class="bio-details">
                                <div class="bio-1">
                                    <img src="assets/image/profile/livesIn.JPG" alt="">
                                    <div class="live-text">Lives in <span class="live-text-css blue">Chittagong</span>
                                    </div>
                                </div>
                                <div class="bio-2">
                                    <img src="assets/image/profile/followedBy.JPG" alt="">
                                    <div class="live-text">Followed by <span class="followed-text-css blue">65
                                            people</span></div>
                                </div>
                            </div>
                            <div class="bio-feature">
                                <img src="assets/image/profile/feature.JPG" alt="">
                                <div class="feat-text">
                                    Showcase what's important to you by adding people, pages, groups and more to your
                                    featured section on your public profile.
                                </div>
                                <div class="add-feature blue">Add to Featured</div>
                                <div class="add-feature-link blue">
                                    <div class="link-plus">+</div>
                                    <div>Add Instagram, Websites, Other Links</div>
                                </div>
                            </div>
                        </div>
                    </div>

   <div class="status-timeline-wrap">
   <?php if($profileId == $userid){ ?>
           <?php include 'include/status.php'; ?>

     
   <?php } ?>
                   <div class="ptaf-wrap">
                            <?php $loadFromPost->posts($userid, $profileId, 75); ?>
                        </div>
                    </div>
               
                </div>
               


            </div>
            <div class="profile-right-wrap"></div>
         </div>
         <div class="top-box-show"></div>
         <div id="adv_dem"></div>

      </main>
      <script  src="assets/js/jquery.js"></script>
      <script src="assets/dist/emojionearea.min.js"></script>
      <script type="text/javascript" src="assets/js/main.js"></script>
   </body>
</html>