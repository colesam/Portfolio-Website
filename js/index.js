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
    
    if(navbarIsOpen()) {
            
            toggleNavbar();
            
    }
    
}

//  initialize landingPage section so it can be used for the navbar functions
var landingPage     = new Section('landing'),
    portfolioPage   = new Section('portfolio'),
    aboutPage       = new Section('about'),
    contactPage     = new Section('contact');
        

/*  VH HANDLER
        When a mobile phone user opens a keyboard or rotates the phone orientation, the vertical height of their
        browser changes, which affects any elements styled in vh units. The VH Handler converts all vh units to
        pixels when the page loads to prevent this.
*/

var vhMultiplier = $(window).height() / 100;

/*  VHElement Object
        this object represents an element on the HTML doc that needs its VH units hardcoded to pixels
    
        object variables
            mediaQuery:     int     - the minimum width of the browser in pixels for the style to be applied (null means no query)
            selector:       String  - the selector that identifies the element to be restyled (e.g ".btn-primary")
            attr:           String  - the css attribute that is being styled (e.g. height or margin-top)
            vh:             int     - the number of vh units
    
        object methods
            hardcode:  
*/

function VHElement(mediaQuery, selector, attr, vh) {
    
    this.mediaQuery = mediaQuery;
    this.selector   = selector;
    this.attr       = attr;
    this.vh         = vh;
    
}

VHElement.prototype.hardcode = function() {
        
    //  check for media query
    if($(window).width() >= this.mediaQuery || this.mediaQuery == null) {
        
        //  apply pixel values based off of vh specified in object
        var pixels = this.vh * vhMultiplier;
        $(this.selector).css(this.attr, pixels);
        
    }
    
}

//  the elements array holds all the VHElement objects which are executed under the window load function below
var elements = [
    
    //  nav.scss
    new VHElement(null, '#hamburger-menu',      'height',           7),
    new VHElement(null, '#navbar',              'height',           7),
    new VHElement(null, '#navbar-hb',           'height',           35),
    new VHElement(null, '#navbar-hb',           'top',              -27.8),
    new VHElement(1200, '#navbar',              'height',           6),
    
    //  index.scss
    new VHElement(null, '.title',               'margin-bottom',    6),
    new VHElement(null, '.full-page',           'min-height',       93),
    new VHElement(null, '.section',             'padding-top',      7),
    new VHElement(1200, '.full-page',           'min-height',       94),

    //  about-page.scss
    new VHElement(null, '.btn-custom',          'margin-top',       1),
    new VHElement(null, '.btn-custom',          'margin-bottom',    1),
    new VHElement(null, '#resume-buttons',      'margin-bottom',    3),    
    new VHElement(992,  '#resume-buttons',      'padding-top',      5),
    new VHElement(992,  '#resume-buttons',      'padding-bottom',   5),

    //  portfolio-page.scss
    new VHElement(null, '.divider-line',        'margin-bottom',    5),
    new VHElement(null, '.portfolio-item',      'margin-bottom',    5),    
    new VHElement(null, '.portfolio-item h4',   'margin-bottom',    2),
    new VHElement(null, '.portfolio-item p',    'margin-bottom',    2),  
    
    //  contact-page.scss
    new VHElement(null, 'form',                 'margin-bottom',    5),
    new VHElement(null, '.social-media-item',   'margin-bottom',    2),
    new VHElement(992,  '#contact-page .title', 'margin-bottom',    5)
    
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
    for(var i = 0; i < elements.length; i++) {
        
        elements[i].hardcode();
        
    }
    
    
    //  SECTION VARIABLES
    landingPage     = new Section('landing'),   //  must redefine the section objects once the document is ready to accurately calc positions
    portfolioPage   = new Section('portfolio'),
    aboutPage       = new Section('about'),
    contactPage     = new Section('contact');
    
    
    //  POST REQUESTS
    
    //  if the page is accessed with a post request
    if(typeof $_POST['submit'] !== 'undefined') {
        
        //  snap the window down to the contact section
        $(window).scrollTop(contactPage.startPos);
        
    }
        

    //  FADE IN
    $('#begin-btn').addClass('glow');
    
    
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
        
    });
    
    $(portfolioPage.nav).click(function() {
        
        portfolioPage.scrollTo();
        
    });
    
    $(aboutPage.nav).click(function() {
        
        aboutPage.scrollTo();
        
    });
    
    $(contactPage.nav).click(function() {
        
        contactPage.scrollTo();
        
    });
    
});