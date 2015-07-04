

var  map;
var  lat ;
var  lng ;
var  xmlHttpRequest;
var  iconURL= "http://maps.google.com/mapfiles/marker_grey.png";
  
function  initialize() {
	lat = 1.281933;
	lng = 103.80321;
	
	var latlng = new google.maps.LatLng(lat,lng);
    var myOptions = {
      zoom: 12,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map (document.getElementById("map_canvas"), myOptions);

	var mymarker = new google.maps.Marker({
	   position: latlng,
	   map: map,
	   title:"I am here!",    
	   animation: google.maps.Animation.DROP,
	});
	// geocoder = new google.maps.Geocoder();
	map.setCenter(latlng);
	map.addMarker(mymarker);
	
	google.maps.event.addListener(map, 'click', function(e) {
		lat = e.latLng.lat();
		lng = e.latLng.lng();
	    setLoc(e.latLng);
	});	
	
	document.getElementById("resultDiv2").innerHTML = "init ok";
}
    
function checkinput(value) {
	return (value >= 48 && value <= 90) || value == 8 ;
}

function doSearch(query, lat, lng) {
	xmlHttpRequest = createXmlHttpRequest();
	xmlHttpRequest.onreadystatechange = onResponse;
    
	//xmlHttpRequest.open("POST","http://166.111.71.42:8080/MapApp/servlet?query="+query +"&lat="+lat+"&lng="+lng+"&command=Query",false);
	xmlHttpRequest.open("POST","servlet?query="+query +"&lat="+lat+"&lng="+lng+"&command=Query",false);
	xmlHttpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlHttpRequest.send(null);
}
  
function setLoc(latlng) {
	map.clearMarkers();
    var mymarker = new google.maps.Marker({
        position: latlng,
        map: map,
        title:"I am here!",
        animation: google.maps.Animation.DROP,
    });
	map.setCenter(latlng);
	map.addMarker(mymarker);
	
	document.getElementById("res").innerHTML = lat.toString() + "," + lng.toString() + "    ";
}
  
function  createXmlHttpRequest() {
	if (window.ActiveXObject) {
        return new ActiveXObject ("Microsoft.XMLHTTP");
    }
    else if (window.XMLHttpRequest) {
        return new XMLHttpRequest ();
    }
}
  
  
  
function  onResponse() {
	if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
	    var result = xmlHttpRequest.responseText; 
	    if(result=="no results") {
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
	    var resSplit = result.split("***");
	    document.getElementById("resultDiv").innerHTML = resSplit[1];
	    
	    
	    var response = resSplit[0].split("!");
	    map.clearMarkers(); 
	    var mymarker = new google.maps.Marker({
	        position: new google.maps.LatLng(lat, lng),
	        map: map,
	        title:"I am here!",          
	     });
	 	map.addMarker(mymarker);
	 
	 	
	    for(var i = 0; i < response.length; i ++){
	    	document.getElementById("resultDiv2").innerHTML = "info:" + response[i]; 
	    	var results = eval("(" + response[i] + ")");
	        var latlng = results.latlng;
			var new_marker = new google.maps.Marker({
	            position: new google.maps.LatLng(latlng[0], latlng[1]),
	            map: map,
	            title: results.name,
				animation: google.maps.Animation.DROP,
	            icon: iconURL
	        });
	        map.addMarker(new_marker);
	    }
		document.getElementById("resultDiv2").innerHTML = "end process";
	 }
}

google.maps.Map.prototype.markers = new Array();
google.maps.Map.prototype.addMarker = function(marker) {
  this.markers[this.markers.length] = marker;
};
google.maps.Map.prototype.getMarkers = function() {
  return this.markers
};
google.maps.Map.prototype.clearMarkers = function() {
  for(var i=0; i<this.markers.length; i++){
    this.markers[i].setMap(null);
  }
  this.markers = new Array();
};

String.prototype.LTrim = function() {
  return this.replace(/(^\s*)/g, "");
};
String.prototype.RTrim = function() {
  return this.replace(/(\s*$)/g, "");
};



