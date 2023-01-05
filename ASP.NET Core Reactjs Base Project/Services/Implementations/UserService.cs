namespace ASP.NET_Core_Reactjs_Base_Project.Services.Implementations
{
    using ASP.NET_Core_Reactjs_Base_Project.Models;
    using AutoMapper.QueryableExtensions;
    using ASP.NET_Core_Reactjs_Base_Project.Data;
    using ASP.NET_Core_Reactjs_Base_Project.Data.Models;
    using ASP.NET_Core_Reactjs_Base_Project.Services.Interfaces;
    using System.Collections.Generic;
    using System.Linq;
    using AutoMapper;   // for .NET 7.x : must declare this!

    public class UserService : IUserService
    {
        private readonly ExampleDbContext db;

        // Define IMapper in controller / service (for .NET 7) :
        // preference: https://stackoverflow.com/questions/40275195/how-to-set-up-automapper-in-asp-net-core
        private readonly IMapper _mapper;

        public UserService(ExampleDbContext db, IMapper mapper)
        {
            this.db = db;
            _mapper = mapper;   // add mapper (for .NET 7)
        }


        // this line get error after migrating to .NET 7
        public IEnumerable<UserViewModel> All()
            => this.db.Users.ProjectTo<UserViewModel>(_mapper.ConfigurationProvider);   // 1 argument: .NET 7.x
        // => this.db.Users.ProjectTo<UserViewModel>(); // 0 argument: .NET 6.x -



        // TODO: Maybe we shouldn't pass a model from db
        // -- use autmapper
        public void Add(User user)
        {
            var exists = Exists(user.Id);

            // utilise the mapping :)
            var _mappedUser = _mapper.Map<User>(user);      // new

            if (!exists)
            {
                //this.db.Users.Add(user);
                this.db.Users.Add(_mappedUser);             // new
                this.db.SaveChanges();
            }

        }

        public bool Exists(string id)
            => this.db.Users.Any(u => u.Id == id);

    }
}