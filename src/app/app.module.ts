import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { PostService } from './post.service';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { NewPostComponent } from './new-post/new-post.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuardService } from './auth-guard.service';
import { AvatarService } from './avatar.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { HttpErrorInterceptor } from './http-error.interceptor';

@NgModule({
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule
   ],
   declarations: [
      AppComponent,
      PostsComponent,
      TopBarComponent,
      LoginComponent,
      NewPostComponent,
      SignupComponent
   ],
   providers: [
      PostService,
      AuthService,
      UserService,
      AuthGuardService,
      AvatarService,
      // {
      //    provide: HTTP_INTERCEPTORS,
      //    useClass: HttpErrorInterceptor,
      //    multi: true
      //  }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
