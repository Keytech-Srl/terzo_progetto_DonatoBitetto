### Indice:

- [Inizializzazione](#inizializzazione-di-un-progetto)
  - [ui5.yaml](#ui5yaml)
  - [manifest.json](#manifestjson)
  - [Librerie](#librerie)
  - [index.html](#indexhtml)
  - [Component.js](#componentjs)
  - [Avvio](#avvio)
- Risorse:
  - [UI5 Tooling](https://sap.github.io/ui5-tooling/v3/pages/GettingStarted/)
  - [Walkthrough](https://sapui5.hana.ondemand.com/#/topic/3da5f4be63264db99f2e5b04c5e853db)

---

# Inizializzazione

Nel caso in cui non si sia mai creato un progetto sul computer in uso, per prima cosa bisogna eseguire il comando che segue, altrimenti **si può iniziare direttamente dal passaggio successivo**:

`npm install --global @ui5/cli`

Una volta eseguito il comando precedente, possiamo inizializzare un nuovo progetto:

- creiamo una nuova cartella che conterrà il progetto
  - `mkdir ui5`
- posizioniamoci nella nuova cartella:
  - `cd ui5`
- inizializziamo **npm**:
  - `npm init -y`
  - questo comando creerà per noi il **_package.json_**
- infine, lanciamo il seguente comando:
  - `npm install --save-dev @ui5/cli`

A questo punto, dobbiamo generare il file **_ui5.yaml_** e creare il manifest.json.

## ui5.yaml

Per generare questo file:

- creaimo la cartella **webapp** nella cartella root del progetto
- lanciamo il comando `ui5 init`

## manifest.json

Questo file lo dobbiamo creare manualmente all'interno della cartella webapp.
Quindi, in webapp/manifest.json, aggiungiamo il seguente codice:

```json
{
	"_version": "1.58.0",
	"sap.app": {
		"id": "ui5.walkthrough"
	}
}
```

## Librerie

Ora possiamo sceglere il framework (OpenUI5 o SapUI5) che vogliamo utilizzare. Dato che utilizzeremo SapUI5, procediamo con il seguente comando:

- `ui5 use sapui5@latest`

Infine, aggiungiamo le librerie base al progetto:

- `ui5 add sap.ui.core sap.m themelib_sap_horizon`

## index.html

A questo punto, per poter far partire il progetto, abbiamo bisogno del file index.html, nella cartella webapp, da cui verrà generato tutto il progetto.

Pertanto, in `webapp/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>

		<script
			id="sap-ui-bootstrap"
			src="resources/sap-ui-core.js"
			data-sap-ui-theme="sap_horizon_dark"
			data-sap-iu-libs="sap.m"
			data-sap-ui-compat-version="edge"
			data-sap-ui-async="true"
			data-sap-ui-on-init="module:sap/ui/core/ComponentSupport"
			data-sap-ui-resource-roots='{
                "ui5.terzo_progetto": "./"
            }'></script>
	</head>
	<body class="sapUiBody" id="content">
		<div data-sap-ui-component data-name="ui5.terzo_progetto" data-id="container" data-settings='{"id" : "terzo_progetto"}'></div>
	</body>
</html>
```

**Note**:

- sostituire _**terzo_progetto**_ con il nome della cartella root attuale
- l'attributo **data-sap-ui-theme** indica il tema che vogliamo utilizzare. In precedenza, abbiamo aggiunto al progetto il tema horizon. Con l'aggiunta di **dark**, utilizzeremo la versione dark del tema in uso che viene aggiunto automaticamente quando abbiamo lanciato il precedente [comando](#librerie).

## Component.js

Il penultimo passaggio consiste nel creare il file Component.js dato che, nell'attributo **data-sap-ui-on-init**, abbiamo indicato che deve utilizzare il Component.js e non l'index.js.

Pertanto:

- in `webapp/Component.js`:

```javascript
sap.ui.define(["sap/ui/core/UIComponent"], (UIComponent) => {
	"use strict";
	return UIComponent.extend("ui5.terzo_progetto.Component", {
		metadata: {
			interfaces: ["sap.ui.core.IAsyncContentCreation"],
			manifest: "json",
		},
		init() {
			UIComponent.prototype.init.apply(this, arguments);
		},
	});
});
```

## Avvio

A questo punto siamo finalmente in grado di avviare il progetto:

- `ui5 serve -o index.html`

Questo comando farà partire il server locale che esegue il codice. Non appena lo lanceremo, ci verrà aperta automaticamente una tab del browser. Se vediamo una schermata blue scura vuol dire che tutto è andato a buon fine.

Se, ogni volta che riprendiamo a lavorare sul progetto o vogliamo semplicemente riavviare il server, non vogliamo lanciare il comando precedente ma solo **npm run dev** o **npm start**, andiamo a modificare il **package.json**:

```json
"scripts": {
    "dev": "ui5 serve -o index.html"
}
```

<p align="center">oppure</p>

```json
"scripts": {
    "start": "ui5 serve -o index.html"
}
```
