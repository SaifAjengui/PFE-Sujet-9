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
			
			var oModel = this.getOwnerComponent().getModel();
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
			//console.log(oModel);

			
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
		

	MultiEdit: function(oEvent) {
		
		var oModel = this.getOwnerComponent().getModel();
	
		var items =  this.getView().byId('smartTable_ResponsiveTable1').getTable().getSelectedIndices();
		var row;  
		var itemObject;   
		var context; 
		for(var i = 0; i < items.length; i++){  
			row = items[i];  
			context  = {
				Bukrs: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Bukrs'),
				Anln1: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Anln1'),
				Anln2: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Anln2'),
				Anlkl: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Anlkl'),
				Txt50: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Txt50')

			};

			oModel.update("/ImmobilisationSet(Bukrs=" + "'"+context.Bukrs +"'"+','+"Anln1='000000"+context.Anln1 +"'"+','+"Anln2='000"+context.Anln2 +"'"+ ")", context, {
				success: function(data, response){
					sap.m.MessageToast.show("Success"), {
						 duration: 3000
					 };
				}.bind(this),
				error: function(error){
					
				}.bind(this)
			});

		}  

		  var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("consultation");
		
	
		
	},
		
	});
});