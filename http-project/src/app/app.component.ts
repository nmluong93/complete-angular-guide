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

  constructor(private http: HttpClient, private postService: PostService) {
  }

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: PostModel) {
    this.postService.onCreatePost(postData);
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {

  }

  private fetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts()
      .subscribe(rs => {
        this.isFetching = false;
        this.loadedPosts = rs;
      });
  }
}
