using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using StudyCards.Application.Interfaces;
using StudyCards.Domain.Entities;
using StudyCards.Application.Features.Mazos.DTOs;

namespace StudyCards.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MazosController : ControllerBase 
{
    private readonly IMazoRepository _repository;
    private readonly IValidator<CreateMazoRequestDto> _validator;

    public MazosController(IMazoRepository repository, IValidator<CreateMazoRequestDto> validator) 
    {
        _repository = repository;
        _validator = validator;
    }

    [HttpGet]
    public async Task<IActionResult> GetMazos() 
    {
        var mazos = await _repository.GetAllAsync();
        
        // Mapeamos de Entidad a DTO
        var response = mazos.Select(m => new MazoResponseDto 
        {
            Id = m.Id,
            Nombre = m.Nombre
        });

        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> CrearMazo([FromBody] CreateMazoRequestDto request) 
    {
        // 1. Validar
        var validationResult = await _validator.ValidateAsync(request);
        if (!validationResult.IsValid) 
        {
            return BadRequest(validationResult.Errors); // HTTP 400
        }

        // 2. Mapear DTO a Entidad
        var nuevoMazo = new MazoGlobal { Nombre = request.Nombre };

        // 3. Guardar
        var mazoCreado = await _repository.AddAsync(nuevoMazo);
        
        // 4. Mapear respuesta
        var response = new MazoResponseDto 
        {
            Id = mazoCreado.Id,
            Nombre = mazoCreado.Nombre
        };

        return CreatedAtAction(nameof(GetMazos), new { id = response.Id }, response);
    }
}