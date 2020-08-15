using AutoMapper;
using Data = DataRepository.DataContext.Models;
using Domain = DomainModels.CCSModels;

namespace DataRepository.AutoMapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Data.Person, Domain.Person>();

            CreateMap<Domain.Employee, Data.Employee>().ForPath(s => s.Person.BirthDate, g => g.MapFrom(f => f.Person.BirthDate))
                                                       .ForPath(s => s.Person.FirstName, g => g.MapFrom(f => f.Person.FirstName))
                                                       .ForPath(s => s.Person.LastName, g => g.MapFrom(f => f.Person.LastName))
                                                       .ReverseMap();
        }
    }
}
