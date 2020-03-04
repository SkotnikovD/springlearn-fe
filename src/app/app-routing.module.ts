import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { LoginComponent } from './login/login.component';
import { NewPostComponent } from './new-post/new-post.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuardService } from './auth-guard.service';


const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'createPost', component: NewPostComponent, canActivate: [AuthGuardService]},
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
