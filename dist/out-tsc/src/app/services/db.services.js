import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/Fire/auth';
var DBService = /** @class */ (function () {
    function DBService(db, afa) {
        this.db = db;
        this.afa = afa;
    }
    DBService.prototype.inserir = function (caminho, objeto) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.list(caminho)
                .push(objeto)
                .then(function (item) { return resolve(item.key); });
        });
    };
    DBService.prototype.atualizar = function (path, object) {
        return this.db.object(path).update(object);
    };
    DBService.prototype.remover = function (caminho, uid) {
        return this.db.object(caminho + "/" + uid).remove();
    };
    DBService.prototype.get = function (caminho) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.object(caminho)
                .valueChanges()
                .subscribe(function (result) { return resolve(result); }, function (error) { return reject(error); });
        });
    };
    DBService.prototype.getSincronizado = function (path) {
        return this.db.object(path).valueChanges();
    };
    DBService.prototype.listWithUIDs = function (path) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.list(path)
                .snapshotChanges()
                .subscribe(function (items) {
                var typedItems = [];
                items.forEach(function (item) {
                    var typedItem = item.payload.val();
                    typedItem['uid'] = item.key;
                    typedItems.push(typedItem);
                });
                resolve(typedItems);
            }, function (error) { return reject(error); });
        });
    };
    DBService.prototype.listar = function (path) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.list(path)
                .snapshotChanges()
                .subscribe(function (items) {
                var typedItems = [];
                items.forEach(function (item) {
                    var typedItem = item.payload.val();
                    typedItem['uid'] = item.key;
                    typedItems.push(typedItem);
                });
                resolve(typedItems);
            }, function (error) { return reject(error); });
        });
    };
    DBService.prototype.listarSincronizado = function (caminho) {
        return this.db.list(caminho).valueChanges();
    };
    DBService.prototype.buscar = function (caminho, propriedade, valor) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.list(caminho, function (ref) { return ref.orderByChild(propriedade).equalTo(valor); })
                .snapshotChanges()
                .subscribe(function (items) {
                var typedItems = [];
                items.forEach(function (item) {
                    var typedItem = item.payload.val();
                    typedItem['uid'] = item.key;
                    typedItems.push(typedItem);
                });
                resolve(typedItems);
            }, function (error) { return reject(error); });
        });
    };
    DBService.prototype.userLogin = function (cliente) {
        return this.afa.auth.signInWithEmailAndPassword(cliente.senha, cliente.email);
    };
    DBService.prototype.deslogar = function () {
        return this.afa.auth.signOut();
    };
    DBService.prototype.getAuth = function () {
        return this.afa.auth;
    };
    DBService.prototype.addProduct = function (produto) {
        return this.productsCollection.add(produto);
    };
    DBService.prototype.getProduct = function (id) {
        return this.productsCollection.doc(id).valueChanges();
    };
    DBService.prototype.updateProduct = function (id, product) {
        return this.productsCollection.doc(id).update(product);
    };
    DBService.prototype.deleteProduct = function (id) {
        return this.productsCollection.doc(id).delete();
    };
    DBService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [AngularFireDatabase, AngularFireAuth])
    ], DBService);
    return DBService;
}());
export { DBService };
//# sourceMappingURL=db.services.js.map