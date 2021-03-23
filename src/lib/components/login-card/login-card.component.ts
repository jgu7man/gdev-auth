import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'gdev-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent implements OnInit {

  fields: GdevLoginFields = {
    email: '', password:''
  }

  hide = true;

  @Input() public signInTitle:string = 'Sign In'
  @Input() public emailLabel:string = 'Email'
  @Input() public passwordLabel:string = 'Password'
  @Input() public forgotPasswordLabel:string = 'I forgot my password'
  @Input() public signInButton:string = 'Sign In'

  @Input() color: string = ''
  @Input() background: string = ''

  @Output() onSubmit = new EventEmitter<GdevLoginFields>()
  @Output() restorePwd = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

}

export interface GdevLoginFields {
  email: string,
  password: string
}
