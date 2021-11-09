sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("bh.controller.details", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf bh.view.view.details
		 */
			onInit: function() {
				debugger;
				// this.getOwnerComponent().getModel().setDefaultBindingMode("TwoWay");
				this.oRouter = this.getOwnerComponent().getRouter();
				this.oRouter.attachRoutePatternMatched(this.setMatch,this);
			},
			setMatch: function(oEvent){ 
				debugger;
				if ( (oEvent.getParameters().arguments.objectId) ){
				this.sPath1 = oEvent.getParameters().arguments.objectId;
				this.sPath = "/BusinessPartnerSet(\'" + this.sPath1 + "\'" + ")";
				this.getView().bindElement({path: this.sPath });
				}
				// sPath = '/' + sPath;
				
				
          	
			},
			onChange: function(){
				var oSelData = this.getOwnerComponent().getModel("selData").getProperty("/");
				oSelData.items= null;
				oSelData.itmSel= "";
				this.getOwnerComponent().getModel("selData").setData(oSelData);
				this.getOwnerComponent().setModel(this.getOwnerComponent().getModel("selData"),"selData");
			    var oModel = this.getView().getModel();
			    
			    
			    var sPath = "/SalesOrderSet(\'" + oSelData.soId + "\'" + ")/ToLineItems" ;
			    var that = this;
			    oModel.read(sPath,
			    {
			    	success:function(oDaa)	{
	     //**********In case you want local model******** 
			    	 //var jModel = new sap.ui.model.json.JSONModel();
         //            var myData = {};
         //            myData.Fare = oDaa.results;
         //            jModel.setData(myData);
         //            that.getView().setModel(jModel, "fareModel");
                     
                     //var oDmodel = that.getOwnerComponent().getModel("selData");
                     //var odd = oDmodel.getProperty("/");
                     //odd.items = oDaa.results;
                     //oDmodel.setData(odd);
                     //that.getOwnerComponent().setModel(oDmodel,"selData");
                     //*********In case you want Model at Component Controller level******
                     that.getOwnerComponent().getModel("selData").setProperty("/items",oDaa.results);
			    	},
			    	error:function()
			    	{  	}  });
			},
			onProdChg:function()
			{   var oSelData = this.getOwnerComponent().getModel("selData").getProperty("/");
				for( var i = 0 ; i< oSelData.items.length ; i++  )
				{
					if( oSelData.items[i].ItemPosition === oSelData.itmSel )
					{ var sPath = "/ProductSet(\'" + oSelData.items[i].ProductID + "\'" + ")/ToSupplier";
					break;} 	
					
				}
				var that = this;
				this.getProudcts( this.getOwnerComponent().getModel(),sPath)
				.then(function(odd)
				{
					debugger;
					var oContact= 
					{
						BusinessPartnerID: "",
						CompanyName: "",
						WebAddress: "",
						EmailAddress: "",
						PhoneNumber: "",
						FaxNumber: ""
					};
					oContact.BusinessPartnerID = odd.BusinessPartnerID;
					oContact.CompanyName  = odd.CompanyName;
					oContact.WebAddress   = odd.WebAddress;
					oContact.EmailAddress = odd.EmailAddress;
					oContact.PhoneNumber  = odd.PhoneNumber;
					oContact.FaxNumber    = odd.FaxNumber;
					that.getOwnerComponent().getModel("selData").setProperty("/contact",oContact);
				
				})
				.catch(function(oEr)
				{
					
				});
			},
			
           getProudcts:function(oModel,sPath)
           {
           		
           	return new Promise(function(resolve , reject ) 
           	{ debugger;
           	  oModel.read(sPath,
           	  {
           	  	success:function(oData)
           	  	{   
           	  		resolve(oData);
           	  	},
           	  	error:function(oError)
           	  	{
           	  		reject(oError);
           	  	}
           	  });	
           	});
           },
           onSaleSel:function(oEvent){
           	debugger;
           	// var oRouter = this.getOwnerComponent().getRouter();
			var sPath = oEvent.getSource().getSelectedContextPaths()[0];
			var sIndex = sPath.split("'")[1];
			this.oRouter.navTo("sddet",{sId : sIndex, objectId : this.sPath1});
           },
           titleClicked:function(oEvent){
           	debugger;
           	var oButton = oEvent.getSource(),
				oView = this.getView(),
				oSpath = oEvent.getSource().getBindingContext().sPath;
			if (!this._pPopover) {
				this._pPopover = sap.ui.core.Fragment.load({
					id: oView.getId(),
					name: "bh.fragments.salesamt",
					controller: this
				}).then(function(oPopover) {
					oView.addDependent(oPopover);
					debugger;
					oPopover.bindElement(oSpath);
					return oPopover;
				});		}
			this._pPopover.then(function(oPopover) {
				oPopover.openBy(oButton);
			});           },
           
           handleCloseButton: function (oEvent) {
			this.byId("myPopover").close();
		}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf bh.view.view.details
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf bh.view.view.details
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf bh.view.view.details
		 */
		//	onExit: function() {
		//
		//	}

	});

});