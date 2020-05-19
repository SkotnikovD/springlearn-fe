import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  newPostForm
  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private router: Router,) 
    { 
    this.newPostForm=formBuilder.group({
      'text' : [null, Validators.required]
    })
  }

  createPost(post){
    this.postService.createPost(post).subscribe(()=>this.router.navigate(['']));
  }

  ngOnInit() {
  }

  get postText() { return this.newPostForm.get('text'); }

}
