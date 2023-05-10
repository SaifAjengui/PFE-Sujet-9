sap.ui.define([
	'./BaseController',
	"sap/ui/model/json/JSONModel",
	'aymax/pfe/inventaire/model/formatter',
	
], function (BaseController,JSONModel,formatter) {
	"use strict";
	return BaseController.extend("aymax.pfe.inventaire.controller.ModificationHome", {
		formatter: formatter,
		onInit : function () {
			
			
			
		},

		
		handleEditPress : function (oEvent) {
			var oTileContainer = this.byId("container"),
				bEditable = !oTileContainer.getEditable();

			oTileContainer.setEditable(bEditable);
			oEvent.getSource().setText(bEditable ? "Done" : "Edit");
		},



        onUpdateExcel : function (oEvent) {
            var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("modificationexcel");
			
		},
        onUpdateSimpel : function (oEvent) {
            var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("modification");
		},



        
		
		
	});
});