import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GdevAuthService } from '../../login.service';

@Component({
  selector: 'gdev-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent implements OnInit {

  @Input() public signOutLabel: string = 'Sign Out'
  @Input() public signInLabel: string = 'Sign In'
  @Input() public adverticeLabel: string = 'IMPORTANT'
  @Input() public googleAccountAdverticeLabel: string = '<p>You must have a Gmail account <i>(yourusername@<b>gmail.com</b>)</i> to sign in.</p>'
  @Input() public adverticeConfirmBtn: string = 'Got It'

  @Input() accountAdvertice: boolean = true
  @Output() isLogged: EventEmitter<any> = new EventEmitter()
  constructor(
    public dialog: MatDialog,
    public _login: GdevAuthService,
  ) { }

  ngOnInit() {
    this._login.user$.pipe().subscribe( user => {
      if ( user ) { this.isLogged.emit( user ) }

    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginButtonDialog, {
      width: '350px',
      data: {
        adverticeLabel: this.adverticeLabel,
        googleAccountAdverticeLabel: this.googleAccountAdverticeLabel,
        adverticeConfirmBtn: this.adverticeConfirmBtn
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this._login.googleSingIn().then( res => {
        console.log( 'logged' )
      })
    });
  }


}

@Component({
  selector: 'aSmart-login-button-dialog',
  templateUrl: './login-button-dialog.html'
})
export class LoginButtonDialog {

  constructor(
    public dialogRef: MatDialogRef<LoginButtonDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
   ) {}

  onClick(): void {
    this.dialogRef.close();
  }

}
