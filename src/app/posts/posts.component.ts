import { Component, OnInit } from '@angular/core';
import { PostService } from "../post.service";
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(
    private postService : PostService,
  ) { }

  posts;

  ngOnInit() {
    this.postService.newPostAdded.subscribe(id=>this.getPosts());
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe(posts=>this.posts=posts);
  }
}
