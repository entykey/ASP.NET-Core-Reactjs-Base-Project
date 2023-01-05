using ASP.NET_Core_Reactjs_Base_Project.Models;
using ASP.NET_Core_Reactjs_Base_Project.Data;
using ASP.NET_Core_Reactjs_Base_Project.Data.Models;
using System.Collections.Generic;

namespace ASP.NET_Core_Reactjs_Base_Project.Services.Interfaces
{
    

    public interface IUserService
    {
        IEnumerable<UserViewModel> All();
        void Add(User user);
        bool Exists(string id);
    }
}