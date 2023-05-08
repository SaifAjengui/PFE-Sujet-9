sap.ui.define([
	'./BaseController',
	'aymax/pfe/inventaire/model/formatter',
	"sap/ui/core/Item",
	// "sap/base/util/array",
], function(
	BaseController,
	formatter,
	Item,
	// array,
) {
	"use strict";

	return BaseController.extend("aymax.pfe.inventaire.controller.ModificationExcel", {
		formatter: formatter,
        onInit: function() {
			this.localModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(this.localModel, "localModel");
			
		},onUpload: function (e) {
			this._import(e.getParameter("files") && e.getParameter("files")[0]);
		},_import: function (file) {
			var that = this;
			var excelData = {};
			if (file && window.FileReader) {
				var reader = new FileReader();
				reader.onload = function (e) {
					var data = e.target.result;
					var workbook = XLSX.read(data, {
						type: 'binary'
					});
					workbook.SheetNames.forEach(function (sheetName) {
						// Here is your object for every sheet in workbook
						excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

					});
					// Setting the data to the local model 
					that.localModel.setData({
						items: excelData
					});
					that.localModel.refresh(true);
				};
				reader.onerror = function (ex) {
					console.log(ex);
				};
				reader.readAsBinaryString(file);
			}
		},

		uploadExcel: function(oEvent) {
			var oModel = this.getOwnerComponent().getModel();
			var ItemsNbr = this.getView().byId('Excel_data_table').getItems().length;
			// console.log(this.getModel("localModel").getData().items[0]["Société"]);
			var data = this.getModel("localModel").getData().items;
			var context;
			var Anln1;
			var Anln2
			data.forEach(row => {
				context ={
					Bukrs : row["Société"],
					Anln1: row["Immobilisation"],
					Anln2: row["Nº subsidiaire"],		
					Txt50: row["Désignation"],
					Menge: row["Quantité"],
					Lifnr: row["Fournisseur"],
					Aktiv: row["Date mise serv."],
					Urwrt: row["Valeur d'orig."],
					Kostl: row["Centre de coûts"],
					Werks: row["Division"],
					Gsber: row["Dom.activité"],
				}
				Anln1 = "0".repeat(12-context.Anln1.length) + context.Anln1;
				Anln2 = "0".repeat(4-context.Anln2.length) + context.Anln2;


				console.log(context.Aktiv);
				if (context.Aktiv){
				context.Aktiv = formatter.DateFormatExcel(context.Aktiv)+"T00:00:00";
				console.log(context.Aktiv);
				}
				oModel.update("/ImmobilisationSet(Bukrs=" + "'"+context.Bukrs +"'"+','+"Anln1='"+Anln1 +"'"+','+"Anln2='"+Anln2 +"'"+ ")", context, {
				success: function(data, response){
					sap.m.MessageToast.show("Success"), {
						 duration: 3000
					 };
				}.bind(this),
				error: function(error){
					
				}.bind(this)
			});


			});
			
		},
	});
});