using AutoMapper;
using Domain = DomainModels.CCSModels;
using Dto = Api.ApiDto;

namespace Api.AutoMapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Dto.Employee, Domain.Employee>().ForPath(s => s.Person.BirthDate, g => g.MapFrom(f => f.BirthDate))
                                                      .ForPath(s => s.Person.FirstName, g => g.MapFrom(f => f.FirstName))
                                                      .ForPath(s => s.Person.LastName, g => g.MapFrom(f => f.LastName))
                                                      .ReverseMap();
        }
    }
}
