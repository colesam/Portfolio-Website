/*global $*/


/*  SECTION OBJECT
        this object represents a section of the website (home, about, etc.)
    
        object variables
            section:    a selector that identifies the section on the page
            nav:        a selector that identifies the nav button for this section
            startPos:   the number of pixels between the top of the page and the start of this section
            endPos:     the number of pixels between the top of the page and the end of this section
    
        object methods
            contains:   returns true if the position passed falls between it's start and end positions
            scrollTo:   scrolls so that the top of the window is touching this.startPos
            setActive:  sets this section of the website as the one the user is looking at
*/

var navbarHeight = $('.navbar').height();  //  height of navbar plus some offset
    
function Section(name) {
    
    this.section    = '#' + name + '-page';
    this.nav        = '.' + name + '-nav';
    this.startPos   = $(this.section).offset().top;
    this.endPos     = this.startPos + $(this.section).height();
    
}

Section.prototype.contains = function(position) {
    
    //  returns true if the position passed as a parameter is between the start
    //  and end position of the Section object
    return (position >= this.startPos && position < this.endPos);
    
}

Section.prototype.scrollTo = function() {
    
    var offset = 25;
    
    if($(window).width() > 1200) { offset = 50; }
    
    //  scroll to the section leaving room for the navbar at the top
    $('html,body').animate({scrollTop: this.startPos - navbarHeight + offset}, 500);
    
}


$(document).ready(function() {
    
    //  RESIZE LANDING IMAGE    
    if($(window).width() > 1200) {
        
        $(".landing-graphic-lg img").attr("src", "includes/img/landing-display-lg.jpg")
        
    }

});


$(window).on('load', function() {

    //  INITIALIZE SECTION VARIABLES
    var landingPage     = new Section('landing'),
        portfolioPage   = new Section('portfolio'),
        aboutPage       = new Section('about'),
        contactPage     = new Section('contact');
    
    
    //  SPECIAL PAGE LOADS
    
    //  if the page is accessed with portfolio flag in url, scroll to the portfolio section
    var url = $(location).attr('href');
    if(url.includes('?portfolio=true')) portfolioPage.scrollTo();
    
    //  if the page is accessed with a post request (reference mailer.php for initialization of $_POST),
    //  snap the window down to the contact section (no animation)
    if(typeof($_POST['submit']) !== 'undefined') $(window).scrollTop(contactPage.startPos);
    
    
    //  NAVBAR EVENT LISTENERS AND FUNCTIONS
    $(window).scroll(function() {
        
        //  display nav when you exit landing page
        if(!($(document).scrollTop() <= aboutPage.startPos - navbarHeight)) {

            $('.navbar').removeClass('hidden');
            $(this).off('scroll');
            
        }
        
    });
    
    //  trigger scroll event in case loaded page did not start in landing page
    $(window).trigger('scroll');
    
    $(landingPage.nav).click(function() {
        
        landingPage.scrollTo();
        
        if($(".navbar-collapse").hasClass("show")) {
            
            $(".navbar-toggler").addClass("collapsed");
            $(".navbar-collapse").removeClass("show");
            
        }
        
    });
    
    $(aboutPage.nav).click(function() {
        
        aboutPage.scrollTo();
        
        if($(".navbar-collapse").hasClass("show")) {
            
            $(".navbar-toggler").addClass("collapsed");
            $(".navbar-collapse").removeClass("show");
            
        }
        
    });
    
    $(portfolioPage.nav).click(function() {
        
        portfolioPage.scrollTo();
        
        if($(".navbar-collapse").hasClass("show")) {
            
            $(".navbar-toggler").addClass("collapsed");
            $(".navbar-collapse").removeClass("show");
            
        }
        
    });
    
    $(contactPage.nav).click(function() {
        
        contactPage.scrollTo();
        
        if($(".navbar-collapse").hasClass("show")) {
            
            $(".navbar-toggler").addClass("collapsed");
            $(".navbar-collapse").removeClass("show");
            
        }
        
    });
    
});