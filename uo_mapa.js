/**
 * @name uo_mapa support of google maps for urad.online
 * @version 0.1
 * @author Miloslav Stastny
 * @fileoverview
 * This library is a set of function to locate a point inside polygon boundaries
 * Finds position for an address or address when marker is dragged to new position.
 */
// variables to initiate the map
var mapsApiKey      = "AIzaSyAhhg0ljKmaF-isIHmF0uoFc1mDw-mEdfQ";
var googleMapApiUrl = "https://maps.googleapis.com/maps/api/js?v=3";
var mapsLanguage    = "CS";
var mapsRegion      = "CZ";
var defaultLatLng = {lat: 50.087, lng: 14.421};
var zoom = 12;
var allowScroll = true;
// variables for mapping form to map functions
var formMapID     = "MapaForm_MapaCanvas";
var formAddressID = "MapaForm_adresa";
var formLatID     = "MapaForm_LatValue";
var formLngID     = "MapaForm_LngValue";
var error_msg = {
    outOfBound: 'Adresa je mimo zadané hranice obce',
    addressNotFound: 'Adresa nebyla nalezena',
    noResult: 'Výsledek nebyl nalezen',
    geoCoderFail: 'Chyba Geo kóderu',
};
var mojeMapa;
var mapaMarker;
var mapaPolygonBoundaries = false;
// Polygon boundaries definition
var mapaBoundaries = [
  {"lat":50.092044 ,"lng":14.417925},
  {"lat":50.091979 ,"lng":14.498152},
  {"lat":50.053066 ,"lng":14.502950},
  {"lat":50.052607 ,"lng":14.417006}];
