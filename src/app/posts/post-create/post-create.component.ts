import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms'
import {Post} from "../post.model"
import { PostsService } from "../../service/posts.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";

  constructor(public postsService: PostsService) { }

  ngOnInit(): void {
  }

  onAddPost(postForm: NgForm) {
    
    if(postForm.invalid){
      return;
    }

    this.postsService.addPost(postForm.value.title, postForm.value.content);
    console.log("Post added successfully!");
    postForm.resetForm();
  }

}
