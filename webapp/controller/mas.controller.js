sap.ui.define(["sap/ui/core/mvc/Controller"],
function(oController){
	return oController.extend("bh.controller.mas",{
		onInit: function()
		{
		
		},
		onPress: function(oEvent)
		{
				debugger;
			var oRouter = this.getOwnerComponent().getRouter();
			var sPath = oEvent.getSource().getSelectedContextPaths()[0];
			// var sIndex = sPath.split("/")[sPath.split("/").length -1 ];
			var sIndex = sPath.split("'")[1];
			oRouter.navTo("pddet",{objectId : sIndex});
			// oRouter.navTo("sddet",{sId : "0500000009"});
			
		}
	});	
});