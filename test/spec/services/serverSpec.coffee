define ["services/server"], (server) ->

  describe "check server service", ->

    host = "sub2home.dev"

    it "should consult subdomain", ->
      expect(server.getComposedUrl "articles", host).toBe "https://api.#{host}/articles"

    it "should adjust replace 'storeAlias'", ->
      server.setStoreAlias "test-store"
      expect(server.getComposedUrl "storeAlias/articles", host).toBe "https://api.#{host}/test-store/articles"
      expect(server.getComposedUrl "storealias/articles", host).toBe "https://api.#{host}/storealias/articles"

    it "should return full url", ->
      url = "http://www.google.com"
      expect(server.getComposedUrl url).toBe(url)