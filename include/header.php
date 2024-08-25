
<?php
   include 'connect/login.php';
   include 'core/load.php';
   
   if(login::isLoggedIn()){
       $userid = login::isLoggedIn();
   }else{
   header('location: sign.php');
   }
   
   if(isset($_GET['username']) == true && empty($_GET['username']) === false){
       $username = $loadFromUser->checkInput($_GET['username']);
       $profileId = $loadFromUser->userIdByUsername($username);
   }else{
       $profileId = $userid;
   }
       $profileData = $loadFromUser->userData($profileId);
       $userData = $loadFromUser->userData($userid);
       $requestCheck =$loadFromPost->requestCheck($userid, $profileId);
       $requestConf = $loadFromPost->requestConf($profileId, $userid);
       $followCheck= $loadFromPost->followCheck($profileId, $userid);

   
   ?>
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8">
      <title>
         <?php echo ''.$profileData->firstName.' '.$profileData->lastName.''; ?>
      </title>
      <link rel="stylesheet" href="assets/css/style.css">
      <link rel="stylesheet" href="assets/dist/emojionearea.min.css">

      <style>
      </style>
   </head>
   <body>
      <div class="u_p_id" data-uid="<?php echo $userid ?>" data-pid="<?php echo $profileId ?>"></div>

 <header>
         <div class="top-bar">
            <div class="top-left-part">
                       <div class="main-logo"><img src="assets/image/others/friendzonelogo.jpg" alt=""></div>

            <!--    <div class="search-wrap" style="display: inline;z-index:1;">
                  <div class="search-input"
                     style="display:flex;justify-content:center;align-items:center;width:100%;">
                     <input type="text" name="main-search" id="main-search">
                     <div class="s-icon top-icon top-css">
                        <img src="assets/image/icons8-search-36.png" alt="">
                     </div>
                  </div>
                  <div id="search-show" style="position:relative;">
                     <div class="search-result" style="position:absolute;">
                     </div>
                  </div>
               </div> -->
            </div>
            <div class="top-right-part">
               <div class="top-pic-name-wrap">
                  <a href="profile.php?username=<?php echo $userData->userLink; ?>" class="top-pic-name ">
                     <div class="top-pic"><img src="<?php echo $userData->profilePic; ?>" alt=""></div>
                     <span class="top-name top-css border-left ">
                     <?php echo $userData->firstName; ?>
                     </span>
                  </a>
               </div>
               <a href="index.php">
               <span class="top-home top-css border-left">Home</span>
               </a>
            </div>
         </div>
         </div>
      </header>
