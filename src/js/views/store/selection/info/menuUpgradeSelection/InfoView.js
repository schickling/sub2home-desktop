define(["jquery", "underscore", "backbone", "views/store/selection/info/InfoBaseView", "text!templates/store/selection/info/menuUpgradeSelection/InfoTemplate.html"], function($, _, Backbone, InfoBaseView, InfoTemplate) {
  var InfoView;
  return InfoView = InfoBaseView.extend({
    template: _.template(InfoTemplate)
  });
});

/*
//@ sourceMappingURL=InfoView.js.map
*/