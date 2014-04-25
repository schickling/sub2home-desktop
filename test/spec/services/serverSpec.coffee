define ["services/server"], (server) ->

  describe "check server service", ->

    it "should map to subdomain in production", ->
      expect(server.getComposedUrl "articles", "sub2home.com").toBe "https://api.sub2home.com/articles"

    it "should map to port in development", ->
      expect(server.getComposedUrl "articles", "localhost").toBe "https://localhost:1070/articles"

    it "should map to port in development", ->
      expect(server.getComposedUrl "articles", "sub2home.dev").toBe "https://sub2home.dev:1070/articles"

    it "should adjust replace 'storeAlias'", ->
      server.setStoreAlias "test-store"
      expect(server.getComposedUrl "storeAlias/articles", "localhost").toBe "https://localhost:1070/test-store/articles"
      expect(server.getComposedUrl "storealias/articles", "localhost").toBe "https://localhost:1070/storealias/articles"

    it "should return full url", ->
      url = "http://www.google.com"
      expect(server.getComposedUrl url).toBe(url)