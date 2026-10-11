using FluentValidation;
using StudyCards.Application.Features.Mazos.DTOs;

namespace StudyCards.Application.Features.Mazos.Validators;

public class UpdateMazoValidator:  AbstractValidator<UpdateMazoRequestDto>
{
    public UpdateMazoValidator()
    {
        RuleFor(x => x.Nombre)
            .NotEmpty().WithMessage("El nombre del mazo no puede estar vacio")
            .MinimumLength(3).WithMessage("El nombre del mazo debe tener un nombre mayor de 3 caracteres")
            .MaximumLength(100).WithMessage("El mazo debe tener un nombre menor de 100 caracteres");
    }
}

