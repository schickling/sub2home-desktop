define ["underscore"], (_) ->

  describe "just checking", ->

    it "works for underscore", ->

      expect(_.size([1, 2, 3])).toEqual 3
