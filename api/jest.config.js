"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_jest_1 = require("ts-jest");
const tsJestTransformCfg = (0, ts_jest_1.createDefaultPreset)().transform;
/** @type {import("jest").Config} **/
module.exports = {
    preset: 'ts-jest',
    testEnvironment: "node",
    transform: Object.assign({}, tsJestTransformCfg),
};
