define ["gmaps"], (gmaps) ->
  "use strict"

  geocoder = new gmaps.Geocoder()

  PostalOracle =

    shouldBeCanceled: false

    calculate: (successCallback, errorCallback) ->
      self = this

      unless navigator.geolocation
        errorCallback()
        return

      @shouldBeCanceled = false

      navigator.geolocation.getCurrentPosition ((position) ->
        return if self.shouldBeCanceled
        latLng = new gmaps.LatLng(position.coords.latitude, position.coords.longitude)
        geocoder.geocode
          latLng: latLng, (results, status) ->

            return  if self.shouldBeCanceled

            if status is gmaps.GeocoderStatus.OK
              # parse results for postal
              for addressComponent in results[0].address_components
                for type in addressComponent.types
                  if type is "postal_code"
                    postal = addressComponent.long_name
                    break

              if postal < 10000 or postal > 99999
                errorCallback()
              else
                self.setPostal postal
                successCallback()
            else
              errorCallback()

      ), errorCallback, timeout: 10000

    cancel: ->
      @shouldBeCanceled = true

    setPostal: (postal) ->
      localStorage.setItem "postal", postal

    getPostal: ->
      localStorage.getItem "postal"

  PostalOracle
