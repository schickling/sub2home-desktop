define ["services/server"], (server) ->

  describe "check server service", ->

    it "should consult subdomain", ->
      expect(server.getComposedUrl "articles", "localhost").toBe "https://localhost:1070/articles"

    it "should adjust replace 'storeAlias'", ->
      server.setStoreAlias "test-store"
      expect(server.getComposedUrl "storeAlias/articles", "localhost").toBe "https://localhost:1070/test-store/articles"
      expect(server.getComposedUrl "storealias/articles", "localhost").toBe "https://localhost:1070/storealias/articles"

    it "should return full url", ->
      url = "http://www.google.com"
      expect(server.getComposedUrl url).toBe(url)