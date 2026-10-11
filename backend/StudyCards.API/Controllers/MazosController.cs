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
    private readonly IValidator<UpdateMazoRequestDto> _updateValidator;

    public MazosController(IMazoRepository repository, IValidator<CreateMazoRequestDto> validator,IValidator<UpdateMazoRequestDto> updateValidator ) 
    {
        _repository = repository;
        _validator = validator;
        _updateValidator = updateValidator;
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
    
    //GET by id
    [HttpGet("{id}")]
    public async Task<IActionResult> GetMazo(int id)
    {
        var mazo = await _repository.GetByIdAsync(id);
        if (mazo == null) return NotFound();
        var response = new MazoResponseDto { Id = mazo.Id, Nombre = mazo.Nombre };
        return Ok(response);
    }
    
    //PUT 
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateMazo(int id, [FromBody] UpdateMazoRequestDto request)
    {
        var validationResult = await _updateValidator.ValidateAsync(request);
        if(!validationResult.IsValid) return BadRequest(validationResult.Errors);

        var mazoExistente = await _repository.GetByIdAsync(id);
        if (mazoExistente == null) return NotFound();
        
        mazoExistente.Nombre = request.Nombre;
        
        await _repository.UpdateAsync(mazoExistente);
        return NoContent();
    }
    
    //Delete
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMazo(int id)
    {
        var mazo = await _repository.GetByIdAsync(id);
        if (mazo == null) return NotFound();
        
        await _repository.DeleteAsync(mazo);
        return NoContent();
    }
}