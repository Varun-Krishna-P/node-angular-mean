import { Injectable } from '@angular/core';
import { Post } from '../posts/post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  getPosts(){
    // return [...this.posts];
    this.http.get<{ message: string, posts: Post[]}>('http://localhost:3000/api/posts')
    .subscribe((postData) => {
      this.posts = postData.posts;
      this.postUpdated.next([...this.posts]);
    });

  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string){
    const post: Post = {
      id: null,
      title: title,
      content: content
    };

    this.http.post< { message: string, post_id: string } >('http://localhost:3000/api/posts', post)
    .subscribe((responseData) => {      
      console.log(responseData.message);
      post.id = responseData.post_id;
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
    });
  }

  deletePost(postId: string){
    this.http.delete< { message: string } >('http://localhost:3000/api/posts/'+postId)
    .subscribe((responseData) => {
      console.log(responseData.message);
      // only fetching the post records whose id is not same as postId
      const updatedPost = this.posts.filter( post => post.id != postId)
      this.posts = updatedPost;
      this.postUpdated.next([...this.posts]);
    });
  }

  constructor(private http: HttpClient) { }
}
