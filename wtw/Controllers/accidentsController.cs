using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using wtw;

namespace wtw.Controllers
{
    public class accidentsController : Controller
    {
        private wtwEntities1 db = new wtwEntities1();

        // GET: accidents
        public async Task<ActionResult> Index()
        {
            return View(await db.accidents.ToListAsync());
        }

        // GET: accidents/Details/5
        public async Task<ActionResult> Details(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            accident accident = await db.accidents.FindAsync(id);
            if (accident == null)
            {
                return HttpNotFound();
            }
            return View(accident);
        }

        // GET: accidents/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: accidents/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "id,Deaths,Injury,Lat,Long,Postcode,status")] accident accident)
        {
            if (ModelState.IsValid)
            {
                db.accidents.Add(accident);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(accident);
        }

        // GET: accidents/Edit/5
        public async Task<ActionResult> Edit(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            accident accident = await db.accidents.FindAsync(id);
            if (accident == null)
            {
                return HttpNotFound();
            }
            return View(accident);
        }

        // POST: accidents/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "id,Deaths,Injury,Lat,Long,Postcode,status")] accident accident)
        {
            if (ModelState.IsValid)
            {
                db.Entry(accident).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(accident);
        }

        // GET: accidents/Delete/5
        public async Task<ActionResult> Delete(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            accident accident = await db.accidents.FindAsync(id);
            if (accident == null)
            {
                return HttpNotFound();
            }
            return View(accident);
        }

        // POST: accidents/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(long id)
        {
            accident accident = await db.accidents.FindAsync(id);
            db.accidents.Remove(accident);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
