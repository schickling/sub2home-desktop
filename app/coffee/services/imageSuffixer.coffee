define ->

  ImageSuffixer =

    getClass: (filePath) ->
      imageWithoutFileExtension = filePath.substr(0, filePath.lastIndexOf("."))
      className = imageWithoutFileExtension.split("-").pop()
      if className isnt imageWithoutFileExtension
        className
      else
        ""