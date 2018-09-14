using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using wtw.filter;
using wtw;

namespace wtw.Controllers
{
    public class MyViewModel {
        public IEnumerable<accident> accidents { get; set; }
        public IEnumerable<construction> constructions { get; set; }
    }
    [AdminSuperAdmin]
    public class Iteration2Controller : Controller
    {
        private wtwEntities1 db = new wtwEntities1();

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

        public async Task<ActionResult> Navigation()
        {
            ViewBag.Message = "Your application description page.";
            var modelaccident = await db.accidents.ToListAsync();
            var modelconstruction = await db.constructions.ToListAsync();
            var myModel = new MyViewModel
            {
                accidents = modelaccident,
                constructions = modelconstruction
            };
            return View(myModel);
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