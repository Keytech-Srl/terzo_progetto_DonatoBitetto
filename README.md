# Indice:

- [Inizializzazione](#inizializzazione-di-un-progetto)
  - [ui5.yaml](#ui5yaml)
  - [manifest.json](#manifestjson)
  - [Librerie](#librerie)
  - [index.html](#indexhtml)
  - [Component.js](#componentjs)
  - [Avvio](#avvio)
  - [Root view](#root-view)
- [Navigazione](#navigation)
  - [Routing](#routing)
- Risorse:
  - [UI5 Tooling](https://sap.github.io/ui5-tooling/v3/pages/GettingStarted/)
  - [Walkthrough](https://sapui5.hana.ondemand.com/#/topic/3da5f4be63264db99f2e5b04c5e853db)
  - [Side navbar](https://sapui5.hana.ondemand.com/#/entity/sap.tnt.SideNavigation/sample/sap.tnt.sample.SideNavigation/code)
  - [TNT Layout](https://sapui5.hana.ondemand.com/#/api/sap.tnt.ToolPage%23controlProperties)
  - [Flex Columns](https://sapui5.hana.ondemand.com/#/entity/sap.f.FlexibleColumnLayout)
  - [Form Validations](https://sapui5.hana.ondemand.com/#/entity/sap.m.Input/sample/sap.m.sample.InputChecked/code)

<br>
<br>
<br>

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

<br>
<br>
<br>
<br>

---

# Root view

Una volta che abbiamo inizializzato correttamente il progetto, possiamo procedere con la creazione della prima vista. Attualmente, infatti, nel browser stiamo visualizzando l'index.html che è vuoto.
Dato che dobbiamo realizzare una SPA, dobbiamo creare la vista che conterrà le varie pagine tra le quali l'utente protrà navigare. Quindi ci serve una vista root.

Pertanto, creamola in webapp/view, chiamandola App.view.xml e conterrà per il momento:

```xml
<mvc:XMLView xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m">
    <Text text="Ciao" />
</mvc:XMLView>
```

A questo punto, se ricarichiamo la pagine del browser, ci aspetteremmo di vedere la scritta "Ciao".
Questo non accade perchè non abbiamo indicato in nessun modo a UI5 qual'è la vista root. Per farlo, dobbiamo sfruttare il manifest.json:

```json
"sap.ui5": {
	"rootView": {
		"viewName": "ui5.terzo_progetto.view.App",
		"type": "XML"
	}
}
```

Se ricaricando la pagina, apparirà la scritta, vuol dire che abbiamo fatto tutto correttamente.

In questo progetto, utilizzeremo la vista App come layout, pertanto inseriremo la navbar laterale.

<br>
<br>
<br>

---

# Navigation

## Side navbar

La barra di navigazione latarele sarà implementata attraverso la libreria tnt.
Per poter utilizzare altre librerie, bisognerà seguire i seguenti passaggi:

- aggiungerle al ui5.yaml tramite il seguente comando: `ui5 add sap.tnt`
- importarle nella vista in cui le utilizzermo:

```xml
<mvc:XMLView
	xmlns:mvc="sap.ui.core.mvc"
	xmlns="sap.m"
	xmlns:tnt="sap.tnt">

	<tnt:SideNavigation>
		...
	</tnt:SideNavigation>

	<App id="app" />
</mvc:XMLView>
```

**Note**:

- quando si aggiungono nuove librerie modificando l'ui5.yaml, bisogna riavviare sempre il server per applicare effettivamente le modifiche
- il tag `App` è il placehoder che verrà sostituito dalla vista che verrà associata alla rotta attuale, cose che vederemo [qui](#routing).

## Expanded toggle

Per gestire lo stato expanded della sidebar, dobbiamo gestire la logica manualmente. La logica delle nostre viste deve essere gesita nel controller associato alla vista dato che UI5 utilizza il pattern MVC.

Per poter associare un controller alla vista:

- creiamo il controller nella cartella webapp/controller e lo chiameremo [nomeVista].controller.js. In questo caso sarà: `App.controller.js`:

```javascript
sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
	const controller = {};

	return Controller.extend("ui5.terzo_progetto.controller.App", controller);
});
```

- colleghiamo il controllore con la vista `App.view.xml`:

```xml
<mvc:XMLView
	...
	controllerName="ui5.terzo_progetto.controller.App">

</mvc:XMLView>
```

## Routing

Ora che abbiamo una barra di navigazione, diamo la possibilità all'utente di poter navigare fra varie pagine. Per poter far ciò bisogna sfruttare il routing, cosa presente in qualsiasi framework.

Esso viene **gestito tramite il manifest.json**:

```json
{
	...
	"sap.ui5": {
		...
		"routing": {
			"config": {
				"routerClass": "sap.m.routing.Router",
				"type": "View",
				"viewType": "XML",
				"path": "ui5.terzo_progetto.view",
				"controlId": "app",
				"controlAggregation": "pages",
				"transition": "slide",
				"async": true
			},
			"routes": [
				{
					"name": "home",
					"pattern": "",
					"target": "home"
				},
				{
					"name": "orders",
					"pattern": "orders",
					"target": "orders"
				}
			],
			"targets": {
				"home": {
					"id": "home",
					"name": "Home"
				},
				"orders": {
					"id": "orders",
					"name": "OrderList"
				}
			}
		}
	}
}
```

Con questo esempio, **abbiamo dichiarato due rotte**:

- una che ha come uri "/", indicato nella proprieta `routes`, a cui corrisposnde la vista `Home.view.xml` indicato nella proprieta `targets`
- una che ha come uri "/orders", indicato nella proprieta `routes`, a cui corrisposnde la vista `OrderList.view.xml` indicato nella proprieta `targets`

Però, questo non basta, infatti dobbiamo tornare nel [Component.js](#componentjs) e inizializzare il router aggiungendo nel metodo `onInit`, il seguente comando:

```javascript
this.getRouter().initialize();
```

---

# oData

Se siamo arrivati a questo punto, probabilmente, il notro obiettivo attuale sarà quello di visualizzare dei dati. Per il momento, useremo dei dati esterni, provenienti dal seguente link: [Northwind](https://services.odata.org/V2/Northwind/Northwind.svc/).

Per poter comunicare con un servizio esterno, in questo caso utilizzeremo una proxy. Pertanto:

- installiamo il relativo pacchetto: `npm i -D ui5-middleware-simpleproxy`
- aggiungiamo manualmente al `ui5.yaml` con il quale specifichiamo il servizio che utilizzermo per fetchare i dati e la versione degli oData che desideriamo utilizzare:

```yaml
server:
  customMiddleware:
    - name: ui5-middleware-simpleproxy
      afterMiddleware: compression
      mountPath: /V2
      configuration:
        baseUri: "https://services.odata.org"
```
- registriamo nel `manifest.json` il nuovo modello e la relativa origine. **Nota**: registriamo il modello nel manifest.json nel momento in cui vogliamo che esso sia accessibile da qualsiasi vista
```json
{
	...
	"sap.app": {
		"id": "ui5.walkthrough",
		"dataSources": {
			"northwind": {
				"uri": "V2/Northwind/Northwind.svc/",
				"type": "OData",
				"settings": {
					"odataVersion": "2.0"
				}
			}
		}
	},
	"sap.ui5": {
		...
		"models": {
			"": {
				"dataSource": "northwind"
			}
		}
	}
}
```
