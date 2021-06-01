import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user: User = new User
  confirmeSenha: string
  tipoUser: string

  constructor(
    private authService: AuthService,
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0, 0) //X=0 e Y=0
  }

  confirmarSenha(event: any) {
    this.confirmeSenha = event.target.value
  }
  tipoUsuario(event: any) {
    this.tipoUser = event.target.value
  }

  cadastrar() {
    this.user.tipo = this.tipoUser
    
    if (this.user.senha != this.confirmeSenha) {
      alert("As senhas estão incorretas")
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/entrar'])

        alert("Usuário cadastrado com sucesso!")
      })
    }
  }

}
