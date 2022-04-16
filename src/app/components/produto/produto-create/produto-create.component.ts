import { Produto } from './../../../models/produto';
import { ProdutoService } from './../../../services/produto.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.scss'],
})
export class ProdutoCreateComponent implements OnInit {
  produto: Produto = {
    nome: '',
    preco: 0,
    quantidade: 0,
    descricao: '',
  };

  nome: FormControl = new FormControl();
  preco: FormControl = new FormControl();
  quantidade: FormControl = new FormControl();
  descricao: FormControl = new FormControl();

  constructor(
    private service: ProdutoService,
    private tost: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  create(): void {
    this.service.create(this.produto).subscribe(
      (resposta) => {
        this.tost.success('Produto cadastrado com sucesso.', 'Cadastro');
        this.router.navigate(['produto']);
      },
      (ex) => {
        if (ex.error.errors) {
          ex.error.errors.forEach((element) => {
            this.tost.error(element.message);
          });
        } else {
          this.tost.error(ex.error.message);
        }
      }
    );
  }

  validaCampos(): boolean {
    return (
      this.nome.valid &&
      this.preco.valid &&
      this.quantidade.valid &&
      this.descricao.valid
    );
  }
}
