using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using INF370_API.Models;
using System.Dynamic;
using System.Web.Http.Cors;
using System.Data.Entity;

namespace INF370_API.Controllers
{
    [RoutePrefix("api/Maintenance")]
    public class MaintenanceController : ApiController
    {

        INF370Entities db = new INF370Entities();

        INF370Entities abc = new INF370Entities();

        [HttpGet]
        [Route("GetAssignedJobs")]
        public List<dynamic> GetAssignedJobs()
        {

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            return GetAssignedJobs(db.JOBs.Include(ZZ=>ZZ.RENTAL_AGREEMENT).Where(zz => zz.JOBTYPEID == 1 && zz.JOBSTATUSID ==2).ToList());

        }
        private List<dynamic> GetAssignedJobs(List<JOB> forbros)
        {
            List<dynamic> dynamicjobs = new List<dynamic>();
            INF370Entities db = new INF370Entities();
            foreach (JOB Jb in forbros)
            {
           
                var  Rent =  db.RENTAL_AGREEMENT.Where(zz => zz.RENTALAGREEMENTID == Jb.RENTALAGREEMENTID).FirstOrDefault();
                
               //List<PROPERTY> Prop = new List<PROPERTY>();
                var Prop = db.PROPERTies.ToList();
                var usr = db.USERs.ToList();
                var stat = db.JOBSTATUS.ToList();

                dynamic dynamicjob = new ExpandoObject();
                dynamicjob.JOBID = Jb.JOBID;
                dynamicjob.ADDRESS = Prop.Where(zz => zz.PROPERTYID == Rent.PROPERTYID).Select(x => x.ADDRESS).FirstOrDefault();
                dynamicjob.RENTALAGREEMENTID = Jb.RENTALAGREEMENTID;
               // dynamicjob.USERNAME = usr.Where(cc => cc.EMPLOYEEID == Jb.EMPLOYEEID).Select(a => a.USERNAME).FirstOrDefault();
                dynamicjob.JOBTYPEID = Jb.JOBTYPEID;
                dynamicjob.EMPLOYEEID = Jb.EMPLOYEEID;
                dynamicjob.JOBSTATUS = stat.Where(aa => aa.JOBSTATUSID == Jb.JOBSTATUSID).Select(c => c.DESCRIPTION).FirstOrDefault();
                dynamicjob.DATEREQUESTED = Jb.DATEREQUESTED;
                dynamicjob.DESCRIPTION = Jb.DESCRIPTION;
                dynamicjob.DATECOMPLETED = Jb.DATECOMPLETED;
                dynamicjobs.Add(dynamicjob);
            }
            return dynamicjobs;
        }

        [HttpGet]
        [Route("GetJobDetailsById/{JOBID}")]
        public IHttpActionResult GetJobDetailsById(string JOBID)
        {

            db.Configuration.ProxyCreationEnabled = false;

            JOB abc = new JOB();
            int ID = Convert.ToInt32(JOBID);
            try
            {
                abc = db.JOBs.Find(ID);
                if (abc == null)
                {
                    return NotFound();
                }

            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return User;
            }

            return Ok(abc);
        }

        [HttpPost]
        [Route("InsertItemsDetails")]
        public IHttpActionResult PostItems(ITEM data)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                db.ITEMs.Add(data);
                db.SaveChanges();
            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return User;
            }

