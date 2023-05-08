sap.ui.define([
	'./BaseController',
	"sap/ui/model/odata/v2/ODataModel",
	"sap/ui/core/util/MockServer",
	"sap/m/MessageToast",
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/core/syncStyleClass",
	"sap/ui/core/Fragment",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
	'aymax/pfe/inventaire/model/formatter',
	
], function (BaseController,ODataModel, MockServer, MessageToast, ResourceModel, syncStyleClass, Fragment,JSONModel, Filter, FilterOperator, formatter) {
	"use strict";
	return BaseController.extend("aymax.pfe.inventaire.controller.Modification", {
		formatter: formatter,
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

		onPress: function(oEvent) {
			var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("modificationExcel");
		},

	/*	MultiEdit2: function(oEvent) {


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
					groupId : "ImmobilisationSet",
					success: function(data, response){

						sap.m.MessageToast.show("Success"), {
							duration: 3000
						};
					}.bind(this),
					error: function(error){
						
					}.bind(this)
				});

			}  
			oModel.submitChanges({
				groupId : "ImmobilisationSet",

				success: function(){

					sap.m.MessageToast.show("Success"), {
						duration: 3000
					};
					}
				});
					},
*/

		

	MultiEdit: function(oEvent) {
		
		var oModel = this.getOwnerComponent().getModel();
	
		var items =  this.getView().byId('smartTable_ResponsiveTable1').getTable().getSelectedIndices();
		var row;  
		var itemObject;   
		var context; 
		var Anln1;
		var Anln2;
		for(var i = 0; i < items.length; i++){  
			row = items[i];  
			context  = {
				Bukrs: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Bukrs'),
				Anln1: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Anln1'),
				Anln2: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Anln2'),
				
				Txt50: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Txt50'),
				Menge: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Menge'),
				Lifnr: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Lifnr'),
				Aktiv: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Aktiv'),
				Urwrt: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Urwrt'),
				Kostl: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Kostl'),
				Werks: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Werks'),
				Gsber: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Gsber'),

			};
			if (context.Aktiv){
				context.Aktiv=formatter.DateFormat(context.Aktiv);
			}
			Anln1 = "0".repeat(12-context.Anln1.length) + context.Anln1;
			Anln2 = "0".repeat(4-context.Anln2.length) + context.Anln2;
			
			oModel.update("/ImmobilisationSet(Bukrs=" + "'"+context.Bukrs +"'"+','+"Anln1='"+Anln1 +"'"+','+"Anln2='"+Anln2 +"'"+ ")", context, {
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
	onFilter : function (oEvent) {
		// build filter array
		var aFilter = [], sQuery = this.byId("searchInput").getProperty("value"),
		// retrieve list control
		oList = this.getView().byId("smartTable_ResponsiveTable1"),
		// get binding for aggregation 'items'
		oBinding = oList.getTable().getBinding("items");
		if (sQuery) {
		aFilter.push(new Filter("Anln1", FilterOperator.Contains, sQuery));
		}
		// apply filter. an empty filter array simply removes the filter
		// which will make all entries visible again
		oBinding.filter(aFilter);
	},
	

	
		
	});
});