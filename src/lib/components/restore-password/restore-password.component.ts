import { Component,  Input,  OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { GdevAuthService } from '../../login.service';

@Component({
  selector: 'gdev-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {

  emailAccount: string = ''

  @Input() public emailLabel: string = 'Email'
  @Input() public exampleLabel: string = 'example@gmail.com'
  @Input() public requiredLabel: string = 'This field is required'
  @Input() public cancelButtonLabel: string = 'Cancel'
  @Input() public sendButtonLabel: string = 'Send'
  @Input() public confirmationMessage: string = ''
  constructor (
    public dialog: MatDialogRef<RestorePasswordComponent>,
    public loginS: GdevAuthService
  ) { }

  ngOnInit(): void {
  }

}
