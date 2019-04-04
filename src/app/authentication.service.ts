import { Injectable } from '@angular/core';
import { User } from './user';
import { PersistenceService, StorageType } from 'angular-persistence';



@Injectable({
  providedIn: 'root'
})


export class AuthenticationService {

  static USER_SESSION = 'loggedUser';
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private persistenceService: PersistenceService) { }

  checkUser(user:User):boolean{
    return user.password == 'test1234'
  }

  getLoggedInUser():User{
    let user = new User()
    user.email = this.persistenceService.get(AuthenticationService.USER_SESSION, StorageType.SESSION)
    return user
  }

  isLoggedIn():boolean{
    return this.getLoggedInUser().email != null
  }



  loginUser(user:User){
    this.persistenceService.set(AuthenticationService.USER_SESSION, user.email, {type: StorageType.SESSION})
  }

  logoutUser(){
    this.persistenceService.remove(AuthenticationService.USER_SESSION, StorageType.SESSION)
  }
}
