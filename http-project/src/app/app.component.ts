import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PostModel } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: PostModel[] = [];
  isFetching = false;
  error = null;

  constructor(private http: HttpClient, private postService: PostService) {
  }

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: PostModel) {
    this.postService.onCreatePost(postData)
      .subscribe(rs => {
        console.log(rs);
        this.error = null;
      }, error => {
        this.handleError(error);
      });
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    this.postService.clearPosts()
      .subscribe(rs => {
        this.loadedPosts = [];
        this.error = null;
      }, error => {
        this.handleError(error);
      });
  }

  private fetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts()
      .subscribe(rs => {
        this.isFetching = false;
        this.loadedPosts = rs;
        this.error = null;
        console.log(rs);
      }, error => {
        this.handleError(error);
      });
  }

  /**
   * The type of error based on API - in this case the Firebase API
   */
  private handleError(error: any) {
    this.isFetching = false;
    if (error) {
      if (error.error) {
        this.error = error.error.error;
      }
      else {
        this.error = error.message;
      }
    }
  }

  onHandleError() {
    this.error = null;
  }
}
