import { Location } from '@angular/common';
import { Component,  EventEmitter,  Input,  OnInit, Output } from '@angular/core';
import { GdevAuthService } from '../../login.service';

@Component({
  selector: 'gdev-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {

  emailAccount: string = ''
  @Input() public autoSend: boolean = true

  @Input() public emailLabel: string = 'Email'
  @Input() public exampleLabel: string = 'example@gmail.com'
  @Input() public requiredLabel: string = 'This field is required'
  @Input() public cancelButtonLabel: string = 'Cancel'
  @Input() public sendButtonLabel: string = 'Send'
  @Input() public confirmationMessage: string = ''

  @Output() public onSubmit = new EventEmitter<void>()
  constructor (
    public login_: GdevAuthService,
    public location_: Location
  ) { }

  ngOnInit(): void {
  }

  onSubmitClick() {
    if (this.autoSend) {
      this.login_.restorePwd(this.emailAccount, this.confirmationMessage)
    } else {
      this.onSubmit.emit()
    }
  }
}
