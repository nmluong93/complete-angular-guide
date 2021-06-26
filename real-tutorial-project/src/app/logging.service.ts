import {Injectable} from '@angular/core';

@Injectable(/*{
  providedIn: 'root'
}*/)
export class LoggingService {

  lastLog: string;

  printLog(message: string) {
    console.log('Log ' + message);
    console.log('Last log ' + this.lastLog);
    this.lastLog = message;
  }
}
