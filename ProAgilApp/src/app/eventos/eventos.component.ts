import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Evento } from '../_models/Evento';
import { EventoService } from '../_services/evento.service';
import {BsLocaleService} from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { ToastrService } from 'ngx-toastr';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  titulo = "Eventos";
  dataEvento: string = "";
  eventosFiltrados!: Evento[]  ;
  eventos!: Evento[]  ;
  evento!: Evento ;
  modoSalvar ='post';
  imagemLargura = 100;
  imagemMargem = 2;
  mostrarImagem = false;
  registerForm!: FormGroup;
  bodyDeletarEvento = '';
  
  
  _filtroLista = '';
  
  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private toastr: ToastrService
    
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
    
    
    editarEvento(evento: Evento, template: any)
    {
      this.modoSalvar = 'put';
      this.openModal(template);
      this.evento = evento;
      this.registerForm.patchValue(evento);
    }
    
    novoEvento(template: any)
    {
      this.modoSalvar = 'post'
      this.openModal(template);
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
      

      excluirEvento(evento: Evento, template: any) {
        this.openModal(template);
        this.evento = evento;
        this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, C??digo: ${evento.id}`;
      }

      confirmeDelete(template: any) {
        this.eventoService.deleteEvento(this.evento.id).subscribe(
          () => {
              template.hide();
              this.getEventos();
              this.toastr.success('Deletado com Sucesso.');
            }, error => {
              this.toastr.error('Erro ao tentar deletar.');
              console.log(error);
            }
        );
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
      onFileChange(event: any){
        console.log(event);
      }
      
      salvarAlteracao(template: any){
        if(this.registerForm.valid)
        {
          if(this.modoSalvar === 'post'){
            this.evento = Object.assign({}, this.registerForm.value);
            this.eventoService.PostEvento(this.evento).subscribe(
              (novoEvento: Evento) => {
                console.log(novoEvento);
                template.hide();
                this.getEventos();
                this.toastr.success('Inserido com Sucesso.');
              }, error =>{
                this.toastr.error(`Erro ao Inserir:${error}`);
                console.log(error);
              }
              
              );
            }
            else {
              this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);
              this.eventoService.PutEvento(this.evento).subscribe(
                () => {                 
                  template.hide();
                  this.getEventos();
                  this.toastr.success('Editado com Sucesso.');
                }, error =>{
                  this.toastr.error(`Erro ao Editar:${error}`);
                  console.log(error);
                }
                
                );
              }
            }
          }
          
          getEventos()
          {
            this.eventoService.getAllEvento().subscribe(
              (_eventos: Evento[]) => {
                this.eventos = _eventos
                this.eventosFiltrados = this.eventos;
                
              },
              error => {
                this.toastr.error(`Erro ao tentar carregar eventos:${error}`);
              }
              );
            }
            
          }
          