namespace ASP.NET_Core_Reactjs_Base_Project.Extensions.Mapping
{
    using AutoMapper;
    using Data.Models;
    using Models;

    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // List all mapping objects here
            CreateMap<User, UserViewModel>();
        }
    }
}