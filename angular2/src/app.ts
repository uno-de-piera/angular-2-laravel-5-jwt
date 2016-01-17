import {bootstrap} from 'angular2/platform/browser';
import {Component, View, provide} from 'angular2/core';
import {RouteConfig, Router, APP_BASE_HREF, ROUTER_PROVIDERS, ROUTER_DIRECTIVES, CanActivate} from 'angular2/router';
import {HTTP_PROVIDERS, Http, Headers} from 'angular2/http';
import {AuthHttp, AuthConfig, tokenNotExpired, JwtHelper} from 'angular2-jwt';

@Component({
    selector: 'public'
})
@View({
    template: "<h1>Public route</h1>"
})
class PublicRoute {}

@Component({
    selector: 'private',
    template: "<h1>Private route</h1>"
})

@CanActivate(() => tokenNotExpired())

class PrivateRoute {}

@Component({
    selector: 'app',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'src/app.html'
})

@RouteConfig([
    {path: '/public', component: PublicRoute, as: 'Public'},
    {path: '/private', component: PrivateRoute, as: 'Private'}
])

export class App {

    jwtHelper:JwtHelper = new JwtHelper();
    headers:Headers = new Headers;

    constructor(public http:Http, public authHttp:AuthHttp) {
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }

    login() {
        return new Promise((resolve, reject) => {
            this.http.post(
                'http://localhost:8080/angular2login',
                'email=andres@mail.com&password=123456',
                {
                    headers: this.headers
                }
            )
            .subscribe(
                res => {
                    localStorage.setItem('id_token', res.json().token);
                },
                error => {
                    reject(error);
                }
            )
        })
    }

    getEmailUserLogged() {
        this.authHttp.get('http://localhost:8080/token')
        .subscribe(
            data => console.log(data.json()),
            err => console.log(err),
            () => console.log('Complete')
        );
    }

    tokenSubscription() {
        this.authHttp.tokenStream
        .subscribe(
            data => console.log(data),
            err => console.log(err),
            () => console.log('Complete')
        );
    }

    useJwtHelper() {
        var token = localStorage.getItem('id_token');
        var info = {
            'decoded': this.jwtHelper.decodeToken(token),
            'expiration_date': this.jwtHelper.getTokenExpirationDate(token),
            'is_exired': this.jwtHelper.isTokenExpired(token)
        }
        console.log(info);
    }

    logout() {
        localStorage.removeItem('id_token');
    }

    loggedIn() {
        return tokenNotExpired();
    }
}


bootstrap(App, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(AuthConfig, {
        useFactory: () => {
            return new AuthConfig();
        }
    }),
    AuthHttp,
    provide(APP_BASE_HREF, {useValue: '/'})
]);
