import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostModel } from './post.model';
import { map } from 'rxjs/operators';

@Injectable()
export class PostService {
  constructor(private http: HttpClient) {}

  onCreatePost(postData: PostModel) {
    // Send Http request
    this.http
      .post<{ name: string }>(
        'https://ng-complete-guide-d3395-default-rtdb.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  fetchPosts() {
    return this.http.get<{ [key: string]: PostModel }>('https://ng-complete-guide-d3395-default-rtdb.firebaseio.com/posts.json')
      .pipe(map(rs => {
        const postArr: PostModel[] = [];
        for (const key in rs) {
          if (rs.hasOwnProperty(key)) {
            postArr.push({ ...rs[key], id: key });
          }
        }
        return postArr;
      }));
  }
}
