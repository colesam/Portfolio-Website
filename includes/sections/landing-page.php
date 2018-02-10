<div class="row">
    <div class="col-md-1">
        <!-- offset col -->
    </div>
    <div class="col-12 col-md-10">
        <?php if(strpos($_SERVER["HTTP_USER_AGENT"], "MSIE")) { ?>
            
            <!-- echo warning message -->
            <div class="col-md-6 col-10 alert alert-danger">
                <p><strong>Warning: </strong>It looks like you are using Internet Explorer. This webpage is best viewed in a more modern browser such as Firefox, Google Chrome, or Safari.</p> 
            </div>
            
        <?php } ?>
            
        <!--<h1 class="brand center-text">SAMUEL <span>COLE</span></h1>-->
        <h1 class="center-text"><img src="includes/img/cole-logo-simple.svg" alt="Samuel Cole" class="img-fluid"></img></h1>
        <h3 class="center-text">Web Developer</h3>
    </div>
    <div class="col-12">
        <a class="about-nav center-text" id="begin-btn">BEGIN</a>
    </div>
</div>