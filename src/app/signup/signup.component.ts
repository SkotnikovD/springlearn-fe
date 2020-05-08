import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm; 

  selectedFile: ImageSnippet;

  constructor(private formBuilder: FormBuilder,
    private authService : AuthService,
    private router: Router) { 
    this.signupForm=formBuilder.group({
      'name' : '',
      'login' : '',
      'password' : '',
    })
  }

  ngOnInit() {
  }

  signup(signupInfo){
    this.authService.signup(signupInfo.name, signupInfo.login, signupInfo.password, this.selectedFile ? this.selectedFile.file : undefined)
    .subscribe(resp=> this.router.navigate(['']));
  }

  uploadAvatar(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    });

    reader.readAsDataURL(file);
  }

}
