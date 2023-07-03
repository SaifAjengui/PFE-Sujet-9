sap.ui.define([
	'./BaseController',
	"sap/ui/model/json/JSONModel",
	'aymax/pfe/inventaire/model/formatter',
	"sap/ui/core/routing/History",
	"sap/ui/core/util/ExportTypeCSV",
	"sap/ui/core/util/Export",
	"sap/m/MessageBox"
], function(
	BaseController,
	JSONModel,
	formatter,
	History,
	ExportTypeCSV,
	Export,
	MessageBox
) {
	"use strict";

	return BaseController.extend("aymax.pfe.inventaire.controller.Miseaurebut", {
		formatter: formatter,
        onInit: function() {
			this.localModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(this.localModel, "localModel");
		},

	onUpload: function (e) {
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
				that.byId("loaded_assets_num").setText("Immobilisations("+that.getModel('localModel').getData().items.length+")");
				console.log(that.getModel("localModel").getData().items)
			};
			reader.onerror = function (ex) {
				console.log(ex);
			};
			reader.readAsBinaryString(file);
		}
	},

	uploadExcel: function(oEvent) {
		var oModel = this.getOwnerComponent().getModel();
		var data = this.getModel("localModel").getData().items;
		var that = this;
		var context;
		var xModel = new JSONModel({
			messages: []
		})
		this.getView().setModel(xModel, 'responseModel');
		data.forEach(row => {
			context ={
				Bukrs : row["Société"],
				Anln1: row["Immobilisation"],
				Anln2: row["Nº subsidiaire"],		
				AfabePost: row["Tableau d'éval."],
				Bldat: row["Date document"],
				Budat: row["Date comptable"],
				Bzdat: row["Date de référ."],
				Sgtxt: row["Texte"],
				
			}
			if (context.Bldat){
				context.Bldat = formatter.DateFormatExcel(context.Bldat)+"T00:00:00";
			}
			if (context.Budat){
				context.Budat = formatter.DateFormatExcel(context.Budat)+"T00:00:00";
			}
			if (context.Bzdat){
				context.Bzdat = formatter.DateFormatExcel(context.Bzdat)+"T00:00:00";
			}
			
			
			oModel.update("/RebutSet(Bukrs=" + "'"+context.Bukrs +"'"+','+"Anln1='"+context.Anln1 +"'"+','+"Anln2='"+context.Anln2 +"'"+ ")", context, {
			success: function(data, response){
				sap.m.MessageToast.show("Success"), {
					 duration: 3000
					 
				 };
				 let entry = that.getView().getModel('responseModel').getData();
				 entry.messages.push(JSON.parse(response.headers['sap-message'])['message'])
				 entry.messages.push(JSON.parse(response.headers['sap-message'])['severity'])
				 var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("log");
			}.bind(this),
			error: function(error){
				
			}.bind(this)
			
		});
		});
		
	},
	
	
	/*download: function () {
		var oExport = new Export({
		  exportType: new ExportTypeCSV({ // required from "sap/ui/core/util/ExportTypeCSV"
			separatorChar: ",",
			charset: "utf-8",
			fileExtension: "xlsx",
			
		  }),
		  models: this.getView().getModel("localModel"),
		  rows: { path: "/" },
		  columns: [
			{
			  name: "Name",
			  template: {
				content: ""
			  }
			},
			{
			  name: "Address",
			  template: {
				content: ""
			  }
			},
			
		  ]
		});
		oExport.saveFile("myNewFileName")
                .catch(function (oError) {
		  MessageBox.error("Error when downloading data. ..." + oError);
		}).then(function() {
		  oExport.destroy();
		});
	  },*/
			
		
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