// mapaBoundaries = [];
var mapaBoundaries = [{"lng":14.4422918,"lat":50.094391},{"lng":14.4427738,"lat":50.0945095}, {"lng":14.443241,"lat":50.0946357}, {"lng":14.4439875,"lat":50.0948115}, {"lng":14.4448562,"lat":50.095045}, {"lng":14.4456323,"lat":50.0953232}, {"lng":14.4466131,"lat":50.0954975}, {"lng":14.4470418,"lat":50.0956027}, {"lng":14.4482325,"lat":50.0957138}, {"lng":14.4499971,"lat":50.0961105}, {"lng":14.4529226,"lat":50.0967528}, {"lng":14.4559717,"lat":50.0974295}, {"lng":14.457818,"lat":50.0978608}, {"lng":14.4593642,"lat":50.0982128}, {"lng":14.4608293,"lat":50.0987433}, {"lng":14.4616937,"lat":50.0991981}, {"lng":14.4626761,"lat":50.0998215}, {"lng":14.463575,"lat":50.1006975}, {"lng":14.4640674,"lat":50.1015278}, {"lng":14.4643029,"lat":50.1022251}, {"lng":14.4643455,"lat":50.102615}, {"lng":14.4644096,"lat":50.1029568}, {"lng":14.4644661,"lat":50.1032157}, {"lng":14.4656224,"lat":50.1032062}, {"lng":14.4664247,"lat":50.1032173}, {"lng":14.4668408,"lat":50.103194}, {"lng":14.4674714,"lat":50.1029471}, {"lng":14.4681535,"lat":50.1026638}, {"lng":14.4687176,"lat":50.1032407}, {"lng":14.4688695,"lat":50.1033898}, {"lng":14.4699993,"lat":50.1034128}, {"lng":14.4722161,"lat":50.1034106}, {"lng":14.4725405,"lat":50.103296}, {"lng":14.4732966,"lat":50.1033421}, {"lng":14.4732638,"lat":50.1035995}, {"lng":14.473231,"lat":50.1039326}, {"lng":14.4708325,"lat":50.1039216}, {"lng":14.4694284,"lat":50.1039295}, {"lng":14.4689953,"lat":50.1040027}, {"lng":14.4682364,"lat":50.1040013}, {"lng":14.4663494,"lat":50.1039643}, {"lng":14.4653959,"lat":50.1039308}, {"lng":14.4652343,"lat":50.1054195}, {"lng":14.4651186,"lat":50.1061415}, {"lng":14.4650029,"lat":50.1068635}, {"lng":14.4649534,"lat":50.1071469}, {"lng":14.4650367,"lat":50.1074041}, {"lng":14.465139,"lat":50.1074643}, {"lng":14.465365,"lat":50.1074195}, {"lng":14.4656454,"lat":50.1073852}, {"lng":14.4660503,"lat":50.1074505}, {"lng":14.4659189,"lat":50.1075709}, {"lng":14.4656211,"lat":50.1076242}, {"lng":14.4654227,"lat":50.1077791}, {"lng":14.4651169,"lat":50.108068}, {"lng":14.4649694,"lat":50.10813}, {"lng":14.464272,"lat":50.1087079}, {"lng":14.4632397,"lat":50.1094953}, {"lng":14.4627076,"lat":50.1098862}, {"lng":14.4624736,"lat":50.1100961}, {"lng":14.4617695,"lat":50.1105847}, {"lng":14.4610627,"lat":50.110933}, {"lng":14.4603452,"lat":50.1106345}, {"lng":14.4591276,"lat":50.1117818}, {"lng":14.4578857,"lat":50.1125404}, {"lng":14.4573332,"lat":50.1127468}, {"lng":14.4559679,"lat":50.113139}, {"lng":14.4549701,"lat":50.1132164}, {"lng":14.4548468,"lat":50.1131906}, {"lng":14.4547663,"lat":50.1131476}, {"lng":14.4547717,"lat":50.1130753}, {"lng":14.4548012,"lat":50.1130048}, {"lng":14.4548146,"lat":50.112936}, {"lng":14.4548494,"lat":50.1128724}, {"lng":14.4549219,"lat":50.1128104}, {"lng":14.4557614,"lat":50.112518}, {"lng":14.4564561,"lat":50.1122136}, {"lng":14.4575772,"lat":50.1116477}, {"lng":14.4581271,"lat":50.1112434}, {"lng":14.4589854,"lat":50.1105399}, {"lng":14.4594092,"lat":50.1101581}, {"lng":14.4601951,"lat":50.1092498}, {"lng":14.4607476,"lat":50.108431}, {"lng":14.4611762,"lat":50.1076001}, {"lng":14.4612144,"lat":50.1074643}, {"lng":14.4612922,"lat":50.1071933}, {"lng":14.4613707,"lat":50.1069129}, {"lng":14.4614464,"lat":50.1065985}, {"lng":14.4615296,"lat":50.1062347}, {"lng":14.461545,"lat":50.1060536}, {"lng":14.4615348,"lat":50.1058671}, {"lng":14.4614878,"lat":50.1052814}, {"lng":14.461417,"lat":50.1048124}, {"lng":14.4612923,"lat":50.104326}, {"lng":14.461254,"lat":50.1041711}, {"lng":14.4611568,"lat":50.1037823}, {"lng":14.4610435,"lat":50.1034873}, {"lng":14.4609784,"lat":50.103381}, {"lng":14.4609074,"lat":50.1032963}, {"lng":14.460847,"lat":50.1032034}, {"lng":14.4608188,"lat":50.1031359}, {"lng":14.4607515,"lat":50.1027726}, {"lng":14.4605288,"lat":50.1023683}, {"lng":14.459987,"lat":50.1017627}, {"lng":14.4599334,"lat":50.101656}, {"lng":14.4597832,"lat":50.1014668}, {"lng":14.4593482,"lat":50.1009961}, {"lng":14.4581036,"lat":50.1001015}, {"lng":14.4562744,"lat":50.099138}, {"lng":14.45459,"lat":50.0984945}, {"lng":14.4534205,"lat":50.0980196}, {"lng":14.4521599,"lat":50.0976101}, {"lng":14.4510548,"lat":50.0973348}, {"lng":14.4508402,"lat":50.097328}, {"lng":14.4507651,"lat":50.0973108}, {"lng":14.450572,"lat":50.0972153}, {"lng":14.4493167,"lat":50.0967808}, {"lng":14.4466882,"lat":50.0960169}, {"lng":14.4455563,"lat":50.095542}, {"lng":14.4445944,"lat":50.0951843}, {"lng":14.4440821,"lat":50.0950264}, {"lng":14.4438528,"lat":50.0949595}, {"lng":14.4435779,"lat":50.0948909}, {"lng":14.442737,"lat":50.0947334}, {"lng":14.4420771,"lat":50.0946586}, {"lng":14.4414428,"lat":50.0945871}, {"lng":14.4403397,"lat":50.0945011}, {"lng":14.4397936,"lat":50.0944599}, {"lng":14.4392434,"lat":50.0944229}, {"lng":14.4381873,"lat":50.0943278}, {"lng":14.4372666,"lat":50.0942439}, {"lng":14.4372888,"lat":50.0941247}, {"lng":14.4373012,"lat":50.0940789}, {"lng":14.4374951,"lat":50.094093}, {"lng":14.4375778,"lat":50.094041}, {"lng":14.437977,"lat":50.0940751}, {"lng":14.438906,"lat":50.0941556}, {"lng":14.4390204,"lat":50.0942096}, {"lng":14.439834,"lat":50.0942866}, {"lng":14.439927,"lat":50.0942915}, {"lng":14.4400495,"lat":50.0942562}, {"lng":14.4400861,"lat":50.0942553}, {"lng":14.4411894,"lat":50.0943533}, {"lng":14.4412502,"lat":50.0943498}, {"lng":14.4413968,"lat":50.0943113}, {"lng":14.4414683,"lat":50.0943038}, {"lng":14.4417348,"lat":50.0943265}, {"lng":14.441929,"lat":50.0943349}, {"lng":14.4421125,"lat":50.0943364}, {"lng":14.4422918,"lat":50.094391}];

