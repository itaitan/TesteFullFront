import { Produto } from './../../../models/produto';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProdutoService } from './../../../services/produto.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produto-update',
  templateUrl: './produto-update.component.html',
  styleUrls: ['./produto-update.component.scss']
})
export class ProdutoUpdateComponent implements OnInit {
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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.produto.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.produto.id).subscribe((resposta) => {
      this.produto = resposta;
    });
  }

  update(): void {
    this.service.update(this.produto).subscribe(
      (resposta) => {
        this.tost.success(`${resposta.mensagem}`, 'Atualizar');
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
