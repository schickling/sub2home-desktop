define ["underscore", "models/TooltipModel"], (_, TooltipModel) ->

  TooltipRepository =
    _items:

      default:
        text: "Ich bin ein Tooltip!"
        className: "info"

      # "views.home.home.input":
      #   text: "Hier funktionieren nur Zahlen"
      #   className: "warning"

      "views.header.client.config":
        text: "Stammdaten"
        className: "info"

      "views.header.client.dashboard":
        text: "Store-Übersicht"
        className: "info"

      "views.header.store.dashboard":
        text: "Bestellungen & Umsätze"
        className: "info"

      "views.header.store.assortment":
        text: "Sortiment-Einstellungen"
        className: "info"

      "views.header.store.config":
        text: "Store-Einstellungen"
        className: "info"

      "views.header.logout":
        text: "Logout"
        className: "info"

      "views.header.tray":
        text: "Hier gehts zum Tablett"
        className: "info"

      "views.store.dashboard.resendMail":
        text: "Erneut senden"
        className: "info left"

      "views.store.config.testOrder":
        text: "Testbestellung"
        className: "left"

      "views.store.dashboard.invoice.invoice":
        text: "Rechnung als PDF herunterladen"
        className: "info"

      "views.store.dashboard.invoice.attachment":
        text: "Anhang als PDF herunterladen"
        className: "info"

      "views.store.dashboard.checkallorders":
        text: "Alle Bestellungen abhaken"
        className: "info"

    getTooltipModel: (alias, data) ->
      item = @_items[alias] or @_items["default"]
      new TooltipModel(item)
