/*global $*/
/*global landingPage*/
/*global aboutPage*/
/*global portfolioPage*/
/*global contactPage*/

//  SECTION OBJECT
    //  this object represents a section of the website (home, about, etc.)
    
    //  object variables
    //      section:    a selector that represents the section on the page
    //      nav:        a selector that represents the nav button for this section
    //      startPos:   the number of pixels between the top of the page and the start of this section
    //      endPos:     the number of pixels between the top of the page and the end of this section
    
    //  object methods
    //      contains:   returns true if the position passed falls between it's start and end positions
    //      scrollTo:   scrolls so that the top of the window is touching this.startPos
    //      setActive:  sets this section of the website as the one the user is looking at
    
function Section(name) {
    
    this.section    = '#' + name + '-page';
    this.nav        = '.' + name + '-nav';
    this.startPos   = $(this.section).offset().top;
    this.endPos     = this.startPos + $(this.section).height();
    
}

Section.prototype.contains = function(position) {
    
    //  returns true if the pixel position passed as a parameter is between the start
    //  and end position of the Section object
    return (position >= this.startPos && position < this.endPos);
    
}

Section.prototype.scrollTo = function() {
    
    //  scroll to the section leaving room for the navbar at the top
    $('html,body').animate({scrollTop: this.startPos - navbarHeight}, 500);
    
}

//  initialize landingPage section so it can be used for the navbar functions
    var landingPage     = new Section('landing'),
        portfolioPage   = new Section('portfolio'),
        aboutPage       = new Section('about'),
        contactPage     = new Section('contact');
        

//  VH HANDLER
var vhMultiplier = $(window).height() / 100;

function handleVH(elements) {
    
    //  elements parameter is an array of objects with a selector and vh attribute
    for(var i = 0; i < elements.length; i++) {
        
        //  error checking
        if($(elements[i].selector) == null) {
            
            console.log(elements[i].selector + ' was null');
            
        }
        
        //  check for media query
        if($(window).width() >= elements[i].mediaQuery || elements[i].mediaQuery == null) {
            
            //  apply pixel values based off of vh specified in object
            var pixels = elements[i].vh * vhMultiplier;
            $(elements[i].selector).css(elements[i].attr, pixels);
            
        }
        
    }
    
}

var elements = [
    
    //  nav.scss
    {
        mediaQuery:     null,
        selector:       '#hamburger-menu',
        attr:           'height',
        vh:             7
    },
    
    {
        mediaQuery:     null,
        selector:       '#navbar',
        attr:           'height',
        vh:             7
    },
    
    {
        mediaQuery:     null,
        selector:       '#navbar-hb',
        attr:           'height',
        vh:             35
    },
    
    {
        mediaQuery:     null,
        selector:       '#navbar-hb',
        attr:           'top',
        vh:             -27.8
    },
    
    {
        mediaQuery:     1200,
        selector:       '#navbar',
        attr:           'height',
        vh:             6
    },
    
    //  index.scss
    {
        mediaQuery:     null,
        selector:       '.title',
        attr:           'margin-bottom',
        vh:             6
    },
    
    {
        mediaQuery:     null,
        selector:       '.full-page',
        attr:           'min-height',
        vh:             93
    },
    
    {
        mediaQuery:     1200,
        selector:       '.full-page',
        attr:           'min-height',
        vh:             94
    },
    
    {
        mediaQuery:     null,
        selector:       '.section',
        attr:           'padding-top',
        vh:             7
    },
    
    //  landing-page.scss

    
    //  about-page.scss
    {
        mediaQuery:     null,
        selector:       '.btn-custom',
        attr:           'margin-top',
        vh:             1
    },
    
    {
        mediaQuery:     null,
        selector:       '.btn-custom',
        attr:           'margin-bottom',
        vh:             1
    },
    
    {
        mediaQuery:     null,
        selector:       '#resume-buttons',
        attr:           'margin-bottom',
        vh:             3
    },
    
    {
        mediaQuery:     992,
        selector:       '#resume-buttons',
        attr:           'padding-top',
        vh:             5
    },
    
    {
        mediaQuery:     992,
        selector:       '#resume-buttons',
        attr:           'padding-bottom',
        vh:             5
    },
    
    //  portfolio-page.scss
    {
        mediaQuery:     null,
        selector:       '.divider-line',
        attr:           'margin-bottom',
        vh:             5
    },
    
    {
        mediaQuery:     null,
        selector:       '.portfolio-item',
        attr:           'margin-bottom',
        vh:             5
    },
    
    {
        mediaQuery:     null,
        selector:       '.portfolio-item img',
        attr:           'margin-bottom',
        vh:             6
    },
    
    {
        mediaQuery:     null,
        selector:       '.portfolio-item img',
        attr:           'margin-bottom',
        vh:             0
    },
    
    {
        mediaQuery:     null,
        selector:       '.portfolio-item h4',
        attr:           'margin-bottom',
        vh:             2
    },
    
    {
        mediaQuery:     null,
        selector:       '.portfolio-item p',
        attr:           'margin-bottom',
        vh:             2
    },
    
    //  contact-page.scss
    {
        mediaQuery:     null,
        selector:       'form',
        attr:           'margin-bottom',
        vh:             5
    },
    
    {
        mediaQuery:     null,
        selector:       '.social-media-item',
        attr:           'margin-bottom',
        vh:             2
    },
    
    {
        mediaQuery:     992,
        selector:       '#contact-page .title',
        attr:           'margin-bottom',
        vh:             5
    }
    
];


