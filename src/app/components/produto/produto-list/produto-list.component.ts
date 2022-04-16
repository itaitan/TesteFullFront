import { Produto } from './../../../models/produto';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.scss']
})
export class ProdutoListComponent implements OnInit {
  ELEMENT_DATA: Produto[] = [];

  displayedColumns: string[] = [
    'id',
    'nome',
    'preco',
    'quantidade',
    'descricao',
    'acoes',
  ];
  dataSource = new MatTableDataSource<Produto>(this.ELEMENT_DATA);

  constructor(private service: ProdutoService) {}

  ngOnInit(): void {
    this.findAll();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  findAll() {
    this.service.findAll().subscribe((resposta) => {

      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Produto>(resposta);
      this.dataSource.paginator = this.paginator;
    });
  }
}
