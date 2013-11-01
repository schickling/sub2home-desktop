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
        className: "info header"

      "views.header.store.dashboard":
        text: "Bestellungen & Umsätze"
        className: "info header"

      "views.header.store.assortment":
        text: "Sortiment-Einstellungen"
        className: "info header"

      "views.header.store.config":
        text: "Store-Einstellungen"
        className: "info header"

      "views.header.logout":
        text: "Logout"
        className: "info header"

      "views.header.tray":
        text: "Hier gehts zum Tablett"
        className: "info header"

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

      "views.store.tray.invalid":
        text: "Falsche Eingabe"
        className: "warning"

    getTooltipModel: (alias, data) ->
      item = @_items[alias] or @_items["default"]
      new TooltipModel(item)