//  NAVBAR VARIABLES AND METHODS
var nav             = $('#nav'),
    logo            = $('#logo'),
    hamburgerButton = $('#hamburger-menu'),
    hamburgerNav    = $('#navbar-hb'),
    navbar          = $('#navbar'),
    navbarHeight    = navbar.height();
    
function navbarIsOpen() {
    
    //  this function returns true if the collapsable navbar is open
    //  returns false if it is closed
    return (parseInt(hamburgerNav.css('top'), 10) > 0);
    
}
    
function toggleNavbar() {
    
    //  this function opens the hamburger menu if it's closed and
    //  closes it if it's opened

    //  this property had to be hardcoded to use the vhMultiplier
    if(navbarIsOpen()) {
        
        //  if the hamburger nav is opened, close it
        hamburgerNav.css('top', -27.8 * vhMultiplier);
        
    } else {

        //  if the hamburger nav is closed, open it
        hamburgerNav.css('top', 7 * vhMultiplier);
        
    }
    
    logo.toggleClass('grayed');
    hamburgerButton.toggleClass('grayed');
    navbar.toggleClass('box-shadow-blue');
    
}

function displayNav() {
    
    //  this function fades the nav into view after scrolling past the landing section
    var currentPosition = $(window).scrollTop() + navbarHeight + 1; //  add one to allow navbar to appear after scroll from landing page
    
    if(!landingPage.contains(currentPosition)) {
        
        nav.css('opacity', 1);
        
    } else {
        
        nav.css('opacity', 0);
        
    }
    
}


$(window).on('load', function() {
    
    //  HARDCODE VH UNITS TO PIXELS TO AVOID BROWSER RESIZING ISSUES
    handleVH(elements);
    
    
    //  SECTION VARIABLES
    landingPage     = new Section('landing'),   //  must redefine the section objects once the document is ready to accurately calc positions
    portfolioPage   = new Section('portfolio'),
    aboutPage       = new Section('about'),
    contactPage     = new Section('contact');
    
    
    //  if the page is accessed with a post request
    if(typeof $_POST['submit'] !== 'undefined') {
        
        //  snap the window down to the contact section
        $(window).scrollTop(contactPage.startPos);
        
    }
        

    //  FADE IN
    $('#begin-btn').addClass('glow');
    
    
    //  BUTTON EVENT LISTENERS
    $('.btn-custom').hover(
    
        //  this hover event scales up the embedded anchor tags of .btn custom buttons
        function() {$(this).children('a').addClass('anchor-hover');},      //  hover on function
        function() {$(this).children('a').removeClass('anchor-hover');}    //  hover off function
        
    );
    
    
    //  NAVBAR EVENT LISTENERS AND FUNCTIONS
    displayNav();
    
    $(window).scroll(function() {
        
        displayNav();
        
    });
    
    hamburgerButton.click(function() {
        
        toggleNavbar();
        
    });
    
    $(landingPage.nav).click(function() {
        
        landingPage.scrollTo();
        
        if(navbarIsOpen()) {
            
            toggleNavbar();
            
        }
        
    });
    
    $(portfolioPage.nav).click(function() {
        
        portfolioPage.scrollTo();
        
        if(navbarIsOpen()) {
            
            toggleNavbar();
            
        }
        
    });
    
    $(aboutPage.nav).click(function() {
        
        aboutPage.scrollTo();
        
        if(navbarIsOpen()) {
            
            toggleNavbar();
            
        }
        
    });
    
    $(contactPage.nav).click(function() {
        
        contactPage.scrollTo();
        
        if(navbarIsOpen()) {
            
            toggleNavbar();
            
        }
        
    });
    
    
    //  LANDING PAGE EVENT LISTENERS
    $('#phone-button').click(function() {
        
        aboutPage.scrollTo();
        
    });
    
});