            return Ok(data);
        }
        [HttpPost]
        [Route("InsertSupplierDetails")]
        public IHttpActionResult PostSupplier(SUPPLIER data)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                db.SUPPLIERs.Add(data);
                db.SaveChanges();
            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return User;
            }

            return Ok(data);
        }
        [HttpPost]
        [Route("InsertPurchaseDetails")]
        public IHttpActionResult Postpurchase(PURCHASE data)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                db.PURCHASEs.Add(data);
                db.SaveChanges();
            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return User;
            }

            return Ok(data);
        }
         [HttpPost]
        [Route("InsertPurchaselineDetails")]
        public IHttpActionResult Postpurchaseline(PURCHASELINE data)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                db.PURCHASELINEs.Add(data);
                db.SaveChanges();
            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return User;
            }

            return Ok(data);
        }
        [HttpGet]
        [Route("Getitems")]
        public List<dynamic> Getitems()
        {

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            return getpurchaseitems(db.ITEMs.ToList());

        }
        private List<dynamic> getpurchaseitems(List<ITEM> forbros)
        {
            List<dynamic> dynamicItems = new List<dynamic>();
            INF370Entities db = new INF370Entities();
            var pur = db.PURCHASEs.ToList();
            foreach (ITEM Jb in forbros)
            {

                

                dynamic dynamicItem = new ExpandoObject();
                dynamicItem.ITEMID = Jb.ITEMID;
                dynamicItem.NAME = Jb.NAME;
                dynamicItem.DESCRIPTION = Jb.DESCRIPTION;
                dynamicItems.Add(dynamicItem);
            }
            return dynamicItems;
        }
        [HttpGet]
        [Route("GetAllPurchases")]
        public List<PURCHASE> GetAllPurchases()
        {
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                return db.PURCHASEs.ToList();
            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return User;
            }
        }


        [HttpGet]
        [Route("GetAllSuppliers")]
        public List<SUPPLIER> GetAllSuppliers()
        {
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                return db.SUPPLIERs.ToList() ;
            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return User;
            }
        }


        [HttpGet]
        [Route("GetPurchaseLine")]
        public List<PURCHASELINE> GetPurchaseLine()
        {
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                return db.PURCHASELINEs.ToList();
            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return User;
            }
        }

        [HttpGet]
        [Route("getSupplierById/{SUPPLIERID}")]
        public IHttpActionResult getSupplierById(string SUPPLIERID)
        {

            db.Configuration.ProxyCreationEnabled = false;

            SUPPLIER abc = new SUPPLIER();
            int ID = Convert.ToInt32(SUPPLIERID);
            try
            {
                abc = db.SUPPLIERs.Find(ID);
                if (abc == null)
                {
                    return NotFound();
                }

            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return User;
            }

            return Ok(abc);
        }
        [HttpGet]
        [Route("getPurchaseById/{PURCHASEID}")]
        public IHttpActionResult getPurchaseById(string PURCHASEID)
        {

            db.Configuration.ProxyCreationEnabled = false;

            PURCHASE abc = new PURCHASE();
            int ID = Convert.ToInt32(PURCHASEID);
            try
            {
                abc = db.PURCHASEs.Find(ID);
                if (abc == null)
                {
                    return NotFound();
                }

            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return User;
            }

            return Ok(abc);
        }

        [HttpPost]
        [Route("InsertDateDetails")]
        public IHttpActionResult PostDate(DATE data)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                db.DATEs.Add(data);
                db.SaveChanges();
            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return User;
            }

            return Ok(data);
        }
        [HttpPost]
        [Route("InsertSlotDetails")]
        public IHttpActionResult PostSlot(SLOT data)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                db.SLOTs.Add(data);
                db.SaveChanges();
            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return User;
            }

            return Ok(data);
        }

        [HttpGet]
        [Route("GetDate")]
        public List<DATE> GetDate()
        {
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                return db.DATEs.ToList();
            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return User;
            }

        }
        [HttpGet]
        [Route("GetSlot")]
        public List<SLOT> GetSlot()
        {
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                return db.SLOTs.ToList();
            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return User;
            }

        }

        [HttpGet]
        [Route("GetDatetimeslot")]
        public List<DATETIMESLOT> GetDatetimeslot()
        {
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                return db.DATETIMESLOTs.ToList();
            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return User;
            }

        }

        [HttpPost]
        [Route("InsertDatetimeDetails")]
        public IHttpActionResult PostDateSlot(DATETIMESLOT data)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                db.DATETIMESLOTs.Add(data);
                db.SaveChanges();
            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return User;
            }

            return Ok(data);
        }
        [HttpGet]
        [Route("SlotById/{SLOTID}")]
        public IHttpActionResult getSlotById(string SLOTID)
        {

            db.Configuration.ProxyCreationEnabled = false;

            SLOT abc = new SLOT();
            int ID = Convert.ToInt32(SLOTID);
            try
            {
                abc = db.SLOTs.Find(ID);
                if (abc == null)
                {
                    return NotFound();
                }

            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return User;
            }

            return Ok(abc);
        }
        [HttpPut]
        [Route("UpdateJobDetails")]
        public IHttpActionResult PutjobMaster(JOB job)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                JOB objjob = new JOB();
                objjob = abc.JOBs.Find(job.JOBID);
                if (objjob != null)
                {
                    objjob.JOBID = job.JOBID;
                    objjob.JOBTYPEID = job.JOBTYPEID;
                    objjob.RENTALAGREEMENTID = job.RENTALAGREEMENTID;
                    objjob.JOBSTATUSID = 3;
                    objjob.DATEREQUESTED = job.DATEREQUESTED;
                    objjob.DESCRIPTION = job.DESCRIPTION;
                    objjob.DATECOMPLETED = job.DATECOMPLETED;


      

                }
                int i = this.abc.SaveChanges();

            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return User;
            }
            return Ok(job);
        }

       
    }
}
