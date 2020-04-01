import { Component, OnInit, OnDestroy } from '@angular/core';
import {Post} from "../post.model"
import { PostsService } from "../../service/posts.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  private postSubscription: Subscription;

  // postsService: PostsService;
  // posts = [
  //   {title: 'First Post', content: 'First post\s content'},
  //   {title: 'Second Post', content: 'Second post\s content'},
  //   {title: 'Third Post', content: 'Third post\s content'},
  // ];
  // constructor(postsService: PostsService) { 
  //   this.postsService = postsService;
  // }

  //  shortform

  constructor(public postsService: PostsService){ }

  ngOnInit(): void {
    this.postsService.getPosts();
    this.postSubscription = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }

  onDeletePost(post_id: string){
    this.postsService.deletePost(post_id);
  }

}
