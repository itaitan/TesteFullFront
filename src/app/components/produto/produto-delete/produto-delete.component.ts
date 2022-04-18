import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProdutoService } from './../../../services/produto.service';
import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto';

@Component({
  selector: 'app-produto-delete',
  templateUrl: './produto-delete.component.html',
  styleUrls: ['./produto-delete.component.scss'],
})
export class ProdutoDeleteComponent implements OnInit {
  produto: Produto = {
    nome: '',
    preco: 0,
    quantidade: 0,
    descricao: '',
  };

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

  delete(): void {
    this.service.delete(this.produto.id).subscribe((resposta) => {
      this.tost.success(`${resposta.mensagem}`, 'Deletado');
      this.router.navigate(['produtos']);
    });
  }
}
