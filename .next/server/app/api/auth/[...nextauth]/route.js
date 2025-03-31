"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Fhector.jaraba%2FProyects%2Fcursor-planning-poker%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fhector.jaraba%2FProyects%2Fcursor-planning-poker&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Fhector.jaraba%2FProyects%2Fcursor-planning-poker%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fhector.jaraba%2FProyects%2Fcursor-planning-poker&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_node_polyfill_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/node-polyfill-headers */ \"(rsc)/./node_modules/next/dist/server/node-polyfill-headers.js\");\n/* harmony import */ var next_dist_server_node_polyfill_headers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_node_polyfill_headers__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var _Users_hector_jaraba_Proyects_cursor_planning_poker_src_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./src/app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_1__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_2__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"/Users/hector.jaraba/Proyects/cursor-planning-poker/src/app/api/auth/[...nextauth]/route.ts\",\n    nextConfigOutput,\n    userland: _Users_hector_jaraba_Proyects_cursor_planning_poker_src_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmhlY3Rvci5qYXJhYmElMkZQcm95ZWN0cyUyRmN1cnNvci1wbGFubmluZy1wb2tlciUyRnNyYyUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGVXNlcnMlMkZoZWN0b3IuamFyYWJhJTJGUHJveWVjdHMlMkZjdXJzb3ItcGxhbm5pbmctcG9rZXImaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBZ0Q7QUFDc0Q7QUFDdkM7QUFDeUQ7QUFDeEg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSx1R0FBdUc7QUFDL0c7QUFDaUo7O0FBRWpKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY3Vyc29yLXBsYW5uaW5nLXBva2VyLz9hNmRkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIm5leHQvZGlzdC9zZXJ2ZXIvbm9kZS1wb2x5ZmlsbC1oZWFkZXJzXCI7XG5pbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvaGVjdG9yLmphcmFiYS9Qcm95ZWN0cy9jdXJzb3ItcGxhbm5pbmctcG9rZXIvc3JjL2FwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF1cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9oZWN0b3IuamFyYWJhL1Byb3llY3RzL2N1cnNvci1wbGFubmluZy1wb2tlci9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgaGVhZGVySG9va3MsIHN0YXRpY0dlbmVyYXRpb25CYWlsb3V0IH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCI7XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIGhlYWRlckhvb2tzLCBzdGF0aWNHZW5lcmF0aW9uQmFpbG91dCwgb3JpZ2luYWxQYXRobmFtZSwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Fhector.jaraba%2FProyects%2Fcursor-planning-poker%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fhector.jaraba%2FProyects%2Fcursor-planning-poker&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/auth/[...nextauth]/route.ts":
/*!*************************************************!*\
  !*** ./src/app/api/auth/[...nextauth]/route.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler),\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/next */ \"(rsc)/./node_modules/next-auth/next/index.js\");\n/* harmony import */ var _auth_mongodb_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @auth/mongodb-adapter */ \"(rsc)/./node_modules/@auth/mongodb-adapter/index.js\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var next_auth_providers_github__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-auth/providers/github */ \"(rsc)/./node_modules/next-auth/providers/github.js\");\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./src/lib/mongodb.ts\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./src/lib/db.ts\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_8__);\n\n\n\n\n\n\n\n\n\n// Define User model\nlet UserModel;\ntry {\n    // Try to get the model if it exists\n    UserModel = mongoose__WEBPACK_IMPORTED_MODULE_8___default().model(\"User\");\n} catch (e) {\n    // Define User schema if not already defined\n    const UserSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_8___default().Schema)({\n        name: String,\n        email: {\n            type: String,\n            unique: true,\n            required: true\n        },\n        password: String,\n        role: {\n            type: String,\n            enum: [\n                \"user\",\n                \"admin\"\n            ],\n            default: \"user\"\n        },\n        createdAt: {\n            type: Date,\n            default: Date.now\n        }\n    });\n    // Create the model\n    UserModel = mongoose__WEBPACK_IMPORTED_MODULE_8___default().model(\"User\", UserSchema);\n}\nconst authOptions = {\n    providers: [\n        // Add OAuth providers if you have them\n        (0,next_auth_providers_github__WEBPACK_IMPORTED_MODULE_3__[\"default\"])({\n            clientId: process.env.GITHUB_ID || \"\",\n            clientSecret: process.env.GITHUB_SECRET || \"\"\n        }),\n        (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_4__[\"default\"])({\n            clientId: process.env.GOOGLE_ID || \"\",\n            clientSecret: process.env.GOOGLE_SECRET || \"\"\n        }),\n        // Add credentials provider for email/password\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    return null;\n                }\n                await (0,_lib_db__WEBPACK_IMPORTED_MODULE_7__.connect)();\n                // Find user by email\n                const user = await UserModel.findOne({\n                    email: credentials.email\n                });\n                // If no user found or password doesn't match\n                if (!user || !user.password) {\n                    return null;\n                }\n                // Check password\n                const isPasswordValid = await (0,bcrypt__WEBPACK_IMPORTED_MODULE_5__.compare)(credentials.password, user.password);\n                if (!isPasswordValid) {\n                    return null;\n                }\n                // Return user object without password\n                return {\n                    id: user._id.toString(),\n                    name: user.name,\n                    email: user.email,\n                    role: user.role\n                };\n            }\n        })\n    ],\n    adapter: (0,_auth_mongodb_adapter__WEBPACK_IMPORTED_MODULE_1__.MongoDBAdapter)(_lib_mongodb__WEBPACK_IMPORTED_MODULE_6__[\"default\"]),\n    session: {\n        strategy: \"jwt\"\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            // Add user role to the token when user signs in\n            if (user) {\n                token.id = user.id;\n                token.role = user.role;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            // Add user id and role to the session\n            if (session.user) {\n                session.user.id = token.id;\n                session.user.role = token.role;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/auth/signin\",\n        // Add custom pages here\n        newUser: \"/auth/signup\"\n    }\n};\nconst handler = (0,next_auth_next__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBc0M7QUFFaUI7QUFDVztBQUNWO0FBQ0E7QUFDdkI7QUFDUztBQUNQO0FBQ0g7QUFFaEMsb0JBQW9CO0FBQ3BCLElBQUlTO0FBRUosSUFBSTtJQUNGLG9DQUFvQztJQUNwQ0EsWUFBWUQscURBQWMsQ0FBQztBQUM3QixFQUFFLE9BQU9HLEdBQUc7SUFDViw0Q0FBNEM7SUFDNUMsTUFBTUMsYUFBYSxJQUFJSix3REFBZSxDQUFDO1FBQ3JDTSxNQUFNQztRQUNOQyxPQUFPO1lBQ0xDLE1BQU1GO1lBQ05HLFFBQVE7WUFDUkMsVUFBVTtRQUNaO1FBQ0FDLFVBQVVMO1FBQ1ZNLE1BQU07WUFDSkosTUFBTUY7WUFDTk8sTUFBTTtnQkFBQztnQkFBUTthQUFRO1lBQ3ZCQyxTQUFTO1FBQ1g7UUFDQUMsV0FBVztZQUNUUCxNQUFNUTtZQUNORixTQUFTRSxLQUFLQyxHQUFHO1FBQ25CO0lBQ0Y7SUFFQSxtQkFBbUI7SUFDbkJqQixZQUFZRCxxREFBYyxDQUFDLFFBQVFJO0FBQ3JDO0FBRU8sTUFBTWUsY0FBK0I7SUFDMUNDLFdBQVc7UUFDVCx1Q0FBdUM7UUFDdkN6QixzRUFBY0EsQ0FBQztZQUNiMEIsVUFBVUMsUUFBUUMsR0FBRyxDQUFDQyxTQUFTLElBQUk7WUFDbkNDLGNBQWNILFFBQVFDLEdBQUcsQ0FBQ0csYUFBYSxJQUFJO1FBQzdDO1FBQ0E5QixzRUFBY0EsQ0FBQztZQUNieUIsVUFBVUMsUUFBUUMsR0FBRyxDQUFDSSxTQUFTLElBQUk7WUFDbkNGLGNBQWNILFFBQVFDLEdBQUcsQ0FBQ0ssYUFBYSxJQUFJO1FBQzdDO1FBQ0EsOENBQThDO1FBQzlDbEMsMkVBQW1CQSxDQUFDO1lBQ2xCWSxNQUFNO1lBQ051QixhQUFhO2dCQUNYckIsT0FBTztvQkFBRXNCLE9BQU87b0JBQVNyQixNQUFNO2dCQUFRO2dCQUN2Q0csVUFBVTtvQkFBRWtCLE9BQU87b0JBQVlyQixNQUFNO2dCQUFXO1lBQ2xEO1lBQ0EsTUFBTXNCLFdBQVVGLFdBQVc7Z0JBQ3pCLElBQUksQ0FBQ0EsYUFBYXJCLFNBQVMsQ0FBQ3FCLGFBQWFqQixVQUFVO29CQUNqRCxPQUFPO2dCQUNUO2dCQUVBLE1BQU1iLGdEQUFPQTtnQkFFYixxQkFBcUI7Z0JBQ3JCLE1BQU1pQyxPQUFPLE1BQU0vQixVQUFVZ0MsT0FBTyxDQUFDO29CQUFFekIsT0FBT3FCLFlBQVlyQixLQUFLO2dCQUFDO2dCQUVoRSw2Q0FBNkM7Z0JBQzdDLElBQUksQ0FBQ3dCLFFBQVEsQ0FBQ0EsS0FBS3BCLFFBQVEsRUFBRTtvQkFDM0IsT0FBTztnQkFDVDtnQkFFQSxpQkFBaUI7Z0JBQ2pCLE1BQU1zQixrQkFBa0IsTUFBTXJDLCtDQUFPQSxDQUNuQ2dDLFlBQVlqQixRQUFRLEVBQ3BCb0IsS0FBS3BCLFFBQVE7Z0JBR2YsSUFBSSxDQUFDc0IsaUJBQWlCO29CQUNwQixPQUFPO2dCQUNUO2dCQUVBLHNDQUFzQztnQkFDdEMsT0FBTztvQkFDTEMsSUFBSUgsS0FBS0ksR0FBRyxDQUFDQyxRQUFRO29CQUNyQi9CLE1BQU0wQixLQUFLMUIsSUFBSTtvQkFDZkUsT0FBT3dCLEtBQUt4QixLQUFLO29CQUNqQkssTUFBTW1CLEtBQUtuQixJQUFJO2dCQUNqQjtZQUNGO1FBQ0Y7S0FDRDtJQUNEeUIsU0FBUzdDLHFFQUFjQSxDQUFDSyxvREFBYUE7SUFDckN5QyxTQUFTO1FBQ1BDLFVBQVU7SUFDWjtJQUNBQyxXQUFXO1FBQ1QsTUFBTUMsS0FBSSxFQUFFQyxLQUFLLEVBQUVYLElBQUksRUFBRTtZQUN2QixnREFBZ0Q7WUFDaEQsSUFBSUEsTUFBTTtnQkFDUlcsTUFBTVIsRUFBRSxHQUFHSCxLQUFLRyxFQUFFO2dCQUNsQlEsTUFBTTlCLElBQUksR0FBR21CLEtBQUtuQixJQUFJO1lBQ3hCO1lBQ0EsT0FBTzhCO1FBQ1Q7UUFDQSxNQUFNSixTQUFRLEVBQUVBLE9BQU8sRUFBRUksS0FBSyxFQUFFO1lBQzlCLHNDQUFzQztZQUN0QyxJQUFJSixRQUFRUCxJQUFJLEVBQUU7Z0JBQ2hCTyxRQUFRUCxJQUFJLENBQUNHLEVBQUUsR0FBR1EsTUFBTVIsRUFBRTtnQkFDMUJJLFFBQVFQLElBQUksQ0FBQ25CLElBQUksR0FBRzhCLE1BQU05QixJQUFJO1lBQ2hDO1lBQ0EsT0FBTzBCO1FBQ1Q7SUFDRjtJQUNBSyxPQUFPO1FBQ0xDLFFBQVE7UUFDUix3QkFBd0I7UUFDeEJDLFNBQVM7SUFDWDtBQUNGLEVBQUU7QUFFRixNQUFNQyxVQUFVdkQsMERBQVFBLENBQUMyQjtBQUNrQiIsInNvdXJjZXMiOlsid2VicGFjazovL2N1cnNvci1wbGFubmluZy1wb2tlci8uL3NyYy9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cz8wMDk4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOZXh0QXV0aCBmcm9tIFwibmV4dC1hdXRoL25leHRcIjtcbmltcG9ydCB7IE5leHRBdXRoT3B0aW9ucyB9IGZyb20gXCJuZXh0LWF1dGhcIjtcbmltcG9ydCB7IE1vbmdvREJBZGFwdGVyIH0gZnJvbSBcIkBhdXRoL21vbmdvZGItYWRhcHRlclwiO1xuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHNcIjtcbmltcG9ydCBHaXRIdWJQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9naXRodWJcIjtcbmltcG9ydCBHb29nbGVQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9nb29nbGVcIjtcbmltcG9ydCB7IGNvbXBhcmUgfSBmcm9tIFwiYmNyeXB0XCI7XG5pbXBvcnQgY2xpZW50UHJvbWlzZSBmcm9tIFwiQC9saWIvbW9uZ29kYlwiO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJAL2xpYi9kYlwiO1xuaW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xuXG4vLyBEZWZpbmUgVXNlciBtb2RlbFxubGV0IFVzZXJNb2RlbDogbW9uZ29vc2UuTW9kZWw8YW55PjtcblxudHJ5IHtcbiAgLy8gVHJ5IHRvIGdldCB0aGUgbW9kZWwgaWYgaXQgZXhpc3RzXG4gIFVzZXJNb2RlbCA9IG1vbmdvb3NlLm1vZGVsKFwiVXNlclwiKTtcbn0gY2F0Y2ggKGUpIHtcbiAgLy8gRGVmaW5lIFVzZXIgc2NoZW1hIGlmIG5vdCBhbHJlYWR5IGRlZmluZWRcbiAgY29uc3QgVXNlclNjaGVtYSA9IG5ldyBtb25nb29zZS5TY2hlbWEoe1xuICAgIG5hbWU6IFN0cmluZyxcbiAgICBlbWFpbDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdW5pcXVlOiB0cnVlLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgfSxcbiAgICBwYXNzd29yZDogU3RyaW5nLFxuICAgIHJvbGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGVudW06IFtcInVzZXJcIiwgXCJhZG1pblwiXSxcbiAgICAgIGRlZmF1bHQ6IFwidXNlclwiLFxuICAgIH0sXG4gICAgY3JlYXRlZEF0OiB7XG4gICAgICB0eXBlOiBEYXRlLFxuICAgICAgZGVmYXVsdDogRGF0ZS5ub3csXG4gICAgfSxcbiAgfSk7XG5cbiAgLy8gQ3JlYXRlIHRoZSBtb2RlbFxuICBVc2VyTW9kZWwgPSBtb25nb29zZS5tb2RlbChcIlVzZXJcIiwgVXNlclNjaGVtYSk7XG59XG5cbmV4cG9ydCBjb25zdCBhdXRoT3B0aW9uczogTmV4dEF1dGhPcHRpb25zID0ge1xuICBwcm92aWRlcnM6IFtcbiAgICAvLyBBZGQgT0F1dGggcHJvdmlkZXJzIGlmIHlvdSBoYXZlIHRoZW1cbiAgICBHaXRIdWJQcm92aWRlcih7XG4gICAgICBjbGllbnRJZDogcHJvY2Vzcy5lbnYuR0lUSFVCX0lEIHx8IFwiXCIsXG4gICAgICBjbGllbnRTZWNyZXQ6IHByb2Nlc3MuZW52LkdJVEhVQl9TRUNSRVQgfHwgXCJcIixcbiAgICB9KSxcbiAgICBHb29nbGVQcm92aWRlcih7XG4gICAgICBjbGllbnRJZDogcHJvY2Vzcy5lbnYuR09PR0xFX0lEIHx8IFwiXCIsXG4gICAgICBjbGllbnRTZWNyZXQ6IHByb2Nlc3MuZW52LkdPT0dMRV9TRUNSRVQgfHwgXCJcIixcbiAgICB9KSxcbiAgICAvLyBBZGQgY3JlZGVudGlhbHMgcHJvdmlkZXIgZm9yIGVtYWlsL3Bhc3N3b3JkXG4gICAgQ3JlZGVudGlhbHNQcm92aWRlcih7XG4gICAgICBuYW1lOiBcIkNyZWRlbnRpYWxzXCIsXG4gICAgICBjcmVkZW50aWFsczoge1xuICAgICAgICBlbWFpbDogeyBsYWJlbDogXCJFbWFpbFwiLCB0eXBlOiBcImVtYWlsXCIgfSxcbiAgICAgICAgcGFzc3dvcmQ6IHsgbGFiZWw6IFwiUGFzc3dvcmRcIiwgdHlwZTogXCJwYXNzd29yZFwiIH0sXG4gICAgICB9LFxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgIGlmICghY3JlZGVudGlhbHM/LmVtYWlsIHx8ICFjcmVkZW50aWFscz8ucGFzc3dvcmQpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IGNvbm5lY3QoKTtcblxuICAgICAgICAvLyBGaW5kIHVzZXIgYnkgZW1haWxcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHsgZW1haWw6IGNyZWRlbnRpYWxzLmVtYWlsIH0pO1xuXG4gICAgICAgIC8vIElmIG5vIHVzZXIgZm91bmQgb3IgcGFzc3dvcmQgZG9lc24ndCBtYXRjaFxuICAgICAgICBpZiAoIXVzZXIgfHwgIXVzZXIucGFzc3dvcmQpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIHBhc3N3b3JkXG4gICAgICAgIGNvbnN0IGlzUGFzc3dvcmRWYWxpZCA9IGF3YWl0IGNvbXBhcmUoXG4gICAgICAgICAgY3JlZGVudGlhbHMucGFzc3dvcmQsXG4gICAgICAgICAgdXNlci5wYXNzd29yZFxuICAgICAgICApO1xuXG4gICAgICAgIGlmICghaXNQYXNzd29yZFZhbGlkKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXR1cm4gdXNlciBvYmplY3Qgd2l0aG91dCBwYXNzd29yZFxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGlkOiB1c2VyLl9pZC50b1N0cmluZygpLFxuICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgICByb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBhZGFwdGVyOiBNb25nb0RCQWRhcHRlcihjbGllbnRQcm9taXNlKSxcbiAgc2Vzc2lvbjoge1xuICAgIHN0cmF0ZWd5OiBcImp3dFwiLFxuICB9LFxuICBjYWxsYmFja3M6IHtcbiAgICBhc3luYyBqd3QoeyB0b2tlbiwgdXNlciB9KSB7XG4gICAgICAvLyBBZGQgdXNlciByb2xlIHRvIHRoZSB0b2tlbiB3aGVuIHVzZXIgc2lnbnMgaW5cbiAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgIHRva2VuLmlkID0gdXNlci5pZDtcbiAgICAgICAgdG9rZW4ucm9sZSA9IHVzZXIucm9sZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9LFxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XG4gICAgICAvLyBBZGQgdXNlciBpZCBhbmQgcm9sZSB0byB0aGUgc2Vzc2lvblxuICAgICAgaWYgKHNlc3Npb24udXNlcikge1xuICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB0b2tlbi5pZCBhcyBzdHJpbmc7XG4gICAgICAgIHNlc3Npb24udXNlci5yb2xlID0gdG9rZW4ucm9sZSBhcyBzdHJpbmc7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2Vzc2lvbjtcbiAgICB9LFxuICB9LFxuICBwYWdlczoge1xuICAgIHNpZ25JbjogXCIvYXV0aC9zaWduaW5cIixcbiAgICAvLyBBZGQgY3VzdG9tIHBhZ2VzIGhlcmVcbiAgICBuZXdVc2VyOiBcIi9hdXRoL3NpZ251cFwiLFxuICB9LFxufTtcblxuY29uc3QgaGFuZGxlciA9IE5leHRBdXRoKGF1dGhPcHRpb25zKTtcbmV4cG9ydCB7IGhhbmRsZXIgYXMgR0VULCBoYW5kbGVyIGFzIFBPU1QgfTtcbiJdLCJuYW1lcyI6WyJOZXh0QXV0aCIsIk1vbmdvREJBZGFwdGVyIiwiQ3JlZGVudGlhbHNQcm92aWRlciIsIkdpdEh1YlByb3ZpZGVyIiwiR29vZ2xlUHJvdmlkZXIiLCJjb21wYXJlIiwiY2xpZW50UHJvbWlzZSIsImNvbm5lY3QiLCJtb25nb29zZSIsIlVzZXJNb2RlbCIsIm1vZGVsIiwiZSIsIlVzZXJTY2hlbWEiLCJTY2hlbWEiLCJuYW1lIiwiU3RyaW5nIiwiZW1haWwiLCJ0eXBlIiwidW5pcXVlIiwicmVxdWlyZWQiLCJwYXNzd29yZCIsInJvbGUiLCJlbnVtIiwiZGVmYXVsdCIsImNyZWF0ZWRBdCIsIkRhdGUiLCJub3ciLCJhdXRoT3B0aW9ucyIsInByb3ZpZGVycyIsImNsaWVudElkIiwicHJvY2VzcyIsImVudiIsIkdJVEhVQl9JRCIsImNsaWVudFNlY3JldCIsIkdJVEhVQl9TRUNSRVQiLCJHT09HTEVfSUQiLCJHT09HTEVfU0VDUkVUIiwiY3JlZGVudGlhbHMiLCJsYWJlbCIsImF1dGhvcml6ZSIsInVzZXIiLCJmaW5kT25lIiwiaXNQYXNzd29yZFZhbGlkIiwiaWQiLCJfaWQiLCJ0b1N0cmluZyIsImFkYXB0ZXIiLCJzZXNzaW9uIiwic3RyYXRlZ3kiLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsInBhZ2VzIiwic2lnbkluIiwibmV3VXNlciIsImhhbmRsZXIiLCJHRVQiLCJQT1NUIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/db.ts":
