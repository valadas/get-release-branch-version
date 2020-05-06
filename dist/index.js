"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core = __importStar(require("@actions/core"));
var github = __importStar(require("@actions/github"));
var getVersion = function (version) { return __awaiter(void 0, void 0, void 0, function () {
    var numbers;
    return __generator(this, function (_a) {
        numbers = version.split('.');
        console.log("numbers:", numbers);
        return [2 /*return*/, {
                major: parseInt(numbers[0]),
                minor: parseInt(numbers[1]),
                patch: parseInt(numbers[2]),
                manifestSafeVersionString: numbers[0].padStart(2, "0") + "." +
                    numbers[1].padStart(2, "0") + "." +
                    numbers[2].padStart(2, "0")
            }];
    });
}); };
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var event_1, refType, branchName, regex, versionString, version, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    event_1 = github.context.eventName;
                    if (event_1 !== "create") {
                        core.setFailed("This action is only meant to be run on create");
                        return [2 /*return*/];
                    }
                    refType = github.context.payload.ref_type;
                    if (refType !== "branch") {
                        core.setFailed("This action is only meant to be run on the creation of a new branch");
                        return [2 /*return*/];
                    }
                    branchName = github.context.payload.ref;
                    regex = new RegExp(/^release\/\d{1,2}\.\d{1,2}\.\d{1,2}$/);
                    if (!branchName.match(regex)) return [3 /*break*/, 2];
                    versionString = branchName.split('/')[1];
                    return [4 /*yield*/, getVersion(versionString)];
                case 1:
                    version = _a.sent();
                    console.log("version: ", version);
                    core.setOutput("major", version.major);
                    core.setOutput("minor", version.minor);
                    core.setOutput("patch", version.patch);
                    core.setOutput("manifestSafeVersionString", version.manifestSafeVersionString);
                    return [3 /*break*/, 3];
                case 2:
                    core.setFailed("the branch name does not match the patter 'release/nn.nn.nn'");
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    core.setFailed(error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
run();
exports.default = run;
