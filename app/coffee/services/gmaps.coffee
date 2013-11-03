# convert Google Maps into an AMD module
define ["async!https://maps.google.com/maps/api/js?v=3&sensor=false"], ->

  # return the gmaps namespace for brevity
  window.google.maps
