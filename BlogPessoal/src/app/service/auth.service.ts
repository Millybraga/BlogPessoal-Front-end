import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor (
    private http: HttpClient,
    private router: Router
    ) { }

    token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }


  entrar(userLogin: UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin> (`${environment.server}/usuarios/logar`, userLogin)
  }

  cadastrar(user: User): Observable<User>{
    return this.http.post<User>(`${environment.server}/usuarios/cadastrar`, user)
  }

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${environment.server}/usuarios`, this.token)
  }

  getByIdUser(id: number): Observable<User>{
    return this.http.get<User>(`${environment.server}/usuarios/${id}`, this.token)
  }

  putUser(user: User) : Observable<User>{
    return this.http.put<User>(`${environment.server}/usuarios`, user, this.token)
  }


  logado(){
    let ok: boolean = false

    if(environment.token != ""){
      ok = true
    }

    return ok
    
  }

}
