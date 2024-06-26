sap.ui.define(["sap/ui/core/mvc/Controller", "../model/formatter"], (Controller, formatter) => {
	const controller = {
		formatter: formatter,
		editModal: undefined,

		onPress: function (orderID) {
			/* 
                Questo metodo funziona solo se i dati sono stati fetchati in precedenza con un expand, 
				quindi sono già presenti nel modello
            */

			/* 
				let order = oModel.getProperty(`/Orders(${orderID})`);
		   		order.Customer =  oModel.getProperty(`/Orders(${orderID})/Customer`);
		   		order.Products =  oModel.getProperty(`/Orders(${orderID})/Order_Details`);
		   		let orderModel = new JSONModel(order);
		   		this.getView().setModel(orderModel, "Order"); 
		   */

			/* 
				Questo metodo funziona anche se i dati NON sono stati fetchati in precedenza perchè 
				fetcha i nuovi dati ogni volta
			*/

			/* 
			oModel.read(`/Orders(${orderID})`, {
				success: function (data) {
					let orderModel = new JSONModel(data);
					this.getView().setModel(orderModel, "Order");
				
					this.getView().byId("flexibleColumnLayout").setLayout("TwoColumnsMidExpanded");
				}.bind(this),
			}); 
			*/

			/* 
				Questo metodo è simile a quello di sopra ma con una sintassi più breve
			*/

			this.getView().bindElement({
				path: `/Orders(${orderID})`,
			});

			const oModel = this.getView().getModel();
			const data = oModel.getProperty(`/Orders(${orderID})/Order_Details`);
			const tot = data.reduce((acc, order_detail) => {
				let detail = oModel.getProperty(`/${order_detail}`);
				return acc + detail.UnitPrice * detail.Quantity * (1 - detail.Discount);
			}, 0);
			this.getView().byId("tot").setText(formatter.currency(tot));

			this.getView().byId("flexibleColumnLayout").setLayout("TwoColumnsMidExpanded");
		},

		closeMidleColumn: function () {
			this.getView().byId("flexibleColumnLayout").setLayout("OneColumn");
		},

		openEditCustomerModal: async function () {
			this.editModal ??= await this.loadFragment({ name: "ui5.terzo_progetto.view.EditCustomerModal" });
			this.editModal.open();
		},
		closeEditCustomerModal: function () {
			this.editModal.close();
		},
		saveCustomer: function () {
			this.editModal.close();
		},
	};

	return Controller.extend("ui5.terzo_progetto.controller.OrderList", controller);
});
