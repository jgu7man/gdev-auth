#  GdevAuth
A library to make easier use oAuth2 from firebase in Angular projects.

## Dependencies
This library only works with [Angular Material](https://material.angular.io/) and [Angular Fire](https://github.com/angular/angularfire) for Firebase.

### First steps
Follow the next steps to start a **Firebase -  Angular project**

 1. Go to the [Firebase console](https://console.firebase.google.com/) and create a project or select some one previusly created
 2. Go to project settings and scroll down to **Fireabase SDK snippet** and select *Configuration* option
 3. Copy the snippet inside of brackets 
 4. Go to your Angular project and go to `src/environments/environment.ts` and paste the snippet there. So it will need to see as below:
 ```ts
 export  const  environment  =  {
	production:  false,
	firebaseConfig:  {
		apiKey:  "AIzaS++++++++++++++++++++++++++",
		authDomain:  "++++++++.firebaseapp.com",
		projectId:  "++++++++",
		storageBucket:  "+++++++++.appspot.com",
		messagingSenderId:  "0000000000",
		appId:  "1:000000000000:web:++++++++++++++",
		measurementId:  "G-++++++++++"
	}
}; 
```
 5. Run the next commands:
	 `ng add @angular/fire`
	 `ng add @angular/material`
	 
 6. At last step and important, this library `npm i -s gdev-auth`

### Additional steps
For the best performance, you need don't forget do something more as:

 1. Go to the firebase project -> **Authentication**
 2. Push the **Start Button**
 3. Go to the **Sing-in method** and select between the next avalible methods
	 1. Email/Password
	 2. Google 
	 3. Facebook
4. You can also in this time or later add **Authorized Domains** below


## How to use it 
You can use the pre-builded components or the login service

### Fast Google Sing In
As fast method to authenticate users with google accounts you can use auth pop-up authenticate method and need activate the **Firebase Google Sing In** method in the console.

```html
<!-- your-components.component.html -->
<gdev-login-button (isLogged)="onLogged($event)" ></gdev-login-button>
```

```ts
import firebase from 'firebase/app'

export class LoginComponent implements OnInit {

	constructor( private  _authService:  GdevAuthService )  {}
	
	onLogged(user: firebase.User) {
		console.log(user)
	}
}
```
After Sign In this button will change from **SingIn** label to **SingOut** label.
You can change labels of template.

|Name|Example & Default |
|---------------------|--------------------------|
| signInLabel: string | [signInLabel]="Sign In"  |
| signOutLabel: string | [signOutLabel]="Sign Out"  |
| adverticeLabel: string | [adverticeLabel]="IMPORTANT"  |
| googleAccountAdverticeLabel: HTML as string| [googleAccountAdverticeLabel]="`<p>You must have a Gmail account <i>(yourusername@<b>gmail.com</b>)</i> to sign in.</p>`"  |
| adverticeConfirmBtn: string | [adverticeConfirmBtn]="Got It"  |


### Pre-builded components
In some routed component you can set the `login-card`
```html
<!-- your-component.html-->
<gdev-login-card  (onSubmit)="onSubmit($event)"></gdev-login-card>
```
  The event emits `email` and `password` in  a interface `GdevLoginFields`
```ts
// your-component.ts
import  {  Component,  OnInit  }  from  '@angular/core';
import  {  GdevAuthService,  GdevLoginFields  }  from  'gdev-auth';

@Component({
	templateUrl:  './login.component.html',
	styleUrls:  ['./login.component.scss']
})
export  class  LoginComponent  implements  OnInit  {

	constructor( private  _authService:  GdevAuthService )  {  }

	ngOnInit():  void  { }

	onSubmit(fields:  GdevLoginFields)  {
		this._authService.emailSignIn(fields.email,  fields.password)
	}
}
```
You can change labels of template.

|Name|Example & Default |
|---------------------|--------------------------|
| signInTitle: string | [signInTitle]="Sign In"  |
| emailLabel: string | [emailLabel]="Email"  |
| passwordLabel: string | [passwordLabel]="Password"  |
| forgotPasswordLabel: string | [forgotPasswordLabel]="I forgot my password"  |
| signInButton: string | [adverticeConfirmBtn]="Sign In"  |



### Social Sing In
For social sing in, you can create your own buttons and use the  `GdevAuthService` methods

```ts
export class LoginComponent implements OnInit {

	constructor( private  _authService:  GdevAuthService )  {  }

	ngOnInit():  void  { }

	onFacebookSingIn(){
		this._authService.facebookSingIn()
			.then(user => console.log(user))
	}

	onGoogleSingIn(){
		this._authService.googleSingIn()
			.then(user => console.log(user))
	}
	
}
```

## Configuration
You can configure some propieties for Sing In methods

### Select the user collection
For firestore's uses and save your users data, you can select the collection where save it. As default collections **Gdev Auth** saves it in a `users` collection. but you can set the collections name in the `GdevAuthService`

```ts
export class LoginComponent implements OnInit {

	constructor( private  _authService:  GdevAuthService )  {
		this._authService.userCollection = 'any-other-collection-name'
	}
}
```

### Unlogged Path
You can easy logout from firebase by the `singOut()` method. But this gonna activate a route-path to navigate when this occurs that is the **root** path: `'/'`.  
As default the methdo return 
```ts
this.router.navigate(  [  this.unloggedPath  ]  );
```
You can change in the service too:
```ts
export class LoginComponent implements OnInit {

	constructor( private  _authService:  GdevAuthService )  {
		this._authService.unloggedPath  = 'any-other-path'
	}
}
```

### Listen email Sing In errors
For the common uses, you can subscribe to a **errors listener** or change the **errors messages**:

```ts
export class LoginComponent implements OnInit {

	constructor( private  _authService:  GdevAuthService )  {
		// Current values as default
		this._authService.notFoundMessage = 'User not found'
		this._authService.invalidMessage = 'Use a valid email address'
		this._authService.wrongPasswordMessage = 'Wrong Password'
	}

	ngOnInit() {
		this._authService.listenForErros().subscribe(
			(message:string) => console.log(message)
		)
	}
}
```


## Extras
### Restore Password
For use the firestore method to restore password you can use the `restorePwd`
```ts
export class LoginComponent implements OnInit {

	public emailToRestore: string
	constructor( private  _authService:  GdevAuthService )  {}

	onRestorePassword(){
		this._authService.restorePwd(
		this.emailToRestore, 
		'any-message-to-alert-that-a-mail-was-sent'
		)
	}
```

Or you can use the **Restore Password Component** too, that you can insert in any HTML document for request and email address to send a firebase restore mail:
```html
<gdev-restore-password></gdev-restore-password>
```

|Name|Example & Default |
|---------------------|--------------------------|
| emailLabel: string | [emailLabel]="Email"  |
| exampleLabel: string | [exampleLabel]="example@gmail.com"  |
| requiredLabel: string | [requiredLabel]="This field is required"  |
| cancelButtonLabel: string | [cancelButtonLabel]="Cancel"  |
| sendButtonLabel: string | [sendButtonLabel]="Send"  |
| confirmationMessage: string | [confirmationMessage]="`Sending an email to ${email} for restore password`"  |



This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.9.

> Written with [StackEdit](https://stackedit.io/).
