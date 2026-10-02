using FluentValidation;
using StudyCards.Application.Features.Mazos.DTOs;

namespace StudyCards.Application.Features.Mazos.Validators;

public class CreateMazoValidator : AbstractValidator<CreateMazoRequestDto> 
{
    public CreateMazoValidator() 
    {
        RuleFor(x => x.Nombre)
            .NotEmpty().WithMessage("El nombre del mazo no puede estar vacío.")
            .MinimumLength(3).WithMessage("El mazo debe tener al menos 3 caracteres.")
            .MaximumLength(100).WithMessage("El mazo es demasiado largo.");
    }
}