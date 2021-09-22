import { Component, OnInit } from '@angular/core';
import { Evento } from '../_models/Evento';
import { EventoService } from '../_services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  
  
  _filtroLista!: string;
  get filtroLista(): string{
    return this._filtroLista;
  }
  
  set filtroLista(value: string)
  {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtraEvento(this.filtroLista) : this.eventos;
  }
  
  eventosFiltrados!: Evento[]  ;
  eventos!: Evento[]  ;
  imagemLargura = 100;
  imagemMargem = 2;
  mostrarImagem = false;
  
  constructor(private eventoService: EventoService) { }
  
  ngOnInit() {
    this.getEventos();
  }
  
  filtraEvento(filtrarPor: string): Evento[]
  {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      ( evento: { tema: string; }) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
      );
    }
    
    alternarImagem()
    {
      this.mostrarImagem = !this.mostrarImagem;
    }
    
    getEventos()
    {
      this.eventoService.getAllEvento().subscribe(
      (_eventos: Evento[]) => {
        this.eventos = _eventos
        this.eventosFiltrados = this.eventos;
        console.log(_eventos);
      },
      error => {
        console.log(error);
      }
      );
    }
    
  }
  