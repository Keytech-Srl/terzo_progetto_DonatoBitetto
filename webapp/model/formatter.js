sap.ui.define([], () => {
    "use strict";
	const formatter = {
		currency: (value) => {
			return Number(value).toFixed(2) + ' €';
		},
        discount: (value) => {
            return (Number(value) * 100).toFixed(2) + ' %';
        },
        invoiceTot: (quantity, price, discount) => {
            quantity = Number(quantity);
            price = Number(price);
            discount = Number(discount);
            let tot = (quantity * price * (1 - discount)).toFixed(2)
            return formatter.currency(tot);
        }
	};
	return formatter;
});
