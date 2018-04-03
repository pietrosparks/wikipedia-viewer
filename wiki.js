$(function() {
	var searchBtn = $("#searchBtn");

	console.log('changed');

	function formSearch() {

		var searchBar = $("input[name='search']").val();
		console.log(searchBar);
		var apiUrl =
			"https://en.wikipedia.org/w/api.php?action=opensearch&prop=revisions&rvprop=content&format=json&search=" +
			searchBar +
			"&callback=?";

		$.ajax(apiUrl, {
			method: "get",
			dataType: 'jsonp',
			success: function(response, status) {

				console.log(response, status);

				var searchterm = "<h2 class='text-center'>You searched for: "+response[0]+"</h2>";

				$("#searchTerm").append(searchterm).hide().fadeIn(200);

				console.log(searchterm);
				

					var indexitems =[];
					$.each(response[3], function(i, link){ //first data from api pushed and sent to next call 
							
							indexitems.push("<div id='main'><div id='sec'><h1> <a href="+link+">");
							
						})

				
					var final =[];
					$.each(response[1], function(i, data){ //second call, data is added and passed on 

							final.push(indexitems[i] +data+"</a>"+"</h1>");
							
				
						})

					$.each(response[2], function(i, data){ //3rd call, data is added and finally appended 

						var info = final[i]+"<p>"+data+"</p></div></div>";
						var div = $("div#searchResult").height();
						$("#searchResult").append(info);
						
						
					})
						
			},
			error: function(error) {
				console.log("error: ", error);
			}
		});
	}
	
	$("#wikiSearch").submit(function(e) {
		console.log('hello:', e);
		e.preventDefault();

		if($("searchTerm").length <0 && $("searchResult").length <0 ){
			formSearch();
		}else {
		$("#searchResult").empty();
		$("#searchTerm").empty();
		formSearch();
		}

		
	});

var submitbutton = $('button[type="submit"]');

 submitbutton.on("click", function(){

   $('html, body').animate({
        scrollTop: $("#searchResult").offset().top
    }, 2000); //scrolls page to the bottom of the div

    //your ajax request
   
 });

  var offset = 220;
  var duration = 500;

    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.back-to-top').fadeIn(duration);
        } else {
            jQuery('.back-to-top').fadeOut(duration);
        }
    });
    
    jQuery('.back-to-top').click(function(event) {
        event.preventDefault();
        jQuery('html, body').animate({scrollTop: 0}, duration);
        return false;
    })



	// $("input[name='search']").on("click", function(){
	// 	console.log("clicked")
		
	// 	$("#searchResult").empty();
	// 	$("#searchTerm").empty();
	// })

	// Fancy form css------------------------------------------- 


});
