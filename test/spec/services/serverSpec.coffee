define ["services/server"], (server) ->

  describe "check server service", ->

    prefix = "/api/frontend"

    it "should prepend api prefix", ->
      expect(server.getComposedUrl "articles").toBe("#{prefix}/articles")

    it "should adjust replace 'storeAlias'", ->
      server.setStoreAlias "test-store"
      expect(server.getComposedUrl "storeAlias/articles").toBe("#{prefix}/test-store/articles")
      expect(server.getComposedUrl "storealias/articles").toBe("#{prefix}/storealias/articles")

    it "should return full url", ->
      url = "http://www.google.com"
      expect(server.getComposedUrl url).toBe(url)