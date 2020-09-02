using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MVC_CRUD_DiplomadoUASD_AJAX.Models;


namespace MVC_CRUD_DiplomadoUASD_AJAX.Controllers
{
    public class RegistrosController : Controller
    {
        UsersDataDataContext user = new UsersDataDataContext();
        SignIn datos = new SignIn();
        // GET: Registros
        public ActionResult Index()
        {
            var query = from u in user.Users
                        select u;

            return View(query);
        }

        public ActionResult Edit(int id)
        {
            //var query = from u in user.Users
            //where u.IdUser == id
            //select u;

            Users userL = user.Users.Where(u => u.IdUser == id).FirstOrDefault();
            datos.Name = userL.Name;
            datos.LastName = userL.LastName;
            datos.UserName = userL.UserName;
            datos.Email = userL.Email;
            datos.Password = userL.Password;

            return View(datos);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(SignIn userL)
        {

            var query = from u in user.Users
                        where u.Email == userL.Email
                        select u;

            var usu = query.Single();
            usu.Name = userL.Name;
            usu.LastName = userL.LastName;
            usu.UserName = userL.UserName;
            usu.Email = userL.Email;
            usu.Password = userL.Password;


            user.SubmitChanges();

            return RedirectToAction("Index");
        }//Details

        public ActionResult Details(int id)
        {
            //var query = from u in user.Users
            //where u.IdUser == id
            //select u;

            Users userL = user.Users.Where(u => u.IdUser == id).FirstOrDefault();
            datos.Name = userL.Name;
            datos.LastName = userL.LastName;
            datos.UserName = userL.UserName;
            datos.Email = userL.Email;
            datos.Password = userL.Password;

            return View(datos);
        }

        public ActionResult Delete(int id)
        {
            Users userL = user.Users.Where(u => u.IdUser == id).FirstOrDefault();
            datos.Name = userL.Name;
            datos.LastName = userL.LastName;
            datos.UserName = userL.UserName;
            datos.Email = userL.Email;
            datos.Password = userL.Password;

            return View(datos);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(SignIn userL)
        {
            string email = userL.Email;
            var query = (from u in user.Users
                         where u.Email == email
                         select u).FirstOrDefault();

            user.Users.DeleteOnSubmit(query);

            return RedirectToAction("Index");
        }


    }
}