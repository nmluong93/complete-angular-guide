import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { PostModel } from './post.model';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class PostService {

  static URL = 'https://ng-complete-guide-d3395-default-rtdb.firebaseio.com/posts.json';

  constructor(private http: HttpClient) {}

  onCreatePost(postData: PostModel) {
    // Send Http request
    return this.http
      .post<{ name: string }>(
        PostService.URL,
        postData,
        {
          // observe: 'body' // only get the body - and convert automatically the response to TypeScript object
          observe: 'response', // return all the HttpResponse including body, status code, etc. all the information useful.
          responseType: 'json' // by default is JSON.
        }
      );
  }

  fetchPosts() {
    return this.http.get<{ [key: string]: PostModel }>(PostService.URL,
      {
        headers: new HttpHeaders({
          'Custom-Header': 'Hello'
        }),
        params: new HttpParams().set('print', 'pretty').append('secondParam', 'SecondParamVal')
      })
      .pipe(map(rs => {
        const postArr: PostModel[] = [];
        for (const key in rs) {
          if (rs.hasOwnProperty(key)) {
            postArr.push({ ...rs[key], id: key });
          }
        }
        return postArr;
      }), catchError(err => {
        return throwError(err);
      }));
  }

  clearPosts() {
    return this.http.delete(PostService.URL, {
      observe: 'events'
    }).pipe(tap(event => {
      console.log(`Delete event response = ${event}`);
      if (event.type === HttpEventType.Sent) {
        console.log(`Delete event sent = ${event.type}`);
        alert('Delete request sent, please wait!');
      }
      if (event.type === HttpEventType.Response) {
        console.log(`Delete event response's body = ${event.body}`);
      }
    }));
  }
}
