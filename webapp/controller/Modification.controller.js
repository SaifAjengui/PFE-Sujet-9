sap.ui.define([
	'./BaseController',
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
	'aymax/pfe/inventaire/model/formatter',
	"sap/ui/core/routing/History",
	
], function (BaseController,JSONModel, Filter, FilterOperator, formatter,History) {
	"use strict";
	var type;
	var msg1;
	var msg2;
	var msg3;
	var msg4;
	let TimeStmp = new Date().getTime();
	var contextHeaderToItem=
				{
					Extnumber  : "Modification",
					Object     : "ZFLE",
					Subobject  : "ZFLE001",
					TimeStmp   : "\/Date("+TimeStmp+")\/",
					HeaderToItem:[]
				}
	return BaseController.extend("aymax.pfe.inventaire.controller.Modification", {
		formatter: formatter,
		onInit: function() {
			this._oSmartFilterBar = this.byId("smartFilterBar");
			this._oCustomMultiComboBoxSociete = this.byId("multiComboBoxSociete");
			this._oCustomMultiComboBoxpays = this.byId("multiComboBoxPays");
			this._oCustomMultiComboBoxFournisseur = this.byId("multiComboBoxFournisseur");
			this._oCustomMultiComboBoxCategorie = this.byId("multiComboBoxCategorie");
			this._oCustomMultiComboBoxCentreDeCout = this.byId("multiComboBoxCentreDeCout");
			this._oCustomMultiComboBoxDomaineActivite = this.byId("multiComboBoxDomaineActivite");
			this._oCustomMultiComboBoxCritereDeTri = this.byId("multiComboBoxCritereDeTri");

			var oModelSociete = this.getOwnerComponent().getModel();
			var oModelPays = this.getOwnerComponent().getModel();
			var oModelFournisseur = this.getOwnerComponent().getModel();
			var oModelCategorie = this.getOwnerComponent().getModel();
			var oModelCentreDeCout = this.getOwnerComponent().getModel();
			var oModelDomaineActivite = this.getOwnerComponent().getModel();
			var oModelCritereDeTri = this.getOwnerComponent().getModel();

			var sSetSociete = "/" + "SocieteSet";
			var sSetPays="/"+ "PaysSet";
			var sSetFournisseur="/"+ "FournisseurSet";
			var sSetCategorie="/"+ "categorieSet";
			var sSetCentreDeCout="/"+ "CentreDeCoutSet";
			var sSetDomaineActivite="/"+ "DomaineActiviteSet";
			var sSetCritereDeTri="/"+ "StatutImmoSet";

			oModelSociete.read(sSetSociete, {
				success: function (oData) {
					var oModelMNASociete = new JSONModel();
					oModelMNASociete.setData(oData.results);
					this.getView().setModel(oModelMNASociete, "oModelMNASociete");
				}.bind(this),
				error: function (oResponse) {
					sap.m.MessageToast.show("oData fetching failed");
				}
			});

			oModelPays.read(sSetPays, {
				success: function (oData) {
					var oModelMNAPays = new JSONModel();
					oModelMNAPays.setData(oData.results);
					this.getView().setModel(oModelMNAPays, "oModelMNAPays");
				}.bind(this),
				error: function (oResponse) {
					sap.m.MessageToast.show("oData fetching failed");
				}
			});
			
			oModelFournisseur.read(sSetFournisseur, {
				success: function (oData) {
					var oModelMNAFournisseur = new JSONModel();
					oModelMNAFournisseur.setData(oData.results);
					this.getView().setModel(oModelMNAFournisseur, "oModelMNAFournisseur");
				}.bind(this),
				error: function (oResponse) {
					sap.m.MessageToast.show("oData fetching failed");
				}
			});
			
			oModelCategorie.read(sSetCategorie, {
				success: function (oData) {
					var oModelMNACategorie = new JSONModel();
					oModelMNACategorie.setData(oData.results);
					this.getView().setModel(oModelMNACategorie, "oModelMNACategorie");
				}.bind(this),
				error: function (oResponse) {
					sap.m.MessageToast.show("oData fetching failed");
				}
			});

			oModelCentreDeCout.read(sSetCentreDeCout, {
				success: function (oData) {
					var oModelMNACentreDeCout = new JSONModel();
					oModelMNACentreDeCout.setData(oData.results);
					this.getView().setModel(oModelMNACentreDeCout, "oModelMNACentreDeCout");
				}.bind(this),
				error: function (oResponse) {
					sap.m.MessageToast.show("oData fetching failed");
				}
			});

			oModelDomaineActivite.read(sSetDomaineActivite, {
				success: function (oData) {
					var oModelMNADomaineActivite = new JSONModel();
					oModelMNADomaineActivite.setData(oData.results);
					this.getView().setModel(oModelMNADomaineActivite, "oModelMNADomaineActivite");
				}.bind(this),
				error: function (oResponse) {
					sap.m.MessageToast.show("oData fetching failed");
				}
			});


			oModelCritereDeTri.read(sSetCritereDeTri, {
				success: function (oData) {
					var oModelMNACritereDeTri = new JSONModel();
					oModelMNACritereDeTri.setData(oData.results);
					this.getView().setModel(oModelMNACritereDeTri, "oModelMNACritereDeTri");
				}.bind(this),
				error: function (oResponse) {
					sap.m.MessageToast.show("oData fetching failed");
				}
			});


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

		onBeforeRebindTable: function(oEvent) {
			var mBindingParams = oEvent.getParameter("bindingParams"),
				aSelectedItemsSociete = this._oCustomMultiComboBoxSociete.getSelectedItems(),
				aSelectedItemsPays = this._oCustomMultiComboBoxpays.getSelectedItems(),
				aSelectedItemsFournisseur = this._oCustomMultiComboBoxFournisseur.getSelectedItems(),
				aSelectedItemsCategorie = this._oCustomMultiComboBoxCategorie.getSelectedItems(),
				aSelectedItemsCentreDeCout = this._oCustomMultiComboBoxCentreDeCout.getSelectedItems(),
				aSelectedItemsDomaineActivite = this._oCustomMultiComboBoxDomaineActivite.getSelectedItems(),
				aSelectedItemsCritereDeTri = this._oCustomMultiComboBoxCritereDeTri.getSelectedItems();

			aSelectedItemsSociete.forEach(function(oSelectedItem) {
				mBindingParams.filters.push(
					new Filter(
						"Bukrs",
						FilterOperator.EQ,
						oSelectedItem.getText()
					)
				);
			});

			aSelectedItemsPays.forEach(function(oSelectedItem) {
				mBindingParams.filters.push(
					new Filter(
						"Land1",
						FilterOperator.EQ,
						oSelectedItem.getText()
					)
				);
			});

			aSelectedItemsFournisseur.forEach(function(oSelectedItem) {
				mBindingParams.filters.push(
					new Filter(
						"Lifnr",
						FilterOperator.EQ,
						oSelectedItem.getText()
					)
				);
			});

			aSelectedItemsCategorie.forEach(function(oSelectedItem) {
				mBindingParams.filters.push(
					new Filter(
						"Anlkl",
						FilterOperator.EQ,
						oSelectedItem.getText()
					)
				);
			});

			aSelectedItemsCentreDeCout.forEach(function(oSelectedItem) {
				mBindingParams.filters.push(
					new Filter(
						"Kostl",
						FilterOperator.EQ,
						oSelectedItem.getText()
					)
				);
			});

			aSelectedItemsDomaineActivite.forEach(function(oSelectedItem) {
				mBindingParams.filters.push(
					new Filter(
						"Gsber",
						FilterOperator.EQ,
						oSelectedItem.getText()
					)
				);
			});

			aSelectedItemsCritereDeTri.forEach(function(oSelectedItem) {
				mBindingParams.filters.push(
					new Filter(
						"Ord41",
						FilterOperator.EQ,
						oSelectedItem.getText()
					)
				);
			});

			

			
		},
		customFieldChange: function(oEvent) {
			var oControl = oEvent.getSource(),
				bHasValue = false;

			if (oControl.getSelectedKeys().length > 0) {
				bHasValue = true;
			}
			oControl.data("hasValue", bHasValue);
		},
		onAfterVariantLoad: function() {
			var oData, oCustomFieldData;

			if (this._oSmartFilterBar) {
				oData = this._oSmartFilterBar.getFilterData();
				oCustomFieldData = oData["_CUSTOM"];
				if (oCustomFieldData) {
					this._oCustomMultiComboBox.setSelectedKeys(oCustomFieldData.MyOwnFilterField);
					this._oCustomSelect.setSelectedKey(oCustomFieldData.MyOwnRatingIndicator);
					this._oCustomSwitch.setState(oCustomFieldData.MyOwnSwitch);
				}
			}
		},
		onBeforeVariantFetch: function(oEvent) {
			this._updateCustomFilter();
		},

		_updateCustomFilter: function() {
			if (this._oSmartFilterBar) {
				this._oSmartFilterBar.setFilterData({
					_CUSTOM: {
						MyOwnFilterField: this._oCustomMultiComboBox.getSelectedKeys(),
						
					}
				});
			}
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
	HeaderToItem: function(oEvent) {

		contextHeaderToItem.HeaderToItem.push(
			{
			Msgty      : type, 
			Msgv1      : msg1,
			Msgv2      : msg2,
			Msgv3      : msg3,
			Msgv4      : msg4,
			Object     : "ZFLE",
			Subobject  : "ZFLE001",
			TimeStmp   : "\/Date("+TimeStmp+")\/"
			}
		
			)
	},

	MultiEdit: function(oEvent) {
		
		var oModel = this.getOwnerComponent().getModel();
	
		var items =  this.getView().byId('smartTable_ResponsiveTable1').getTable().getSelectedIndices();
		var row;   
		var context; 
		var xModel = new JSONModel({
			messages: []
		})
		/*var testmodel = new JSONModel({
			headertoitem : []
		})*/
	

		this.getView().setModel(xModel, 'responseModel');
		var that = this;
		
		for(var i = 0; i < items.length; i++){  
			row = items[i];  
			context  = {
				Bukrs: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Bukrs'),
				Anln1: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Anln1'),
				Anln2: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Anln2'),
				
				Txt50: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Txt50'),
				Txa50: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Txa50'),
				Anlhtxt: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Anlhtxt'),
				Menge: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Menge'),
				Meins: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Meins'),
				Lifnr: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Lifnr'),
				Aktiv: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Aktiv'),
				Urwrt: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Urwrt'),
				Kostl: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Kostl'),
				Werks: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Werks'),
				Gsber: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Gsber'),
				Invnr: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Invnr'),
				Invzu: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Invzu'),
				Ivdat: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Ivdat'),
				Inken: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Inken'),
				Ord41: this.getView().byId('smartTable_ResponsiveTable1').getTable().getContextByIndex(row).getProperty('Ord41'),
			};
			if (context.Aktiv){
				context.Aktiv=formatter.DateFormat(context.Aktiv);
			}
			if (context.Ivdat){
				context.Ivdat=formatter.DateFormat(context.Ivdat);
			}
			if (context.Inken){
				context.Inken = formatter.CodeInventaire(context.Inken);
			}
			if (context.Inken===""){
				context.Inken = formatter.CodeInventaire(context.Inken);
			}
			
			
			oModel.create("/ImmobilisationSet", context, {

				success: function(data, response){
					 let entry = that.getView().getModel('responseModel').getData();
					 entry.messages.push(JSON.parse(response.headers['sap-message'])['message'])
					 entry.messages.push(JSON.parse(response.headers['sap-message'])['severity'])
					//  console.log(that.getView().getModel('responseModel').getData());
					var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("log");

					for(var i = 0; i < xModel.oData.messages.length; i+=2){

						type=xModel.oData.messages[i].substring(11,12);
						msg1=xModel.oData.messages[i].substring(12,52);
						msg2=xModel.oData.messages[i].substring(52,102);
						msg3=xModel.oData.messages[i].substring(102,152);
						msg4=xModel.oData.messages[i].substring(152,202);
					}
					

					
					
						this.HeaderToItem();
						

					console.log("type : ",type);
					console.log("type : ",type.length);
					console.log("msg1 : ",msg1);
					console.log("msg2 : ",msg2);
					console.log("msg3 : ",msg3);
					console.log("msg4 : ",msg4);
					console.log("contextHeaderToItem : ",contextHeaderToItem);
				
					 
					
					
					
				
					

				

					
					
					oModel.create("/MessageHeaderSet", contextHeaderToItem, {
						success: function(data, response){
							
							}.bind(this),
							error: function(error,response){
								sap.m.MessageToast.show("error"), {
									duration: 3000
								};
						
							}.bind(this)
						});
					
					
					sap.m.MessageToast.show("success"), {
						duration: 3000
						};
					
				}.bind(this),
				error: function(error,response){
					
					 let entry = that.getView().getModel('responseModel').getData();
					 entry.messages.push(JSON.parse(response.headers['sap-message'])['message'])
					 for(var i = 0; i < xModel.oData.messages.length; i+=2){

						type=xModel.oData.messages[i].substring(11,12);
						msg1=xModel.oData.messages[i].substring(12,52);
						msg2=xModel.oData.messages[i].substring(52,102);
						msg3=xModel.oData.messages[i].substring(102,152);
						msg4=xModel.oData.messages[i].substring(152,202);
					}
					this.HeaderToItem();

						console.log("type : ",type);
						console.log("type : ",type.length);
						console.log("msg1 : ",msg1);
						console.log("msg2 : ",msg2);
						console.log("msg3 : ",msg3);
						console.log("msg4 : ",msg4);
						console.log("contextHeaderToItem : ",contextHeaderToItem);
					
						
						oModel.create("/MessageHeaderSet", context, {
							success: function(data, response){
								sap.m.MessageToast.show("success"), {
									duration: 3000
								};
								}.bind(this),
								error: function(error,response){
									sap.m.MessageToast.show("error"), {
										duration: 3000
									};
							
								}.bind(this)
							});
						
						sap.m.MessageToast.show("error"), {
							duration: 3000
							};
				}.bind(this)
				
			});
			
		} 


	},
	onNavBack: function () {
		var oHistory = History.getInstance();
		var sPreviousHash = oHistory.getPreviousHash();

		if (sPreviousHash !== undefined) {
			window.history.go(-1);
		} else {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("modificationHome", {}, true);
		}
	},
	

	
		
	});
});