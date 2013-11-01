define ["services/imageSuffixer"], (imageSuffixer) ->

  describe "check imageSuffixer service", ->

    it "shouldn't fail for invalid file", ->
      expect(imageSuffixer.getClass "something").toBe("")

    it "should extract no suffix", ->
      expect(imageSuffixer.getClass "a/super/cool/file/path/noclass.jpg").toBe("")

    it "should extract suffix", ->
      expect(imageSuffixer.getClass "a/super/cool/file/path/image-firstclass.jpg").toBe("firstclass")