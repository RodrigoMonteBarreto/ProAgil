using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAgil.Domain;
using ProAgil.Repository;
using ProAgilWebAPI.Dtos;

namespace ProAgilWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoController : ControllerBase
    {
        private readonly IProAgilRepository _repository;
        public IMapper _mapper;

        public EventoController(IProAgilRepository repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var eventos = await _repository.GetAllEventoAsync(true);

                var results = _mapper.Map<EventoDto[]>(eventos);
                return Ok(results);
            }
            catch (System.Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }

        }
        [HttpGet("{EventoId}")]
        public async Task<IActionResult> Get(int EventoId)
        {
            try
            {
                var evento = await _repository.GetEventoAsyncById(EventoId, true);

                var result = _mapper.Map<EventoDto>(evento);

                return Ok(result);
            }
            catch (System.Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }

        }

        [HttpGet("getByTema/{tema}")]
        public async Task<IActionResult> Get(string tema)
        {
            try
            {
                var eventos = await _repository.GetAllEventoAsyncByTema(tema, true);

                var results = _mapper.Map<EventoDto[]>(eventos);
                return Ok(results);
            }
            catch (Exception)
            {

                return BadRequest("Erro");
            }

        }
        [HttpPost]
        public async Task<IActionResult> Post(EventoDto e)
        {
            try
            {
                var evento = _mapper.Map<Evento>(e);

                _repository.Add(evento);

                if (await _repository.SavechangesAsync())
                {
                    return Created($"/api/evento/{e.Id}", e);
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }

            return BadRequest();
        }

        [HttpPut("{Eventoid}")]
        public async Task<IActionResult> Put(int EventoId, Evento model)
        {
            try
            {
                var evento = await _repository.GetEventoAsyncById(EventoId, false);

                if (evento == null) return NotFound();

                _repository.Update(model);

                if (await _repository.SavechangesAsync())
                {
                    return Created($"/api/evento/{model.Id}", model);
                }

            }
            catch (Exception)
            {

                return BadRequest("Erro");
            }

            return BadRequest();
        }

        [HttpDelete("{Eventoid}")]
        public async Task<IActionResult> Delete(int EventoId)
        {
            try
            {
                var evento = await _repository.GetEventoAsyncById(EventoId, false);

                if (evento == null) return NotFound();

                _repository.Delete(evento);

                if (await _repository.SavechangesAsync())
                {
                    return Ok();
                }

            }
            catch (Exception)
            {

                return BadRequest("Erro");
            }

            return BadRequest();
        }


    }
}