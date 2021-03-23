import { Component,  Inject,  Input,  OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GdevAuthService } from '../../login.service';
import { RestorePasswordLabels } from '../../models/labels.model';

@Component({
  templateUrl: './restore-password.dialog.html',
  styleUrls: ['./restore-password.dialog.scss']
})
export class RestorePasswordDialog implements OnInit {

  emailAccount: string = ''


  constructor(
    @Inject(MAT_DIALOG_DATA) public labels: RestorePasswordLabels,
    public dialog: MatDialogRef<RestorePasswordDialog>,
    public loginS: GdevAuthService
  ) { }

  ngOnInit(): void {
  }

}


