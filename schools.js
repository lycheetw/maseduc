$.ajaxSetup({async: false});

infowindow =  new google.maps.InfoWindow({
	maxWidth: 200
});



function School(data) {
	var icon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png"

	this.name = data.name;
	this.lat = data.lat;
	this.lng = data.lng;
	this.classnum = data.classnum;
	this.stunum = data.stunum;
	this.stunum_F = data.stunum_F;
	this.stunum_M = data.stunum_M;
	if (data.type=='國小') {
		this.y1 = data.y1;
		this.y2 = data.y2;
		this.y3 = data.y3;
		this.y4 = data.y4;
		this.y5 = data.y5;
		this.y6 = data.y6;
		icon = "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
	}else if (data.type=='國中') {
		this.y1 = data.y1;
		this.y2 = data.y2;
		this.y3 = data.y3;
		icon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
	}

	this.content = String.format(
							"<h4>{0}</h4><div>班級數:{1}</div><div>學生數:{2}</div>",
							this.name,this.classnum,this.stunum
						);

	this.marker = new google.maps.Marker({
						position: new google.maps.LatLng(this.lat,this.lng),
						map: map,
						title:this.name,
						ref:this,
						icon: icon,

					});

	google.maps.event.addListener(this.marker, 'click',function (event) {
		//map.panTo(event.latLng);
		infowindow.setContent(this.ref.content);
		infowindow.open(map, this);
	});

}

School.prototype.showMarker = function () {
	this.marker.setMap(map);
}

School.prototype.hideMarker = function () {
	this.marker.setMap(null);
}

School.prototype.focus = function () {
	map.panTo(new google.maps.LatLng(this.lat,this.lng));
	map.setZoom(14);

	infowindow.setContent(this.content);
	infowindow.open(map, this.marker);
}

/******************************************************************************************/

function City(city) {
	var r;
	this.schools = [];
	var path = "cityschools.php?city="+city;
	$.getJSON(path,

		function(data) {
			r = data;
		}
	)

	this.bounds  = new google.maps.LatLngBounds();

	for (var j=0; j<r.length; j++){
		this.schools.push(new School(r[j]));
		this.bounds.extend(new google.maps.LatLng(r[j].lat, r[j].lng));
	}
	this.cityname = city;
}

City.prototype.showMarker = function () {
	for (var i=0; i<this.schools.length; i++){
			this.schools[i].showMarker();
	}
}

City.prototype.hideMarker = function () {
	for (var i=0; i<this.schools.length; i++) {
			this.schools[i].hideMarker();
			this.schools[i].hideMarker();
	}
}

/******************************************************************************************/

loadcities = new Array();

city_list = {"臺北市":null,"新北市":null,"基隆市":null,"桃園縣":null,"新竹市":null,"新竹縣":null,"苗栗縣":null,"臺中市":null,"彰化縣":null,"南投縣":null,"雲林縣":null,"嘉義市":null,"嘉義縣":null,"臺南市":null,"高雄市":null,"屏東縣":null,"宜蘭縣":null,"花蓮縣":null,"臺東縣":null,"澎湖縣":null,"連江縣":null,"金門縣":null}

