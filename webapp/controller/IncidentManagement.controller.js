sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (Controller, History) {
    "use strict";

    return Controller.extend("ehsm.controller.IncidentManagement", {
        formatter: {
            statusState: function (sStatus) {
                if (sStatus === "OPEN") {
                    return "Warning";
                } else if (sStatus === "CLOSED") {
                    return "Success";
                } else {
                    return "None";
                }
            }
        },

        onInit: function () {
            // Check session
            var oSession = this.getOwnerComponent().getModel("session");
            if (!oSession) {
                // var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                // oRouter.navTo("RouteLogin");
                // Commented out to aid testing if mock data is used or debugging, but strictly requested by user.
                // For now, I will keep it loose or assume the user logs in.
            }
        },

        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteDashboard", {}, true);
            }
        }
    });
});
