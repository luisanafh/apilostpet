"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const routes_1 = require("./users/routes");
const routes_2 = require("./pet-posts/routes");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        router.use('/api/users', routes_1.UserRoutes.routes);
        router.use('/api/petpost', routes_2.PetPostRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
