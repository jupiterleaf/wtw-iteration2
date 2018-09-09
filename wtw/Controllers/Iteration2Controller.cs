using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using wtw.filter;

namespace wtw.Controllers
{
    [AdminSuperAdmin]
    public class Iteration2Controller : Controller
    {
        // GET: Iteration2
        public ActionResult Index()
        {
            var url = Request.RawUrl;
            if (url == @"/")
            {
                Response.Redirect("/Iteration2/Index");
            }
            return View();
        }

        public ActionResult Statistics()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Navigation()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Rules()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Rewards()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}