/*!***********************!*\
  !*** ./src/lib/db.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   connect: () => (/* binding */ connect)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst MONGODB_URI = process.env.MONGODB_URI;\nif (!MONGODB_URI) {\n    throw new Error(\"Please define the MONGODB_URI environment variable inside .env.local\");\n}\n/**\n * Global is used here to maintain a cached connection across hot reloads\n * in development. This prevents connections growing exponentially\n * during API Route usage.\n */ let cached = global.mongoose;\nif (!cached) {\n    cached = global.mongoose = {\n        conn: null,\n        promise: null\n    };\n}\nasync function connect() {\n    if (cached.conn) {\n        console.log(\"Using existing MongoDB connection\");\n        return cached.conn;\n    }\n    if (!cached.promise) {\n        // Configure options to address TLS compatibility issues with Node.js 18\n        const opts = {\n            bufferCommands: false,\n            autoIndex: true,\n            maxPoolSize: 10,\n            socketTimeoutMS: 45000,\n            family: 4\n        };\n        console.log(\"Creating new MongoDB connection...\");\n        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, opts).then((mongoose)=>{\n            console.log(\"MongoDB connected successfully\");\n            mongoose.connection.on(\"error\", (err)=>{\n                console.error(\"MongoDB connection error:\", err);\n            });\n            mongoose.connection.on(\"disconnected\", ()=>{\n                console.warn(\"MongoDB disconnected, attempting to reconnect...\");\n                cached.promise = null; // Reset the promise to allow reconnection\n                cached.conn = null;\n            });\n            return mongoose;\n        }).catch((err)=>{\n            console.error(\"MongoDB connection error:\", err);\n            // Reset the promise so we can try again\n            cached.promise = null;\n            throw err;\n        });\n    }\n    try {\n        cached.conn = await cached.promise;\n    } catch (e) {\n        cached.promise = null;\n        console.error(\"Failed to await MongoDB connection:\", e);\n        throw e;\n    }\n    return cached.conn;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2RiLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFnQztBQUVoQyxNQUFNQyxjQUFjQyxRQUFRQyxHQUFHLENBQUNGLFdBQVc7QUFFM0MsSUFBSSxDQUFDQSxhQUFhO0lBQ2hCLE1BQU0sSUFBSUcsTUFDUjtBQUVKO0FBRUE7Ozs7Q0FJQyxHQUNELElBQUlDLFNBQVNDLE9BQU9OLFFBQVE7QUFFNUIsSUFBSSxDQUFDSyxRQUFRO0lBQ1hBLFNBQVNDLE9BQU9OLFFBQVEsR0FBRztRQUFFTyxNQUFNO1FBQU1DLFNBQVM7SUFBSztBQUN6RDtBQUVPLGVBQWVDO0lBQ3BCLElBQUlKLE9BQU9FLElBQUksRUFBRTtRQUNmRyxRQUFRQyxHQUFHLENBQUM7UUFDWixPQUFPTixPQUFPRSxJQUFJO0lBQ3BCO0lBRUEsSUFBSSxDQUFDRixPQUFPRyxPQUFPLEVBQUU7UUFDbkIsd0VBQXdFO1FBQ3hFLE1BQU1JLE9BQU87WUFDWEMsZ0JBQWdCO1lBQ2hCQyxXQUFXO1lBQ1hDLGFBQWE7WUFDYkMsaUJBQWlCO1lBQ2pCQyxRQUFRO1FBQ1Y7UUFFQVAsUUFBUUMsR0FBRyxDQUFDO1FBRVpOLE9BQU9HLE9BQU8sR0FBR1IsdURBQ1AsQ0FBQ0MsYUFBYVcsTUFDckJNLElBQUksQ0FBQyxDQUFDbEI7WUFDTFUsUUFBUUMsR0FBRyxDQUFDO1lBQ1pYLFNBQVNtQixVQUFVLENBQUNDLEVBQUUsQ0FBQyxTQUFTLENBQUNDO2dCQUMvQlgsUUFBUVksS0FBSyxDQUFDLDZCQUE2QkQ7WUFDN0M7WUFFQXJCLFNBQVNtQixVQUFVLENBQUNDLEVBQUUsQ0FBQyxnQkFBZ0I7Z0JBQ3JDVixRQUFRYSxJQUFJLENBQUM7Z0JBQ2JsQixPQUFPRyxPQUFPLEdBQUcsTUFBTSwwQ0FBMEM7Z0JBQ2pFSCxPQUFPRSxJQUFJLEdBQUc7WUFDaEI7WUFFQSxPQUFPUDtRQUNULEdBQ0N3QixLQUFLLENBQUMsQ0FBQ0g7WUFDTlgsUUFBUVksS0FBSyxDQUFDLDZCQUE2QkQ7WUFDM0Msd0NBQXdDO1lBQ3hDaEIsT0FBT0csT0FBTyxHQUFHO1lBQ2pCLE1BQU1hO1FBQ1I7SUFDSjtJQUVBLElBQUk7UUFDRmhCLE9BQU9FLElBQUksR0FBRyxNQUFNRixPQUFPRyxPQUFPO0lBQ3BDLEVBQUUsT0FBT2lCLEdBQUc7UUFDVnBCLE9BQU9HLE9BQU8sR0FBRztRQUNqQkUsUUFBUVksS0FBSyxDQUFDLHVDQUF1Q0c7UUFDckQsTUFBTUE7SUFDUjtJQUVBLE9BQU9wQixPQUFPRSxJQUFJO0FBQ3BCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY3Vyc29yLXBsYW5uaW5nLXBva2VyLy4vc3JjL2xpYi9kYi50cz85ZTRmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIjtcblxuY29uc3QgTU9OR09EQl9VUkkgPSBwcm9jZXNzLmVudi5NT05HT0RCX1VSSSE7XG5cbmlmICghTU9OR09EQl9VUkkpIHtcbiAgdGhyb3cgbmV3IEVycm9yKFxuICAgIFwiUGxlYXNlIGRlZmluZSB0aGUgTU9OR09EQl9VUkkgZW52aXJvbm1lbnQgdmFyaWFibGUgaW5zaWRlIC5lbnYubG9jYWxcIlxuICApO1xufVxuXG4vKipcbiAqIEdsb2JhbCBpcyB1c2VkIGhlcmUgdG8gbWFpbnRhaW4gYSBjYWNoZWQgY29ubmVjdGlvbiBhY3Jvc3MgaG90IHJlbG9hZHNcbiAqIGluIGRldmVsb3BtZW50LiBUaGlzIHByZXZlbnRzIGNvbm5lY3Rpb25zIGdyb3dpbmcgZXhwb25lbnRpYWxseVxuICogZHVyaW5nIEFQSSBSb3V0ZSB1c2FnZS5cbiAqL1xubGV0IGNhY2hlZCA9IGdsb2JhbC5tb25nb29zZTtcblxuaWYgKCFjYWNoZWQpIHtcbiAgY2FjaGVkID0gZ2xvYmFsLm1vbmdvb3NlID0geyBjb25uOiBudWxsLCBwcm9taXNlOiBudWxsIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25uZWN0KCkge1xuICBpZiAoY2FjaGVkLmNvbm4pIHtcbiAgICBjb25zb2xlLmxvZyhcIlVzaW5nIGV4aXN0aW5nIE1vbmdvREIgY29ubmVjdGlvblwiKTtcbiAgICByZXR1cm4gY2FjaGVkLmNvbm47XG4gIH1cblxuICBpZiAoIWNhY2hlZC5wcm9taXNlKSB7XG4gICAgLy8gQ29uZmlndXJlIG9wdGlvbnMgdG8gYWRkcmVzcyBUTFMgY29tcGF0aWJpbGl0eSBpc3N1ZXMgd2l0aCBOb2RlLmpzIDE4XG4gICAgY29uc3Qgb3B0cyA9IHtcbiAgICAgIGJ1ZmZlckNvbW1hbmRzOiBmYWxzZSxcbiAgICAgIGF1dG9JbmRleDogdHJ1ZSxcbiAgICAgIG1heFBvb2xTaXplOiAxMCxcbiAgICAgIHNvY2tldFRpbWVvdXRNUzogNDUwMDAsXG4gICAgICBmYW1pbHk6IDQsIC8vIEZvcmNlIElQdjRcbiAgICB9O1xuXG4gICAgY29uc29sZS5sb2coXCJDcmVhdGluZyBuZXcgTW9uZ29EQiBjb25uZWN0aW9uLi4uXCIpO1xuXG4gICAgY2FjaGVkLnByb21pc2UgPSBtb25nb29zZVxuICAgICAgLmNvbm5lY3QoTU9OR09EQl9VUkksIG9wdHMpXG4gICAgICAudGhlbigobW9uZ29vc2UpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJNb25nb0RCIGNvbm5lY3RlZCBzdWNjZXNzZnVsbHlcIik7XG4gICAgICAgIG1vbmdvb3NlLmNvbm5lY3Rpb24ub24oXCJlcnJvclwiLCAoZXJyKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIk1vbmdvREIgY29ubmVjdGlvbiBlcnJvcjpcIiwgZXJyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbW9uZ29vc2UuY29ubmVjdGlvbi5vbihcImRpc2Nvbm5lY3RlZFwiLCAoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFwiTW9uZ29EQiBkaXNjb25uZWN0ZWQsIGF0dGVtcHRpbmcgdG8gcmVjb25uZWN0Li4uXCIpO1xuICAgICAgICAgIGNhY2hlZC5wcm9taXNlID0gbnVsbDsgLy8gUmVzZXQgdGhlIHByb21pc2UgdG8gYWxsb3cgcmVjb25uZWN0aW9uXG4gICAgICAgICAgY2FjaGVkLmNvbm4gPSBudWxsO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbW9uZ29vc2U7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIk1vbmdvREIgY29ubmVjdGlvbiBlcnJvcjpcIiwgZXJyKTtcbiAgICAgICAgLy8gUmVzZXQgdGhlIHByb21pc2Ugc28gd2UgY2FuIHRyeSBhZ2FpblxuICAgICAgICBjYWNoZWQucHJvbWlzZSA9IG51bGw7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH0pO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjYWNoZWQuY29ubiA9IGF3YWl0IGNhY2hlZC5wcm9taXNlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY2FjaGVkLnByb21pc2UgPSBudWxsO1xuICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gYXdhaXQgTW9uZ29EQiBjb25uZWN0aW9uOlwiLCBlKTtcbiAgICB0aHJvdyBlO1xuICB9XG5cbiAgcmV0dXJuIGNhY2hlZC5jb25uO1xufVxuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiTU9OR09EQl9VUkkiLCJwcm9jZXNzIiwiZW52IiwiRXJyb3IiLCJjYWNoZWQiLCJnbG9iYWwiLCJjb25uIiwicHJvbWlzZSIsImNvbm5lY3QiLCJjb25zb2xlIiwibG9nIiwib3B0cyIsImJ1ZmZlckNvbW1hbmRzIiwiYXV0b0luZGV4IiwibWF4UG9vbFNpemUiLCJzb2NrZXRUaW1lb3V0TVMiLCJmYW1pbHkiLCJ0aGVuIiwiY29ubmVjdGlvbiIsIm9uIiwiZXJyIiwiZXJyb3IiLCJ3YXJuIiwiY2F0Y2giLCJlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/db.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/mongodb.ts":
/*!****************************!*\
  !*** ./src/lib/mongodb.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);\n\nif (!process.env.MONGODB_URI) {\n    throw new Error('Invalid/Missing environment variable: \"MONGODB_URI\"');\n}\nconst uri = process.env.MONGODB_URI;\n// Configure options to address TLS compatibility issues\nconst options = {\n    maxPoolSize: 10,\n    socketTimeoutMS: 45000,\n    connectTimeoutMS: 10000,\n    family: 4\n};\nlet client;\nlet clientPromise;\nif (true) {\n    // In development mode, use a global variable so that the value\n    // is preserved across module reloads caused by HMR (Hot Module Replacement).\n    let globalWithMongo = global;\n    if (!globalWithMongo._mongoClientPromise) {\n        client = new mongodb__WEBPACK_IMPORTED_MODULE_0__.MongoClient(uri, options);\n        globalWithMongo._mongoClientPromise = client.connect();\n    }\n    clientPromise = globalWithMongo._mongoClientPromise;\n} else {}\n// Export a module-scoped MongoClient promise. By doing this in a\n// separate module, the client can be shared across functions.\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clientPromise);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL21vbmdvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXNDO0FBRXRDLElBQUksQ0FBQ0MsUUFBUUMsR0FBRyxDQUFDQyxXQUFXLEVBQUU7SUFDNUIsTUFBTSxJQUFJQyxNQUFNO0FBQ2xCO0FBRUEsTUFBTUMsTUFBTUosUUFBUUMsR0FBRyxDQUFDQyxXQUFXO0FBQ25DLHdEQUF3RDtBQUN4RCxNQUFNRyxVQUFVO0lBQ2RDLGFBQWE7SUFDYkMsaUJBQWlCO0lBQ2pCQyxrQkFBa0I7SUFDbEJDLFFBQVE7QUFDVjtBQUVBLElBQUlDO0FBQ0osSUFBSUM7QUFFSixJQUFJWCxJQUFzQyxFQUFFO0lBQzFDLCtEQUErRDtJQUMvRCw2RUFBNkU7SUFDN0UsSUFBSVksa0JBQWtCQztJQUl0QixJQUFJLENBQUNELGdCQUFnQkUsbUJBQW1CLEVBQUU7UUFDeENKLFNBQVMsSUFBSVgsZ0RBQVdBLENBQUNLLEtBQUtDO1FBQzlCTyxnQkFBZ0JFLG1CQUFtQixHQUFHSixPQUFPSyxPQUFPO0lBQ3REO0lBQ0FKLGdCQUFnQkMsZ0JBQWdCRSxtQkFBbUI7QUFDckQsT0FBTyxFQUlOO0FBRUQsaUVBQWlFO0FBQ2pFLDhEQUE4RDtBQUM5RCxpRUFBZUgsYUFBYUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2N1cnNvci1wbGFubmluZy1wb2tlci8uL3NyYy9saWIvbW9uZ29kYi50cz81M2MyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vbmdvQ2xpZW50IH0gZnJvbSBcIm1vbmdvZGJcIjtcblxuaWYgKCFwcm9jZXNzLmVudi5NT05HT0RCX1VSSSkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQvTWlzc2luZyBlbnZpcm9ubWVudCB2YXJpYWJsZTogXCJNT05HT0RCX1VSSVwiJyk7XG59XG5cbmNvbnN0IHVyaSA9IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJO1xuLy8gQ29uZmlndXJlIG9wdGlvbnMgdG8gYWRkcmVzcyBUTFMgY29tcGF0aWJpbGl0eSBpc3N1ZXNcbmNvbnN0IG9wdGlvbnMgPSB7XG4gIG1heFBvb2xTaXplOiAxMCxcbiAgc29ja2V0VGltZW91dE1TOiA0NTAwMCxcbiAgY29ubmVjdFRpbWVvdXRNUzogMTAwMDAsXG4gIGZhbWlseTogNCwgLy8gRm9yY2UgSVB2NFxufTtcblxubGV0IGNsaWVudDtcbmxldCBjbGllbnRQcm9taXNlOiBQcm9taXNlPE1vbmdvQ2xpZW50PjtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcImRldmVsb3BtZW50XCIpIHtcbiAgLy8gSW4gZGV2ZWxvcG1lbnQgbW9kZSwgdXNlIGEgZ2xvYmFsIHZhcmlhYmxlIHNvIHRoYXQgdGhlIHZhbHVlXG4gIC8vIGlzIHByZXNlcnZlZCBhY3Jvc3MgbW9kdWxlIHJlbG9hZHMgY2F1c2VkIGJ5IEhNUiAoSG90IE1vZHVsZSBSZXBsYWNlbWVudCkuXG4gIGxldCBnbG9iYWxXaXRoTW9uZ28gPSBnbG9iYWwgYXMgdHlwZW9mIGdsb2JhbFRoaXMgJiB7XG4gICAgX21vbmdvQ2xpZW50UHJvbWlzZT86IFByb21pc2U8TW9uZ29DbGllbnQ+O1xuICB9O1xuXG4gIGlmICghZ2xvYmFsV2l0aE1vbmdvLl9tb25nb0NsaWVudFByb21pc2UpIHtcbiAgICBjbGllbnQgPSBuZXcgTW9uZ29DbGllbnQodXJpLCBvcHRpb25zKTtcbiAgICBnbG9iYWxXaXRoTW9uZ28uX21vbmdvQ2xpZW50UHJvbWlzZSA9IGNsaWVudC5jb25uZWN0KCk7XG4gIH1cbiAgY2xpZW50UHJvbWlzZSA9IGdsb2JhbFdpdGhNb25nby5fbW9uZ29DbGllbnRQcm9taXNlO1xufSBlbHNlIHtcbiAgLy8gSW4gcHJvZHVjdGlvbiBtb2RlLCBpdCdzIGJlc3QgdG8gbm90IHVzZSBhIGdsb2JhbCB2YXJpYWJsZS5cbiAgY2xpZW50ID0gbmV3IE1vbmdvQ2xpZW50KHVyaSwgb3B0aW9ucyk7XG4gIGNsaWVudFByb21pc2UgPSBjbGllbnQuY29ubmVjdCgpO1xufVxuXG4vLyBFeHBvcnQgYSBtb2R1bGUtc2NvcGVkIE1vbmdvQ2xpZW50IHByb21pc2UuIEJ5IGRvaW5nIHRoaXMgaW4gYVxuLy8gc2VwYXJhdGUgbW9kdWxlLCB0aGUgY2xpZW50IGNhbiBiZSBzaGFyZWQgYWNyb3NzIGZ1bmN0aW9ucy5cbmV4cG9ydCBkZWZhdWx0IGNsaWVudFByb21pc2U7XG4iXSwibmFtZXMiOlsiTW9uZ29DbGllbnQiLCJwcm9jZXNzIiwiZW52IiwiTU9OR09EQl9VUkkiLCJFcnJvciIsInVyaSIsIm9wdGlvbnMiLCJtYXhQb29sU2l6ZSIsInNvY2tldFRpbWVvdXRNUyIsImNvbm5lY3RUaW1lb3V0TVMiLCJmYW1pbHkiLCJjbGllbnQiLCJjbGllbnRQcm9taXNlIiwiZ2xvYmFsV2l0aE1vbmdvIiwiZ2xvYmFsIiwiX21vbmdvQ2xpZW50UHJvbWlzZSIsImNvbm5lY3QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/mongodb.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/@panva","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/oidc-token-hash","vendor-chunks/@auth","vendor-chunks/preact","vendor-chunks/object-hash","vendor-chunks/lru-cache","vendor-chunks/cookie"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Fhector.jaraba%2FProyects%2Fcursor-planning-poker%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fhector.jaraba%2FProyects%2Fcursor-planning-poker&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();