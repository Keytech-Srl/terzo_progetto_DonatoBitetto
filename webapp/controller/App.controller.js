sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
	const controller = {
        toggleExpanded: function () {
            let toolPage = this.getView().byId("toolPage");
            toolPage.setSideExpanded(!toolPage.getSideExpanded());
        },

        navigate: function (route) {
            this.getOwnerComponent().getRouter().navTo(route);
        }
    };

	return Controller.extend("ui5.terzo_progetto.controller.App", controller);
});
