function initialize() {
    var mapCanvas = document.getElementById('map');
    var mapOptions = {
        center: new google.maps.LatLng(46.2246867, 17.367),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#ffffff"
            }, {
                "weight": 1.4
            }]
        }, {
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#231652"
            }, {
                "lightness": -19
            }]
        }, {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#ffffff"
            }]
        }, {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
    "featureType": "road.local",
    "elementType": "labels.text.stroke",
    "stylers": [
        {
            "visibility": "off"
        },
        {
            "color": "#d40a0a"
        }
    ]
}, {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ffea00"
            }]
        }, {
            "featureType": "poi",
            "elementType": "labels.icon",
            "stylers": [{
                "weight": 1
            }, {
                "visibility": "on"
            }, {
                "hue": "#ff0000"
            }, {
                "saturation": 100
            }, {
                "lightness": -70
            }]
        }, {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "simplified"
            }, {
                "color": "#ffffff"
            }, {
                "weight": 3.4
            }]
        }]

    }
    var map = new google.maps.Map(mapCanvas, mapOptions);

    var contentString = '<div style="color:black">7500 Nagyatád, Árpád utca 35.<br>DÉFLEX Épületgépészeti Kft.</div>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    var image = '/images/favicon.ico';
    var marker = new google.maps.Marker({
        position: {
            lat: 46.224550,
            lng: 17.367300
        },
        map: map,
        icon: image,
        title: "Déflex"
    });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
    infowindow.open(map, marker);
}

google.maps.event.addDomListener(window, 'load', initialize);
