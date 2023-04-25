sap.ui.define([
	'./BaseController',
	"sap/ui/model/odata/v2/ODataModel",
	"sap/ui/core/util/MockServer",
	"sap/m/MessageToast",
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/core/syncStyleClass",
	"sap/ui/core/Fragment",
	"sap/ui/model/json/JSONModel"
	
], function (BaseController,ODataModel, MockServer, MessageToast, ResourceModel, syncStyleClass, Fragment,JSONModel) {
	"use strict";
	return BaseController.extend("aymax.pfe.inventaire.controller.Modification", {
		

		onInit: function() {
			var oModel = this.getView().getModel();
			var sSet = "/" + "ImmobilisationSet";
			oModel.read(sSet, {
				success: function (oData) {
					var oModelMNA = new JSONModel();
					oModelMNA.setData(oData.results);
					this.getView().setModel(oModelMNA, "oModelMNA");
				}.bind(this),
				error: function (oResponse) {
					sap.m.MessageToast.show("oData fetching failed");
				}
			});
		},

		onInitialise: function (oEvent) {

			var oTable = oEvent.getSource().getTable();
			var aColumns = oTable.getColumns();

			for (var i = 0; i < aColumns.length; i++) {
				var sPath = "oModelMNA>" + aColumns[i].data("p13nData").columnKey;
				aColumns[i].getTemplate().getDisplay().bindText(sPath);
				aColumns[i].getTemplate().getEdit().bindValue(sPath);
			}

			oTable.bindRows("oModelMNA>/");
		},
		
		
	});
});