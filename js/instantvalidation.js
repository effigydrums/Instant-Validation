/*
 * 	InstandValidation 1.0 - jQuery plugin
 *	written by Kent Heberling, http://www.khwebdesign.net	
 *	http://khwebdesign.net/blog/instant-validation-jquery-plugin/
 *
 *	Copyright (c) 2010 Kent Heberling (http://www.khwebdesign.net)
 *	Dual licensed under the MIT (MIT-LICENSE.txt)
 *	and GPL (GPL-LICENSE.txt) licenses.
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 
 */

(function($){  
	$.fn.instantValidation = function(options) {  
		// Default Values
		var defaults = {  
			fadeSpeed: 250,
			position: "top"
		};  
		var options = $.extend(defaults, options);  
		var isEmail_re = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
		var isInt_re = /[-+]?\b\d+\b/ ;
		var isPhone_re = /[0-9]{3}-[0-9]{3}-[0-9]{4}/;
		var isZip_re = /\b\d{5}\b/;
		var arrowHeight, arrowWidth, errorMessage;

		return this.each(function() {  
			// Initializing Code
			$(this).after("<div class=\"error-message\">" + $(this).attr("title") + "<div class=\"error-message-arrow-border\"></div><div class=\"error-message-arrow\"></div></div>"); // create pop up validation message
			errorMessage = $(this).next();
			arrowHeight = $(errorMessage).children(".error-message-arrow-border").outerHeight()/2;
			arrowWidth = $(errorMessage).children(".error-message-arrow-border").outerWidth()/2; 
			$(errorMessage).css({top: $(this).offset().top, left: $(this).offset().left}); // Set pop-up to location of input
			
			switch (options.position)
			{
				case "top":
					$(errorMessage).children(".error-message-arrow-border").addClass("error-message-arrow-border-top");
					$(errorMessage).children(".error-message-arrow").addClass("error-message-arrow-top");
					$(errorMessage).css({marginLeft: "0px", marginTop: "-" + ($(errorMessage).outerHeight() + arrowHeight) + "px"});					
					break;
				case "bottom":
					$(errorMessage).children(".error-message-arrow-border").addClass("error-message-arrow-border-bottom");
					$(errorMessage).children(".error-message-arrow").addClass("error-message-arrow-bottom");
					$(errorMessage).css({marginLeft: "0px", marginTop: ($(this).outerHeight() + arrowHeight)  + "px"});
					break;
				case "left":
					$(errorMessage).children(".error-message-arrow-border").addClass("error-message-arrow-border-left");
					$(errorMessage).children(".error-message-arrow").addClass("error-message-arrow-left");
					$(errorMessage).css({marginLeft: "-" + ($(errorMessage).outerWidth() + arrowWidth)+ "px", marginTop: "0px"});
					break;	
				case "right":
					$(errorMessage).children(".error-message-arrow-border").addClass("error-message-arrow-border-right");
					$(errorMessage).children(".error-message-arrow").addClass("error-message-arrow-right");
					$(errorMessage).css({marginLeft: ($(this).outerWidth(true) + arrowWidth)+ "px", marginTop: "0px"});
					break;						
			}

			// Event Bindings
			$(this).blur(function (){	
				handlePopUp(validateInput($(this)),$(this));											  
			});
			// jquery can't find outerheight of elements with display none, and can't fade in/out elements with visibility, thus...	
			 $(errorMessage).css({visibility: "visible", display: "none"});
		});
		

		// Plugin Methods
		function validateInput(obj) {		
			var isValid = true;
			inputValue = $(obj).val();
			if (!$(obj).hasClass("noValidation")){
				if (inputValue == ""){ // validate for any input
					isValid = false;
				} else {
					if ($(obj).hasClass("emailAddress")){ // validate for a valid email address
						isValid = regexCheck(inputValue,isEmail_re);
					} else if ($(obj).hasClass("int")){ 
						isValid = regexCheck(inputValue,isInt_re);
					} else if (($(obj).hasClass("phone"))){
						isValid = regexCheck(inputValue,isPhone_re);
					} else if (($(obj).hasClass("zip"))){
						isValid = regexCheck(inputValue,isZip_re);
					} 
				}
			}
			return isValid;
		}	
		
		function handlePopUp(isValid,obj) {		
			if (isValid){
				obj.next(".error-message").fadeOut(options.fadeSpeed);
			} else {
				obj.next(".error-message").fadeIn(options.fadeSpeed);
			}
		}	
		
		function regexCheck(value, re) { return String(value).search (re) != -1;}
	};  
})(jQuery);  



