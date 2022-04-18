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

  quantidadeModel = ''
  precoModel = ''
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
    this.produto.quantidade = Number(this.quantidadeModel)
    this.produto.preco = Number(this.precoModel)
    this.service.create(this.produto).subscribe(
      (resposta) => {
        this.tost.success(`${resposta.mensagem}`, 'Cadastro');
        this.router.navigate(['produtos']);
      },
      (ex) => {

        if (ex.error.mensagem) {
          this.tost.error(ex.error.mensagem, 'Falha');
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
