import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
var CameraService = /** @class */ (function () {
    function CameraService(camera, base64) {
        this.camera = camera;
        this.base64 = base64;
    }
    CameraService.prototype.tirarFoto = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var options = {
                            quality: 100,
                            destinationType: _this.camera.DestinationType.FILE_URI,
                            encodingType: _this.camera.EncodingType.JPEG,
                            mediaType: _this.camera.MediaType.PICTURE
                        };
                        _this.camera.getPicture(options).then(function (imageData) {
                            _this.base64.encodeFile(imageData).then(function (base64File) {
                                resolve(base64File);
                            }, function (err) {
                                console.log(err);
                            });
                        }, function (err) {
                            console.log(err);
                        });
                    })];
            });
        });
    };
    CameraService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Camera, Base64])
    ], CameraService);
    return CameraService;
}());
export { CameraService };
//# sourceMappingURL=camera.services.js.map