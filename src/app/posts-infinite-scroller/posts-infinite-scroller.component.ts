import { Component, OnInit } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { PostWithAuthor } from '../models/post';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { PostService } from '../post.service';
import { GetUserDto } from '../models/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'posts-infinite-scroller',
  templateUrl: './posts-infinite-scroller.component.html',
  styleUrls: ['./posts-infinite-scroller.component.scss']
})
export class InfiniteScrollerComponent implements OnInit {

  dataSource: FactsDataSource;
  currentUser$: Observable<GetUserDto>;

  constructor(private postService: PostService,
    private authService : AuthService,
    ) {
    this.dataSource = new FactsDataSource(postService);
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
  }

  deletePost(post: PostWithAuthor): void{
    this.postService.deletePost(post.postId).subscribe(undef=>this.dataSource.removeElement(post.postId))
  }
}

export class FactsDataSource extends DataSource<PostWithAuthor | undefined> {
  private cachedFacts = Array.from<PostWithAuthor>({ length: 0 });
  private dataStream = new BehaviorSubject<(PostWithAuthor | undefined)[]>(this.cachedFacts);
  private subscription = new Subscription();

  constructor(private postService: PostService) {
    super();
    this._fetchNextPage()
  }

  connect(collectionViewer: CollectionViewer): Observable<(PostWithAuthor | undefined)[] | ReadonlyArray<PostWithAuthor | undefined>> {
    this.subscription.add(collectionViewer.viewChange.subscribe(range => {
      if(range.end>this.cachedFacts.length-1){
        this._fetchNextPage();
      }
    }));
    return this.dataStream;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.subscription.unsubscribe();
  }

  removeElement(postId: number): void{
    let removeElemIndx = this.cachedFacts.findIndex((value, index, arr) =>{
      if (value.postId==postId){
        return true;
      }
    })
    this.cachedFacts.splice(removeElemIndx, 1)
    this.dataStream.next(this.cachedFacts); 
  }

  private pageSize = 3;
  
  private _fetchNextPage(): void {
    let lastId : number = null;
    if(this.cachedFacts.length!=0){
      lastId = this.cachedFacts[this.cachedFacts.length-1].postId
    }
    this.postService.getPosts(lastId, this.pageSize).subscribe(res => {
      this.cachedFacts = this.cachedFacts.concat(res);
      this.dataStream.next(this.cachedFacts);
    });
  
  }
}
