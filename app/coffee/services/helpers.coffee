define [
  "jquery"
], ($) ->

  Helpers =

    $.makeObjectOfArray = (array) ->
      object = $()
      for x of array
        object = object.add(array[x])
      object