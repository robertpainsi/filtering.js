"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
// Fix for ReferenceError: TextEncoder, TextEncoder is not defined
Object.assign(global, { TextDecoder: util_1.TextDecoder, TextEncoder: util_1.TextEncoder });
