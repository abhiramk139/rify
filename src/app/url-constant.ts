import { Injectable } from "@angular/core";

@Injectable()
export class UrlConstant {

    public urlOrigin: string = window.location.origin;
    public uriSplit: string = window.location.href.split('/')[3];

    public LOGIN_PORT = 'http://localhost:8080/auth/login';
    public SERVER_PORT = 'http://localhost:8080/api/';
    //    public UI_PORT = 'http://localhost:4200/';

    public UI_PORT = this.urlOrigin + '/';
}