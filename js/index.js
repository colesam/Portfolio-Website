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

var navbarHeight = $('.navbar').height() - 10;  //  height of navbar plus some offset
    
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
    
    //  scroll to the section leaving room for the navbar at the top
    $('html,body').animate({scrollTop: this.startPos - navbarHeight}, 500);
    
}


$(window).on('load', function() {

    //  INITIALIZE SECTION VARIABLES
    var landingPage     = new Section('landing'),
        portfolioPage   = new Section('portfolio'),
        aboutPage       = new Section('about'),
        contactPage     = new Section('contact');
    
    
    //  POST REQUESTS
    
    //  if the page is accessed with a post request
    if(typeof $_POST['submit'] !== 'undefined') {
        
        //  snap the window down to the contact section
        $(window).scrollTop(contactPage.startPos);
        
    }
    
    
    //  NAVBAR EVENT LISTENERS AND FUNCTIONS
    $(window).scroll(function() {
        
        //  only display navbar outside of landing page
        if(landingPage.contains($(document).scrollTop())) {

            $('.navbar').addClass('hidden');
            
        } else {
            
            $('.navbar').removeClass('hidden');
            
        }
        
    });
    
    $(landingPage.nav).click(function() {
        
        landingPage.scrollTo();
        
    });
    
    $(aboutPage.nav).click(function() {
        
        aboutPage.scrollTo();
        
    });
    
    $(portfolioPage.nav).click(function() {
        
        portfolioPage.scrollTo();
        
    });
    
    $(contactPage.nav).click(function() {
        
        contactPage.scrollTo();
        
    });
    
});