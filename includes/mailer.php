<?php 
    $postJSON = json_encode($_POST); 
?>

<!-- give JQuery the $_POST variable (reference POST REQUESTS section of index.js) -->
<script>
    var $_POST = <?php echo $postJSON; ?>;
</script>

<?php

//  message variables
$msg        = '';
$msgType    = '';

//  check for submit
if(isset($_POST['submit'])) {
    
    //  get form data
    $name       = htmlspecialchars($_POST['name']);
    $email      = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message    = htmlspecialchars($_POST['message']);
    
    //  form validation
    if(!empty($email) && !empty($name) && !empty($message)) {
        
        //  check email
        if(filter_var($email, FILTER_VALIDATE_EMAIL)) {
            
            //  email has passed validation, build email
            $toEmail    = 'contact@colesamdevelopment.com';
            $subject    = 'Contact Request From ' . $name;
            $body       = 'Contact Request\r\n
                           Name: ' . $name .
                          '\r\nEmail: ' . $email .
                          '\r\nMessage: \r\n' . $message;
                          
            //  email headers
            $header  = 'MIME-Version: 1.0' . '\r\n';
            $header .= 'Content-Type:text/html;charset=UTF-8' . '\r\n';
            $header .= 'From: ' . $name . '<' . $email . '>' . '\r\n';
            
            //  send email
            if(mail($toEmail, $subject, $body, $header)) {
                
                //  email sent successfully
                $msg        = 'Your message has been sent successfully.';
                $msgType    = 'success';
                
            } else {
                
                //  email failed
                $msg        = 'An error occured with the email server. Please try again later.';
                $msgType    = 'error';
                
            }
            
        } else {
            
            //  email is not valid
            $msg        = 'Please use a valid email';
            $msgType    = 'error';
            
        }
        
    } else {
        
        //  form is not valid
        $msg        = 'Please fill in all fields';
        $msgType    = 'error';
        
    }
    
}

?>