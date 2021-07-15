import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User()
  idUser: number
  confirmeSenha: string
  tipoUser: string

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit() {

    window.scroll(0,0) //quando entrar na tela, irá ajustar corretamente no inicio


    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }

   this.idUser =   this.route.snapshot.params['id']
   this.findByIdUser(this.idUser)
  }
  
  confirmarSenha(event: any) {
    this.confirmeSenha = event.target.value
  }
  tipoUsuario(event: any) {
    this.tipoUser = event.target.value
  }

  findByIdUser(id: number){
    this.authService.getByIdUser(id).subscribe((resp: User) => {
      this.user = resp
    })
  }

  atualizar(){
    this.user.tipo = this.tipoUser
    
    if (this.user.senha != this.confirmeSenha) {
      alert("As senhas estão incorretas")
    } else {
      this.authService.putUser(this.user).subscribe((resp: User) => {
        this.user = resp
        alert("Usuário atualizado com sucesso! Faça o login novamente.")
        environment.token = ''
        environment.foto = ''
        environment.nome = ''
        environment.id = 0
        this.router.navigate(['/logar'])
      })
    }
  }

 


}


