import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Evento } from '../_models/Evento';
import { EventoService } from '../_services/evento.service';
import {BsLocaleService} from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  
  eventosFiltrados!: Evento[]  ;
  eventos!: Evento[]  ;
  evento!: Evento ;
  imagemLargura = 100;
  imagemMargem = 2;
  mostrarImagem = false;
  registerForm!: FormGroup;
  
  _filtroLista = '';
  
  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private localeService: BsLocaleService
    
    ) { 
      this.localeService.use('pt-br');
    }
    
    get filtroLista(): string{
      return this._filtroLista;
    }
    
    set filtroLista(value: string)
    {
      this._filtroLista = value;
      this.eventosFiltrados = this.filtroLista ? this.filtraEvento(this.filtroLista) : this.eventos;
    }
    
    openModal(template: any){
      this.registerForm.reset();
      template.show();
    }
    
    ngOnInit() {
      this.validation();
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
      
      validation(){
        
        this.registerForm = this.fb.group({
          tema: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
          local: ['',Validators.required],
          dataEvento: ['',Validators.required],
          imagemURL: ['',Validators.required],
          qtdPessoas: ['',[Validators.required, Validators.max(120000)]],
          telefone: ['',Validators.required],
          email: ['', [Validators.required, Validators.email]],
          
        })
      }
      
      salvarAlteracao(template: any){
        if(this.registerForm.valid)
        {
          this.evento = Object.assign({}, this.registerForm.value);
          this.eventoService.PostEvento(this.evento).subscribe(
            (novoEvento: Evento) => {
            console.log(novoEvento);
            template.hide();
            this.getEventos();
            }, error =>{
              console.log(error);
            }
            
          );
        }
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
      