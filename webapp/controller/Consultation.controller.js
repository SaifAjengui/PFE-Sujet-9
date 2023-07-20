sap.ui.define([
	'./BaseController',
	'sap/ui/model/json/JSONModel',
	"sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
	'aymax/pfe/inventaire/model/formatter'

], function (BaseController, JSONModel, Filter, FilterOperator, formatter) {
	"use strict";
	return BaseController.extend("aymax.pfe.inventaire.controller.Consultation", {
		formatter: formatter,
 
		onInit: function () {

			

		

			this._oSmartFilterBar = this.byId("smartFilterBar");
			this._oCustomMultiComboBox = this.byId("multiComboBoxSociete");
			this._oCustomMultiComboBoxpays = this.byId("multiComboBoxPays");
			this._oCustomMultiComboBoxFournisseur = this.byId("multiComboBoxFournisseur");
			this._oCustomMultiComboBoxCategorie = this.byId("multiComboBoxCategorie");
			this._oCustomMultiComboBoxCentreDeCout = this.byId("multiComboBoxCentreDeCout");
			this._oCustomMultiComboBoxDomaineActivite = this.byId("multiComboBoxDomaineActivite");
			this._oCustomMultiComboBoxCritereDeTri = this.byId("multiComboBoxCritereDeTri");
		
			var oModel = this.getOwnerComponent().getModel();
			var oModelPays = this.getOwnerComponent().getModel();
			var oModelFournisseur = this.getOwnerComponent().getModel();
			var oModelCategorie = this.getOwnerComponent().getModel();
			var oModelCentreDeCout = this.getOwnerComponent().getModel();
			var oModelDomaineActivite = this.getOwnerComponent().getModel();
			var oModelCritereDeTri = this.getOwnerComponent().getModel();

			var sSet = "/" + "SocieteSet";
			var sSetPays="/"+ "PaysSet";
			var sSetFournisseur="/"+ "FournisseurSet";
			var sSetCategorie="/"+ "categorieSet";
			var sSetCentreDeCout="/"+ "CentreDeCoutSet";
			var sSetDomaineActivite="/"+ "DomaineActiviteSet";
			var sSetCritereDeTri="/"+ "StatutImmoSet";

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



			

		

		},
		onBeforeRebindTable: function(oEvent) {
			var mBindingParams = oEvent.getParameter("bindingParams"),
				aSelectedItems = this._oCustomMultiComboBox.getSelectedItems(),
				aSelectedItemsPays = this._oCustomMultiComboBoxpays.getSelectedItems(),
				aSelectedItemsFournisseur = this._oCustomMultiComboBoxFournisseur.getSelectedItems(),
				aSelectedItemsCategorie = this._oCustomMultiComboBoxCategorie.getSelectedItems(),
				aSelectedItemsCentreDeCout = this._oCustomMultiComboBoxCentreDeCout.getSelectedItems(),
				aSelectedItemsDomaineActivite = this._oCustomMultiComboBoxDomaineActivite.getSelectedItems(),
				aSelectedItemsCritereDeTri = this._oCustomMultiComboBoxCritereDeTri.getSelectedItems();
			aSelectedItems.forEach(function(oSelectedItem) {
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

		


		onPress: function () {
		
		},

		
			
	});
});