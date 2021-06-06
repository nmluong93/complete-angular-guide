import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {PostModel} from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.fetchPosts();
  }

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

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {

  }

  private fetchPosts() {
    this.isFetching = true;
    this.http.get<{ [key: string]: PostModel }>('https://ng-complete-guide-d3395-default-rtdb.firebaseio.com/posts.json')
      .pipe(map(rs => {
        const postArr: PostModel[] = [];
        for (const key in rs) {
          if (rs.hasOwnProperty(key)) {
            postArr.push({...rs[key], id: key});
          }
        }
        return postArr;
      }))
      .subscribe(rs => {
        this.loadedPosts = rs;
        this.isFetching = false;
      });
  }
}