document.addEventListener("DOMContentLoaded", initdocument);

function initdocument() {
  if ( document.getElementById( formMapID )) {
    // Check if Google maps API is loaded
    if (typeof google == "undefined") {
      loadGoogleMapApi();
    } else {
        defineFormListenersOnLoad();
    }
  }
}

function defineFormListenersOnLoad()
{
    google.maps.event.addDomListener(window, 'load', mojeMapaPreInit);
}
function mojeMapaPreInit() {
    "use strict";
    if ( document.getElementById( formLatID ) && document.getElementById( formLatID ).value > 0 ) {
      var lat = parseFloat(document.getElementById( formLatID ).value);
      var lng = parseFloat(document.getElementById( formLngID ).value);
    } else {
      var lat = defaultLatLng.lat;
      var lng = defaultLatLng.lng;
    }

    mojeMapaInitializeMap(lat, lng, formMapID, true, zoom, allowScroll, mapaBoundaries);
    mojeMapaFindAddress( false, lat, lng);
}

function mojeMapaFindAddress( reverse, lat, lng) {
    "use strict";

    var geo = new google.maps.Geocoder();
    var latLng = new google.maps.LatLng(lat, lng);

    // This runs when typing an address to the Places - address search bar
    if (reverse) {

        var address = document.getElementById( formAddressID ).value;
        geo.geocode( { 'address': address}, function(results, status) {

            var string;

            // If address is set up inside the bounds, from the settings panel,
            // then the initial values are always set correctly.
            if (status == google.maps.GeocoderStatus.OK) {

                if (mapaPolygonBoundaries) {

                    // Check for boundaries
                    if (google.maps.geometry.poly.containsLocation(results[0].geometry.location, mapaPolygonBoundaries)) {

                        mojeMapa.setCenter(results[0].geometry.location);

                        mapaMarker.setPosition(results[0].geometry.location);

                        string = results[0].geometry.location.toString();
                        string = string.slice(1,-1).split(',');

                        setFormInputsValue(results[0].formatted_address, parseFloat(string[0]), parseFloat(string[1]) );

                    } else {

                        alert(error_msg.outOfBound);
                    }

                } else {

                    mojeMapa.setCenter(results[0].geometry.location);

                    mapaMarker.setPosition(results[0].geometry.location);

                    string = results[0].geometry.location.toString();
                    string = string.slice(1,-1).split(',');

                    setFormInputsValue(results[0].formatted_address, parseFloat(string[0]), parseFloat(string[1]) );

                }

            }
            else {

                document.getElementById( formAddressID ).value = error_msg.addressNotFound;
                console.log(status);
            }
        });
    }

    // This runs when dragging the marker
    else {
        geo.geocode({'latLng': latLng}, function(results, status) {

            if (status === google.maps.GeocoderStatus.OK) {
                if (results[0]) {

                    if (mapaPolygonBoundaries) {


                        // if (google.maps.geometry.poly.containsLocation(results[0].geometry.location, mapaPolygonBoundaries)) {
                        if (google.maps.geometry.poly.containsLocation(latLng, mapaPolygonBoundaries)) {

                            setFormInputsValue(results[0].formatted_address, lat, lng );

                            // We need to move the marker to last known position, and keep our previous values too.
                        } else {
                            alert(error_msg.outOfBound);
                            var previousAddress = document.getElementById( formAddressID ).value;
                            var previousLat = document.getElementById( formLatID ).value;
                            var previousLng = document.getElementById( formLngID ).value;
                            var previousLatLng = new google.maps.LatLng(previousLat, previousLng);

                            geo.geocode( { 'latLng': previousLatLng }, function(results, status) {
                                if (status == google.maps.GeocoderStatus.OK) {
                                    mapaMarker.setPosition(previousLatLng);
                                } else {

                                    document.getElementById( formAddressID ).value = error_msg.addressNotFound;
                                    console.log(status);
                                }
                            });
                        }
                    } else {
                        setFormInputsValue(results[0].formatted_address, lat, lng );
                    }
                }
                else {
                    document.getElementById( formAddressID ).value = error_msg.noResults;
                    console.log(status);
                }
            }
            else {
                document.getElementById( formAddressID ).value = error_msg.geoCoderFail;
                console.log(status);
            }
        });
    }
}
function mojeMapaInitializeMap(lat, lng, mapElemId, draggable, zoom, allowScroll, mapaBounderiesCoords) {
    "use strict";

    var latlng = new google.maps.LatLng(lat, lng);

    var options = {
        zoom: zoom,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    mojeMapa = new google.maps.Map(document.getElementById(mapElemId), options);

    mapaMarker = new google.maps.Marker({
        position: latlng,
        draggable: draggable,
        map: mojeMapa
    });

    mojeMapa.setCenter(mapaMarker.position);

    // If mapaBounderiesCoords are set, draw and handle boundaries
    if (mapaBounderiesCoords) { mapaDrawBoundaries(mojeMapa, mapaBounderiesCoords); }

    if (draggable) {

        var input = /** @type {!HTMLInputElement} */(
            document.getElementById( formAddressID ));

        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', mojeMapa);

        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            var place = autocomplete.getPlace();

            if (place.formatted_address) {
                document.getElementById( formAddressID ).value = place.formatted_address;
            }
            mojeMapaFindAddress(true);
        });

        google.maps.event.addListener(mapaMarker, 'dragend', function (e) {
            var lat = e.latLng.lat();
            var lng = e.latLng.lng();

            mojeMapaFindAddress(false, lat, lng);
        });


        if (document.getElementById('browserLocateButton')) {
            document.getElementById('browserLocateButton').addEventListener("click", function(e) {

                // Try HTML5 geolocation.
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        var pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };

                        mojeMapaFindAddress( false, pos.lat, pos.lng);
                        mapaMarker.setPosition(pos);

                    });
                } else {
                    // Browser doesn't support Geolocation
                    alert("Browser does not support Geolocation");
                }
            });
        }


        // Run geocoding on Enter
        document.getElementById( formAddressID ).addEventListener("keydown", function(e) {

            if (e.key === 'Enter') {  //checks whether the pressed key is "Enter"
                e.preventDefault();
            }
        });
    }
}
function mapaDrawBoundaries(map, polygons) {
    "use strict";

    if (mapaPolygonBoundaries) {
        mapaPolygonBoundaries.setMap(null);
    }
    if (polygons.length > 0) {
      mapaPolygonBoundaries = new google.maps.Polygon({
        strokeColor: '#FF0000',
        strokeOpacity: 0.6,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.2
      });

      mapaPolygonBoundaries.setPaths(polygons);
      mapaPolygonBoundaries.setMap(map);
    }

}

function loadGoogleMapApi()
{
    var srcUrl = googleMapApiUrl+'&key='+mapsApiKey+'&language='+mapsLanguage+'&region='+mapsRegion+'&libraries=places,geometry';
    var script = document.createElement("script");
    script.src = srcUrl;
    script.type = 'text/javascript';
    script.onload = googleApiScriptLoaded;
    document.head.appendChild(script);
}
function googleApiScriptLoaded()
{
  defineFormListenersOnLoad();
}
/**
 * setFormInputsValue v0.1 sets values of form input elements
 * @param address , gps coordinates lat , lng
 */
 function setFormInputsValue(address, lat, lng ) {
  if (document.getElementById( formAddressID )) {
    document.getElementById( formAddressID ).value = address;
  }
  document.getElementById( formLatID ).value = lat;
  document.getElementById( formLngID ).value = lng;
}
