import { TextDecoder, TextEncoder } from "util";
// Fix for ReferenceError: TextEncoder, TextEncoder is not defined
Object.assign(global, { TextDecoder, TextEncoder });
