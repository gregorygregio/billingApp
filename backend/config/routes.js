const express = require('express')
const authMiddleware = require('../api/middleware/auth');

module.exports = function(server) {


      const OpenAPI = express.Router();

      server.use("/auth",OpenAPI)

      const authService = require('../api/user/authService');
      OpenAPI.post("/register", authService.register);
      OpenAPI.get("/userlist", authService.listUsers);
      OpenAPI.post("/login", authService.login);




      const protectedApi = express.Router();
      server.use("/api",protectedApi)

      protectedApi.use(authMiddleware)


      const billingCycleService  = require("../api/billingCycle/billingCycleService")
      billingCycleService.register(protectedApi,"/billingCycles")

      const billingSummaryService = require('../api/billingSummary/billingSummaryService')
      protectedApi.route('/billingSummary').get(billingSummaryService.getSummary);
      protectedApi.get('/teste', (req, res) => res.send("oi"))
}
