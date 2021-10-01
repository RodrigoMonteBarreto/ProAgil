using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAgil.Domain;
using ProAgil.Repository;

namespace ProAgilWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoController : ControllerBase
    {
        private readonly IProAgilRepository _repository;

        public EventoController(IProAgilRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await _repository.GetAllEventoAsync(true);
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
                var result = await _repository.GetEventoAsyncById(EventoId, true);
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
                var result = await _repository.GetAllEventoAsyncByTema(tema, true);
                return Ok(result);
            }
            catch (Exception)
            {

                return BadRequest("Erro");
            }

        }
        [HttpPost]
        public async Task<IActionResult> Post(Evento e)
        {
            try
            {
                _repository.Add(e);

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