import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../_models/Evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  
  baseURL = 'https://localhost:5001/api/evento';
  
  constructor(private http: HttpClient){}
  
  
  getAllEvento(): Observable<Evento[]>{
    return this.http.get<Evento[]>(this.baseURL);
  }
  getEventoByTema(tema: string): Observable<Evento[]>{
    return this.http.get<Evento[]>(`${this.baseURL}/getByTema/${tema}`);
  }
  getEventoById(id: number): Observable<Evento>{
    return this.http.get<Evento>(`${this.baseURL}/${id}`);
  }
  
  PostEvento(evento: Evento): Observable<Evento>{
    return this.http.post<Evento>(this.baseURL, evento);
  }
  
  PutEvento(evento: Evento): Observable<Evento>{
    return this.http.put<Evento>(`${this.baseURL}/${evento.id}`, evento);
  }

  deleteEvento(id: number): Observable<Evento>{
    return this.http.delete<Evento>(`${this.baseURL}/${id}`);
  }
  
}
