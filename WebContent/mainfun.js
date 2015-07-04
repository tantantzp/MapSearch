       $(window).resize(function () {
	          var h = $(window).height(),
	          offsetTop = 90; // Calculate the top offset
	          
	          $('#map_canvas').css('height', (h - offsetTop));
        }).resize();
        

        $(function() {
          initialize();
          
          $(":text").keyup(function(){
	        	if(!checkinput(event.keyCode)) return;  
				var query = document.getElementById("search_address").value;
				if(query.length == 0) {
				    map.clearMarkers(); 
				    var mymarker = new google.maps.Marker({
				        position: new google.maps.LatLng(lat, lng),
				        map: map,
				        title:"I am here!",          
				     });
				 	map.addMarker(mymarker);
					document.getElementById("resultDiv").innerHTML = "no result!";
					return;
				}
				query = query.LTrim();
				query = query.RTrim();
				query = query.replace(/\s+/g,'+');
				
		        var cur_lat = lat;
		        var cur_lng = lng;
		        doSearch(query,cur_lat.toString(),cur_lng.toString());
          });
        });