import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' }) // this is a shortcut of add this service into providers in app.module.ts
export class UserService {

    activatedEmitter = new Subject<boolean>();
}