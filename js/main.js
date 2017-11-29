var pageIds = ["#intro", "#impact", "#shop", "#register"];
var currentPage = 0;
var scrolling = false;
var screenHeight = window.innerHeight;
var screenWidth = window.innerWidth;
var startY = 0;
var mainScrollPos;

$(document).ready(function () {
	//screen.orientation.lock("landscape");
	
	$('#pages').on('touchstart', function(e) {
		startY = e.originalEvent.touches[0].clientY;
	});
	
	$('#pages').on('touchend', function (e) {
		if (!scrolling) {
			e.preventDefault();
			var currentY = e.changedTouches[0].clientY;
			if(Math.abs(currentY - startY) > 20) {
				if(currentY > startY) {
					//down
					if (currentPage > 0) {
						currentPage--;
					}
				} else if (currentY < startY) {
					//up
					
					if (currentPage < pageIds.length - 1) {
						currentPage++;
					}
				}
				goToPage(currentPage);
			} else {
				$('#pages').unbind('touchend').trigger('touchend');
			}
		}
	});
	
	$(window).on('scroll', function(e) {
		if(mainScrollPos) {
			$('html, body').scrollTop(mainScrollPos);
		}
	});
	
	
	
	mdc.autoInit();
	$("#pages").mousewheel(function(e){
		e.preventDefault();
		if (!scrolling) {
			var targetPage;
			if (e.deltaY > 0) {
				//up
				if (currentPage > 0) {
					currentPage--;
				}
			}
			else {
				//down
				if (currentPage < pageIds.length - 1) {
					currentPage++;
				}
			}
			goToPage(currentPage);
		}
	});
	
	
	resizePages();
	$('html, body').animate({scrollTop: $(pageIds[currentPage]).offset().top}, 0);
	
	if(window.innerWidth <= 1700) {
		$('#products img').each(function (i, img) {
			var urlSegments = img.src.split("/");
			var fileAndExtension = urlSegments[urlSegments.length - 1].split("\.");
			var newUrl;
			
			for (let i = 0; i < urlSegments.length - 1; i++) {
				if (newUrl) {
					newUrl = `${newUrl}/${urlSegments[i]}`;
				} else {
					newUrl = urlSegments[i];
				}
			}
			
			var imgPostfix;
			if(window.innerWidth > 1380) {
				imgPostfix = "_medium"
			} else {
				imgPostfix = "_small";
			}
			
			newUrl = `${newUrl}/${fileAndExtension[0]}${imgPostfix}.${fileAndExtension[1]}`;
			img.src = newUrl;
		});
	}
	
	$('#products').slick({
		slidesToShow: 3,
		slidesToScroll: 3,
		prevArrow: '<a class="slick-prev"><img src="img/left-arrow.png"></a>',
		nextArrow: '<a class="slick-next"><img src="img/right-arrow.png"></a>',
		responsive: [
			{
				breakpoint: 1000,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 400,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
				
	$(window).resize(function () {
		if (window.innerHeight < screenHeight && window.innerHeight < screenWidth
			&& window.innerWidth < screenHeight && window.innerWidth < screenWidth) {
			$('#products').slick("unslick");
			resizePages();
			slick();
			var targetPage = pageIds[currentPage];
			$('html, body').animate({scrollTop: $(targetPage).offset().top}, 0);
		}
	});
	if(screenWidth < 340) {
		$("#signature").jSignature({color:"#000", height: 100, width: 220, "background-color": "white"});
	} else if(screenWidth < 400) {
		$("#signature").jSignature({color:"#000", height: 100, width: 250, "background-color": "white"});
	} else if (screenWidth < 1000) {
		$("#signature").jSignature({color:"#000", height: 100, width: 350, "background-color": "white"});
	} else if (screenWidth < 1200) {
		$("#signature").jSignature({color:"#000", height: 150, width: 450,"background-color": "white"});
	} else {
		$("#signature").jSignature({color:"#000", height: 150, "background-color": "white"});
	}
	slick();
});

function goToPage(page) {
	currentPage = page;
	var targetPage = pageIds[currentPage];
	scrolling = true;
	$('html, body').animate({scrollTop: $(targetPage).offset().top}, 1000);
	setTimeout(function () {
		scrolling = false;
	}, 1000);
}

function resizePages() {
	$('.page').each(function (i, p){
		p.style.height = screenHeight;
		p.style.width = screenWidth;
		
		currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
		if(currentPosition >= screenHeight) {
			currentPage = parseInt(currentPosition / screenHeight);
		}
	});
}

function showModal(){
	$('#release-modal').css("display", "block");
	scrolling = true;
	mainScrollPos = $(pageIds[currentPage]).offset().top;
}

function hideModal(){
	$('#release-modal').css("display", "none");
	scrolling = false;
	mainScrollPos = undefined;
}

function slick() {
	$('#products').slick({
		slidesToShow: 3,
		slidesToScroll: 3,
		prevArrow: '<a class="slick-prev"><img src="img/left-arrow.png"></a>',
		nextArrow: '<a class="slick-next"><img src="img/right-arrow.png"></a>',
		responsive: [
			{
				breakpoint: 1000,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 400,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
}

function sendFormData(form, dialogClass) {
	var url = form.attr("action");
    var formData = {};
	var valid = true;
    form.find("input[name]").each(function (index, node) {
        if(!node.value) valid = false;
    });
	
	$('#dialog').removeClass();
	$('#dialog').addClass(`center ${dialogClass}`);
	
	if(!valid) {
		$('#dialog p').html("All fields are required!");
		$('#dialog').css("display", "block");
		return;
	}
	
    $.post(url, form.serialize(), function (data) {
        $('#dialog p').html(data);
		$('#dialog').css("display", "block");
    })
	.fail(function() {
		$('#dialog p').html("There was an error while sending your informations to the server. Please try again.");
		$('#dialog').css("display", "block");
	});
}

function sendContractForm(dialogClass) {
	$('#release-contract-signature').val($("#signature").jSignature('getData').split("\,")[1]);
	
	sendFormData($('#release-modal form'), dialogClass);
}

function hideDialog() {
	$('#dialog').css("display", "none");
}