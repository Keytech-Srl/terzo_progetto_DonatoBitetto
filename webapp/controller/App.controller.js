sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
	const controller = {
        toggleExpanded: function () {
            let sideNav = this.getView().byId("sideNav");
            sideNav.setExpanded(!sideNav.getExpanded());
        },

        navigate: function (route) {
            this.getOwnerComponent().getRouter().navTo(route);
        }
    };

	return Controller.extend("ui5.terzo_progetto.controller.App", controller);
});
