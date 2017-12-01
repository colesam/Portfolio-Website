<div class="title flex-row justify-space-between align-center">
    <div class="dotted-line"></div>
    <h2 class="center-text">Contact</h2>
    <div class="dotted-line"></div>
</div>

<div class="row">
    <!-- FORM MESSAGE -->
    <?php if($msgType=="success" && strlen($msg) > 0) { ?>
            
        <!-- echo success message -->
        <div class="col-6 offset-3 alert alert-success">
            <strong>Success: </strong> <?php echo $msg; ?>
        </div>
            
    <?php } ?>
    
    <?php if($msgType=="error" && strlen($msg) > 0) { ?>
            
        <!-- echo error message -->
        <div class="col-6 offset-3 alert alert-danger">
            <strong>Error: </strong> <?php echo $msg; ?>
        </div>
            
    <?php } ?>
    

	
	<!-- CONTACT FORM -->
    <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3" id="contact-form">
        <form method="POST" action="<?php $_SERVER['PHP_SELF'] ?>">
            <div class="form-group">
                <label for="name"> Your Name</label>
                <input type="text" class="form-control small" name="name" value="<?php echo isset($_POST['name']) ? $name : ''; ?>">
            </div>
            <div class="form-group">
                <label for="email"> Email Address</label>
                <input type="email" class="form-control small" name="email" value="<?php echo isset($_POST['email']) ? $email : ''; ?>">
            </div>
            <div class="form-group">
                <label for="message"> Message</label>
                <textarea class="form-control" rows="5" name="message"><?php echo isset($_POST['message']) ? $message : ''; ?></textarea>
            </div>
            <button type="submit" name="submit" class="btn-custom flex-row justify-space-between align-center"><i class="fa fa-envelope" aria-hidden="true"></i> <a class="">Send Message</a></button>
        </form>
    </div>
    
    <!-- SOCIAL MEDIA -->
    <div class="col-12" id="social-media">
        <div class="row flex-col justify-center align-start">
            <div class="col-12 social-media-item" id="github">
                <div class="row flex-row align-center">
                    <div class="col-3 col-md-2">
                        <i class="fa fa-github" aria-hidden="true"></i>
                    </div>
                    <div class="">
                        <a href="https://github.com/colesam" target="_blank" class="social-media-label underline">github.com/colesam</a> 
                    </div>                       
                </div>
            </div>
            <div class="col-12 social-media-item" id="linkedin">
                <div class="row flex-row align-center">
                    <div class="col-3 col-md-2">
                        <i class="fa fa-linkedin" aria-hidden="true"></i>
                    </div>
                    <div class="">
                        <a href="https://www.linkedin.com/in/colesam21" target="_blank" class="social-media-label underline">linkedin.com/in/colesam21</a> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>