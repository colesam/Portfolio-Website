<div class="row justify-content-center">
	<div class="col-10 col-hg-8">
		<div class="row justify-content-center">
			<div class="col-12">
				<h3 class="ml-25">Contact Me</h3>
				<hr>
			</div>
		</div>
		<div class="row justify-content-center">
			<div class="col-12 col-lg-10 col-hg-8">
				<!-- FORM MESSAGE -->
				<?php if($msgType == "success" && strlen($msg) > 0) { ?>
			
					<!-- echo success message -->
					<div class="col-12 alert alert-success">
						<strong>Success: </strong> <?php echo $msg; ?>
					</div>
			
				<?php } ?>
			
				<?php if($msgType=="error" && strlen($msg) > 0) { ?>
			
					<!-- echo error message -->
					<div class="col-12 alert alert-danger">
						<strong>Error: </strong> <?php echo $msg; ?>
					</div>
			
				<?php } ?>
			
				<!-- CONTACT FORM -->
				<div class="row justify-content-center">
					<div class="col-12 gray-box" id="contact-form">
						<form method="POST" action="<?php $_SERVER['PHP_SELF'] ?>">
							<div class="row">
								<div class="col-12 col-lg-6 form-group">
									<label for="name"> Your Name</label>
									<input type="text" class="form-control" name="name" value="<?php echo isset($_POST['name']) && $msgType != 'success' ? $name : ''; ?>">
								</div>
								<div class="d-hidden d-lg-block col-lg-6">
									<!-- offset col -->
								</div>
								<div class="col-12 col-lg-6 form-group">
									<label for="email"> Email Address</label>
									<input type="email" class="form-control" name="email" value="<?php echo isset($_POST['email']) && $msgType != 'success' ? $email : ''; ?>">
								</div>
								<div class="d-hidden d-lg-block col-lg-6">
									<!-- offset col -->
								</div>
								<div class="col-12 form-group">
									<label for="message"> Message</label>
									<textarea class="form-control" rows="5" name="message"><?php echo isset($_POST['message']) && $msgType != 'success' ? $message : ''; ?></textarea>
								</div>
								<div class="col-12">
									<button type="submit" name="submit" class="btn btn-custom form-control"> Send Message</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

