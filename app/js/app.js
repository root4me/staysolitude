$(document).foundation();


(function($) {
    var elements = [];
    var elementsOverlay = [];
    
    $.fn.scrollnfadeReinit = function(options) {
        elements.splice(0, elements.length);
        elementsOverlay.splice(0, elements.length);
    };
    
    $.fn.scrollnfade = function(options) {

        var settings = $.extend({
            // TBD
        }, options);

        var update = function() {
            var scrollPos = window.scrollY;
            var top = 0;
            var height = 0;
            var opacity = 0;
            var element = null;
            var elementOverlay = null;

            for (var i = 0; i < elements.length; i++) {
                element = elements[i];
                elementOverlay = elementsOverlay[i];
                top = element.offset().top;
                height = element.height();

                if (scrollPos > (top + height) || (scrollPos < top)) {
                    continue;
                }
                else {
                    opacity = 1 - ((scrollPos - top) / (height));
                    element.css('opacity', opacity);
                    elementOverlay.css('opacity', 1 - opacity);
                }
            }
        };

        var onScroll = function() {
            requestAnimationFrame(update);
        };

        var init = function(element) {
            window.addEventListener('scroll', onScroll, false);

            elements.push(element);

            // position overlays over image sections
            $(element.selector + '-overlay').offset({
                top: $(element.selector).offset().top,
                left: $(element.selector).offset().left
            });

            elementsOverlay.push($(element.selector + '-overlay'));
        };

        init(this);
    };

}(jQuery));


// Load google maps
//10.076751, 76.866077

jQuery(document).ready(function($) {
    //set your google maps parameters
   var latitude = 10.0902513,
        longitude = 76.9478139,
        map_zoom = 13;

    //google map custom marker icon - .png fallback for IE11
    var is_internetExplorer11 = navigator.userAgent.toLowerCase().indexOf('trident') > -1;
    // var marker_url = (is_internetExplorer11) ? 'http://www.clipartbest.com/cliparts/4Tb/4Bb/4Tb4Bbpjc.png' : 'http://www.clipartbest.com/cliparts/4Tb/4Bb/4Tb4Bbpjc.png';

    //define the basic color of your map, plus a value for saturation and brightness
    var main_color = '',
        saturation_value = -20,
        brightness_value = 5;

    //we define here the style of the map
    var style = [{
            //set saturation for the labels on the map
            elementType: "labels",
            stylers: [{
                saturation: saturation_value
            }]
        }, { //poi stands for point of interest - don't show these lables on the map 
            featureType: "poi",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }, {
            //don't show highways lables on the map
            featureType: 'road.highway',
            elementType: 'labels',
            stylers: [{
                visibility: "off"
            }]
        }, {
            //don't show local road lables on the map
            featureType: "road.local",
            elementType: "labels.icon",
            stylers: [{
                visibility: "off"
            }]
        }, {
            //don't show arterial road lables on the map
            featureType: "road.arterial",
            elementType: "labels.icon",
            stylers: [{
                visibility: "off"
            }]
        }, {
            //don't show road lables on the map
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "off"
            }]
        },
        //style different elements on the map
        {
            featureType: "transit",
            elementType: "geometry.fill",
            stylers: [{
                hue: main_color
            }, {
                visibility: "on"
            }, {
                lightness: brightness_value
            }, {
                saturation: saturation_value
            }]
        }, {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [{
                hue: main_color
            }, {
                visibility: "on"
            }, {
                lightness: brightness_value
            }, {
                saturation: saturation_value
            }]
        }, {
            featureType: "poi.government",
            elementType: "geometry.fill",
            stylers: [{
                hue: main_color
            }, {
                visibility: "on"
            }, {
                lightness: brightness_value
            }, {
                saturation: saturation_value
            }]
        }, {
            featureType: "poi.attraction",
            elementType: "geometry.fill",
            stylers: [{
                hue: main_color
            }, {
                visibility: "on"
            }, {
                lightness: brightness_value
            }, {
                saturation: saturation_value
            }]
        }, {
            featureType: "poi.business",
            elementType: "geometry.fill",
            stylers: [{
                hue: main_color
            }, {
                visibility: "on"
            }, {
                lightness: brightness_value
            }, {
                saturation: saturation_value
            }]
        }, {
            featureType: "transit",
            elementType: "geometry.fill",
            stylers: [{
                hue: main_color
            }, {
                visibility: "on"
            }, {
                lightness: brightness_value
            }, {
                saturation: saturation_value
            }]
        }, {
            featureType: "transit.station",
            elementType: "geometry.fill",
            stylers: [{
                hue: main_color
            }, {
                visibility: "on"
            }, {
                lightness: brightness_value
            }, {
                saturation: saturation_value
            }]
        }, {
            featureType: "landscape",
            stylers: [{
                hue: main_color
            }, {
                visibility: "on"
            }, {
                lightness: brightness_value
            }, {
                saturation: saturation_value
            }]

        }, {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [{
                hue: main_color
            }, {
                visibility: "on"
            }, {
                lightness: brightness_value
            }, {
                saturation: saturation_value
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{
                hue: main_color
            }, {
                visibility: "on"
            }, {
                lightness: brightness_value
            }, {
                saturation: saturation_value
            }]
        }, {
            featureType: "water",
            elementType: "geometry",
            stylers: [{
                hue: main_color
            }, {
                visibility: "on"
            }, {
                lightness: brightness_value
            }, {
                saturation: saturation_value
            }]
        }
    ];

    //set google map options
    var map_options = {
            center: new google.maps.LatLng(latitude, longitude),
            zoom: map_zoom,
            panControl: false,
            zoomControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: true,
            styles: style,
        }
        //inizialize the map
    var map = new google.maps.Map(document.getElementById('google-container'), map_options);
    //add a custom marker to the map				
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: map,
        visible: true,
        //icon: marker_url,
    });

    //add custom buttons for the zoom-in/zoom-out on the map
    function CustomZoomControl(controlDiv, map) {
        //grap the zoom elements from the DOM and insert them in the map 
        var controlUIzoomIn = document.getElementById('cd-zoom-in'),
            controlUIzoomOut = document.getElementById('cd-zoom-out');
        controlDiv.appendChild(controlUIzoomIn);
        controlDiv.appendChild(controlUIzoomOut);

        // Setup the click event listeners and zoom-in or out according to the clicked element
        google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
            map.setZoom(map.getZoom() + 1)
        });
        google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
            map.setZoom(map.getZoom() - 1)
        });
    }

    var zoomControlDiv = document.createElement('div');
    var zoomControl = new CustomZoomControl(zoomControlDiv, map);

    //insert the zoom div on the top left of the map
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
});