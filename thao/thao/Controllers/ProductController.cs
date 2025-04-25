using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using thao.Data;

namespace thao.Controllers
{
    public class ProductController : Controller
    {
        QLIKHACHHANGEntities1 objQLIKHACHHANGEntities1 = new QLIKHACHHANGEntities1();
        public ActionResult Index()
        {
            var lstProduct = objQLIKHACHHANGEntities1.Products.ToList();
            return View(lstProduct);
        }
        [HttpGet]
        public ActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Create(Product objPro)
        {
            objQLIKHACHHANGEntities1.Products.Add(objPro);
            //objQLIKHACHHANGEntities1.SaveChanges();
            return RedirectToAction("Index");
        }
    }
}