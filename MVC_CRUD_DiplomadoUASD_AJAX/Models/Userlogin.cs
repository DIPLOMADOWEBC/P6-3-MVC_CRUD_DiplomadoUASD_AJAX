using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MVC_CRUD_DiplomadoUASD_AJAX.Models
{
    public class Userlogin
    {
        [EmailAddress]
        [Required(ErrorMessage = "El Email Es Requerido")]
        [Display(Name = "Correo Electronico")]
        public string Email { get; set; }

        [StringLength(100, ErrorMessage = "El Numero de {0} debe ser al menos {2}", MinimumLength = 3)]
        [Required(ErrorMessage = "El Password Es Requerido")]
        [Display(Name = "Contraseña")]
        public string Password { get; set; }

        public string Username { get; set; }
        UsersDataDataContext user = new UsersDataDataContext();

        public bool login()
        {
            var query = from u in user.Users
                        where u.Email == Email && u.Password == Password
                        select u;
            if (query.Count() > 0)
            {
                var datos = query.ToList();
                foreach (var Data in datos)
                {
                    Username = Data.UserName;
                }
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}