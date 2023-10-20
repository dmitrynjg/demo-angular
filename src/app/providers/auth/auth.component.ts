import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-auth-provider',
  templateUrl: './auth.component.html',
})
export class AuthProvider implements OnInit {
  constructor(public userService: UserService) {}
  
  ngOnInit(): void {
    this.userService.checkIsAuth()
  }
}
