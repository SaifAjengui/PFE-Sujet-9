sap.ui.define([
	'./BaseController',
	'aymax/pfe/inventaire/model/formatter',
	"sap/ui/core/routing/History",
	// "sap/base/util/array",
], function(
	BaseController,
	formatter,
	History
) {
	"use strict";

	return BaseController.extend("aymax.pfe.inventaire.controller.Transfert", {
		formatter: formatter,
        onInit: function() {
		
		},

	
			
		
		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("home", {}, true);
			}
		},
	});
});