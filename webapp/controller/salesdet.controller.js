sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/m/Dialog","sap/ui/model/json/JSONModel","sap/m/Button","sap/m/ButtonType"
], function(oController,Dialog,JSONModel,Button,ButtonType) {
	"use strict";

	return oController.extend("bh.controller.salesdet", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf bh.view.view.details
		 */
			onInit: function() {
				debugger;
				this.getOwnerComponent().getModel().setDefaultBindingMode("TwoWay");
				this.oRouter = this.getOwnerComponent().getRouter();
				this.oRouter.attachRoutePatternMatched(this.setSalesid,this);
			},
			setSalesid:function(oEvent)
			{   
				debugger;
				this.sPath = oEvent.getParameters().arguments.sId;
				this.objectId = oEvent.getParameters().arguments.objectId;
				this.sPath = "/SalesOrderSet(\'" + this.sPath + "\'" + ")"; 
				this.getView().bindElement({path: this.sPath });
			},
			onBack:function(){
				this.oRouter.navTo("pddet" ,{objectId : this.objectId });
			},
		    onEdit:function(oEvent)
		    {   
		    	debugger;
		    	var oModel = new JSONModel();
		    	var oDd = { product:"",
		    	            quantity:"",
		    	            uom:""
		    	};
		    	// **************How to read OData Model w/o JSON
		    	// var oArray = [];
		    	// var oItems = this.getView().byId("idSales").getItems();
		    	// for( var i = 0 ; i < oItems.length;i++ ){
		    	// 	var osPath = oItems[i].oBindingContexts.undefined.sPath;
		    	// 	var oEachItem = this.getOwnerComponent().getModel().getProperty(osPath);
		    	// 	oDd.product = oEachItem.ProductID;
		    	// 	oDd.quantity  = oEachItem.Quantity;
		    	// 	oDd.uom = oEachItem.QuantityUnit;
		    	// 	oArray.push(oDd);
		    	// }
		    	this.oSpath = this.getView().byId("idSales").getSelectedContextPaths()[0];
		    	var oSalesItem = this.getOwnerComponent().getModel().getProperty(this.oSpath);
		    		oDd.product = oSalesItem.ProductID;
		    		oDd.quantity  = oSalesItem.Quantity;
		    		oDd.uom = oSalesItem.QuantityUnit;
		    	
		    	oModel.setData(oDd);
		    	this.getView().setModel(oModel,"pop");
		    	// var that = this;
		    	if (!this.oDefaultDialog) 
		    	{
		    		this.oDefaultDialog = new Dialog({
					title: "Change Quantity",
					modal: true,
					contentWidth:"1em",
					content: [ new sap.m.Label({text:"Product Id"})
					         , new sap.m.Input({ value:"{pop>/product}", editable:false,maxLength: 20})
					         , new sap.m.Label({text:"Quantiy"})
					         , new sap.m.Input({ value:"{pop>/quantity}",maxLength: 20})
					         , new sap.m.Label({text:"UOM"})
					         , new sap.m.Input({ value:"{pop>/uom}",maxLength: 20})
					        ],
					beginButton: new Button({
						type: ButtonType.Emphasized,
						text: "OK",
						press: function () {
							debugger;
							var oSd = this.getOwnerComponent().getModel().getProperty(this.oSpath);
							oSd.Quantity = 	this.getView().getModel("pop").getProperty("/quantity");
							this.getOwnerComponent().getModel().setProperty(this.oSpath,oSd);
							this.oDefaultDialog.close();
						}.bind(this)
					}),
					endButton: new Button({
						text: "Close",
						press: function () {
							this.oDefaultDialog.close();
						}.bind(this)
					})        
		    		});
		        // to get access to the controller's model
				this.getView().addDependent(this.oDefaultDialog);		
		    	}
		    	this.oDefaultDialog.open();
		    }
	});
});