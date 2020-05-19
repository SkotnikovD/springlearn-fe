import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { handleError } from '../error-handler';
import { catchError } from 'rxjs/operators';

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
      'name' : [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      'login' : [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      'password' : [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    })
  }

  ngOnInit() {
  }

  signup(signupInfo){
    this.authService.signup(signupInfo.name, signupInfo.login, signupInfo.password, this.selectedFile ? this.selectedFile.file : undefined)
    .subscribe(resp=> this.router.navigate(['']),
    error=> {console.error(error);  alert (`Error: ${error.error.clientMessage}`)});
  }

  uploadAvatar(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    });

    reader.readAsDataURL(file);
  }

  get name() { return this.signupForm.get('name'); }

  get login() { return this.signupForm.get('login'); }

  get password() { return this.signupForm.get('password'); }

}
