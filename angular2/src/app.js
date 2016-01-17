System.register(['angular2/platform/browser', 'angular2/core', 'angular2/router', 'angular2/http', 'angular2-jwt'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var browser_1, core_1, router_1, http_1, angular2_jwt_1;
    var PublicRoute, PrivateRoute, App;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            }],
        execute: function() {
            PublicRoute = (function () {
                function PublicRoute() {
                }
                PublicRoute = __decorate([
                    core_1.Component({
                        selector: 'public'
                    }),
                    core_1.View({
                        template: "<h1>Public route</h1>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], PublicRoute);
                return PublicRoute;
            })();
            PrivateRoute = (function () {
                function PrivateRoute() {
                }
                PrivateRoute = __decorate([
                    core_1.Component({
                        selector: 'private',
                        template: "<h1>Private route</h1>"
                    }),
                    router_1.CanActivate(function () { return angular2_jwt_1.tokenNotExpired(); }), 
                    __metadata('design:paramtypes', [])
                ], PrivateRoute);
                return PrivateRoute;
            })();
            App = (function () {
                function App(http, authHttp) {
                    this.http = http;
                    this.authHttp = authHttp;
                    this.jwtHelper = new angular2_jwt_1.JwtHelper();
                    this.headers = new http_1.Headers;
                    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
                }
                App.prototype.login = function () {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        _this.http.post('http://localhost:8080/angular2login', 'email=andres@mail.com&password=123456', {
                            headers: _this.headers
                        })
                            .subscribe(function (res) {
                            localStorage.setItem('id_token', res.json().token);
                        }, function (error) {
                            reject(error);
                        });
                    });
                };
                App.prototype.getEmailUserLogged = function () {
                    this.authHttp.get('http://localhost:8080/token')
                        .subscribe(function (data) { return console.log(data.json()); }, function (err) { return console.log(err); }, function () { return console.log('Complete'); });
                };
                App.prototype.tokenSubscription = function () {
                    this.authHttp.tokenStream
                        .subscribe(function (data) { return console.log(data); }, function (err) { return console.log(err); }, function () { return console.log('Complete'); });
                };
                App.prototype.useJwtHelper = function () {
                    var token = localStorage.getItem('id_token');
                    var info = {
                        'decoded': this.jwtHelper.decodeToken(token),
                        'expiration_date': this.jwtHelper.getTokenExpirationDate(token),
                        'is_exired': this.jwtHelper.isTokenExpired(token)
                    };
                    console.log(info);
                };
                App.prototype.logout = function () {
                    localStorage.removeItem('id_token');
                };
                App.prototype.loggedIn = function () {
                    return angular2_jwt_1.tokenNotExpired();
                };
                App = __decorate([
                    core_1.Component({
                        selector: 'app',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        templateUrl: 'src/app.html'
                    }),
                    router_1.RouteConfig([
                        { path: '/public', component: PublicRoute, as: 'Public' },
                        { path: '/private', component: PrivateRoute, as: 'Private' }
                    ]), 
                    __metadata('design:paramtypes', [http_1.Http, angular2_jwt_1.AuthHttp])
                ], App);
                return App;
            })();
            exports_1("App", App);
            browser_1.bootstrap(App, [
                http_1.HTTP_PROVIDERS,
                router_1.ROUTER_PROVIDERS,
                core_1.provide(angular2_jwt_1.AuthConfig, {
                    useFactory: function () {
                        return new angular2_jwt_1.AuthConfig();
                    }
                }),
                angular2_jwt_1.AuthHttp,
                core_1.provide(router_1.APP_BASE_HREF, { useValue: '/' })
            ]);
        }
    }
});
//# sourceMappingURL=app.js.map