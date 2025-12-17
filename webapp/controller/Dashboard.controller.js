sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("ehsm.controller.Dashboard", {
        onInit: function () {
            // Prevent back navigation to login if session is active? 
            // Or just check session presence.
            var oSession = this.getOwnerComponent().getModel("session");
            if (!oSession) {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteLogin");
            }
        },

        onPressIncident: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteIncidentManagement");
        },

        onPressRisk: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteRiskAssessment");
        },

        onLogoutPress: function () {
            // Clear session
            this.getOwnerComponent().setModel(null, "session");

            MessageToast.show("Logged out successfully");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteLogin");
        }
    });
});
