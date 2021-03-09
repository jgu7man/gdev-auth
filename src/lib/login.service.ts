import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import firebase from 'firebase/app';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GdevAuthService {

  user$: Observable<any>
  unloggedPath: string = '/'

  listenForErros: Subject<string> = new Subject();
  notFoundMessage: string = 'User not found'
  invalidMessage: string = 'Use a valid email address'
  wrongPasswordMessage: string = 'Wrong Password'
  userCollection: string = 'users'

  constructor (
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private _snack: MatSnackBar
  ) {



    //? Método para cargar el usuario autenticado de manera asíncrona
    this.user$ = this.afAuth.authState.pipe(
      switchMap( user => {
        return user ?
          this.afs.doc<firebase.User>( `${this.userCollection}/${ user.uid }` ).valueChanges() :
          of( null );
      } )
    )
  }



  // ? Iniciar sesión con una cuenta google
  async googleSingIn() {

    // Abre el popup de autenticación
    const provider = new firebase.auth.GoogleAuthProvider();
    var credential = await this.afAuth.signInWithPopup( provider )

    // Guardar los datos de cliente nuevo en firebase
    if(credential.user) return this.updateUserData( credential.user )
  }

  async facebookSingIn() {

    // Abre el popup de autenticación
    const provider = new firebase.auth.FacebookAuthProvider();
    var credential = await this.afAuth.signInWithPopup( provider )

    // Guardar los datos de cliente nuevo en firebase
    if(credential.user) return this.updateUserData( credential.user )
  }

  async emailSignIn( email:string, pwd: string ) {
    try {
      var credential = await this.afAuth.signInWithEmailAndPassword( email, pwd )
      if(credential.user) return this.updateUserData( credential.user )
    } catch ( error ) {
      console.log( error )
      if (error.code.includes('not-found')) {
        this.listenForErros.next(this.notFoundMessage)
        // alert( this.notFoundMessage )
      }
      if (error.code.includes('invalid')) {
        this.listenForErros.next(this.invalidMessage)
        // alert( this.invalidMessage )
      }
      if ( error.code.includes( 'wrong-password' ) ) {
        // alert( this.wrongPasswordMessage )
        this.listenForErros.next(this.wrongPasswordMessage)
      }
    }
  }

  private async updateUserData( { uid, email, displayName, photoURL }: firebase.User ) {
    // Buscar el usuario en la base de datos de firebase
    const userRef: AngularFirestoreDocument<firebase.User> = this.afs.doc( `users/${ uid }` );
    const userDoc = await this.afs.collection( this.userCollection ).ref.doc( uid ).get()
    const dateRegist = new Date()

    // Si no existe, se agrega fecha de registro
    if ( userDoc.exists ) {
      var data: any = { uid, email, displayName, photoURL }
      userRef.set( data, { merge: true } )
    } else {
      var newData: any = { uid, email, displayName, photoURL, dateRegist }
      userRef.set( newData, { merge: true } )
    }


    this.router.navigate( [ '' ] );
  }

  restorePwd(email: string, message?: string) {
    var messageSent = !message ? `Sending an email to ${email} for restore password` : message
    this.afAuth.sendPasswordResetEmail( email )
      .then( res => {
        this._snack.open( messageSent )
      }).catch(error => {
        console.error(error);
      } )
  }



  //? Sing out

  async singOut() {
    await this.afAuth.signOut();
    return this.router.navigate( [ this.unloggedPath ] );
  }

}
