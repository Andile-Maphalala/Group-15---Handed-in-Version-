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
using System.IO;
using System.Net.Http.Headers;
using System.Web;


namespace INF370_API.Controllers
{
    [RoutePrefix("api/Admin")]
    public class AdminController : ApiController
    {
        INF370Entities db = new INF370Entities();

        INF370Entities abc = new INF370Entities();

        [Route("GetExtensionRequest")]
        public List<dynamic> GetExtensionRequest()
        {

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            return GetExtensionRequests(db.RENTAL_AGREEMENT.Where(zz => zz.RENTALSTATUSID == 3).ToList());

        }
        private List<dynamic> GetExtensionRequests(List<RENTAL_AGREEMENT> forbros)
        {
            List<dynamic> dynamicagreements = new List<dynamic>();
            INF370Entities db = new INF370Entities();
            foreach (RENTAL_AGREEMENT ra in forbros)
            {

                var usr = db.USERs.ToList();
                var clnt = db.CLIENTs.ToList();
                var prop = db.PROPERTies.ToList();
                dynamic dynamicagreement = new ExpandoObject();
                dynamicagreement.RENTALAGREEMENTID = ra.RENTALAGREEMENTID;
                dynamicagreement.RENTALSTATUSID = ra.RENTALSTATUSID;
               // dynamicagreement.USERID = ra.USERID;
                dynamicagreement.CLIENTID = ra.CLIENTID;
                dynamicagreement.RENTALAPPLICATIONID = ra.RENTALAPPLICATIONID;
                dynamicagreement.PROPERTYID = ra.PROPERTYID;
                dynamicagreement.RENTALSTARTDATE = ra.RENTALSTARTDATE;
                dynamicagreement.RENTALENDDATE = ra.RENTALENDDATE;
                dynamicagreement.NAME = clnt.Where(XX => XX.CLIENTID == ra.CLIENTID).Select(m => m.NAME);
                dynamicagreement.SURNAME = clnt.Where(XX => XX.CLIENTID == ra.CLIENTID).Select(m => m.SURNAME);
                dynamicagreement.EMAIL = clnt.Where(XX => XX.CLIENTID == ra.CLIENTID).Select(m => m.EMAIL);
                dynamicagreement.ADDRESS = prop.Where(XX => XX.PROPERTYID == ra.PROPERTYID).Select(m => m.ADDRESS);
                //dynamicagreement.USERNAME = usr.Where(XX => XX.USERID == ra.USERID).Select(m => m.USERNAME);
                dynamicagreements.Add(dynamicagreement);
            }
            return dynamicagreements;
        }

        [HttpGet]
        [Route("GetAgreementDetailsById/{RENTALAGREEMENTID}")]
        public IHttpActionResult GetAgreementDetailsById(string RENTALAGREEMENTID)
        {

            db.Configuration.ProxyCreationEnabled = false;

            RENTAL_AGREEMENT abc = new RENTAL_AGREEMENT();
            int ID = Convert.ToInt32(RENTALAGREEMENTID);
            try
            {
                abc = db.RENTAL_AGREEMENT.Find(ID);
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

        [Route("GetDuedate")]
        public List<dynamic> GetDuedate()
        {

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            return GetDuedates(db.RENTAL_AGREEMENT.Where(zz => zz.DepositDueDate > DateTime.Today).ToList());

        }
        private List<dynamic> GetDuedates(List<RENTAL_AGREEMENT> forbros)
        {
            List<dynamic> dynamicduedates = new List<dynamic>();
            INF370Entities db = new INF370Entities();
            foreach (RENTAL_AGREEMENT dd in forbros)
            {

                var usr = db.RENTAL_AGREEMENT.Where(zz => zz.RENTALAGREEMENTID == dd.RENTALAGREEMENTID).FirstOrDefault();
                var rent = db.RENTALAPPLICATIONs.ToList();
                var clnt = db.CLIENTs.ToList();

                dynamic dynamicduedate = new ExpandoObject();
                dynamicduedate.RENTALAGREEMENTID = dd.RENTALAGREEMENTID;
                dynamicduedate.DepositDueDate = dd.DepositDueDate;
                dynamicduedate.RENTALSTATUSID = dd.RENTALSTATUSID;
                //dynamicduedate.USERID = dd.USERID;
                dynamicduedate.CLIENTID = dd.CLIENTID;
                dynamicduedate.RENTALAPPLICATIONID = dd.RENTALAPPLICATIONID;
                dynamicduedate.PROPERTYID = dd.PROPERTYID;
                dynamicduedate.RENTALSTARTDATE = dd.RENTALSTARTDATE;
                dynamicduedate.RENTALENDDATE = dd.RENTALENDDATE;
                dynamicduedate.PAYMENTID = dd.DepositDueDate;
          
                dynamicduedate.NAME = clnt.Where(aa => aa.CLIENTID == usr.CLIENTID).Select(a => a.NAME);
                dynamicduedate.SURNAME = clnt.Where(aa => aa.CLIENTID == usr.CLIENTID).Select(a => a.SURNAME);
                dynamicduedate.PHONENUMBER = clnt.Where(aa => aa.CLIENTID == usr.CLIENTID).Select(a => a.PHONENUMBER);



                dynamicduedates.Add(dynamicduedate);
            }
            return dynamicduedates;
        }

       
        [HttpGet]
        [Route("GetduedateById/{RENTALAGREEMENTID}")]
        public IHttpActionResult GetduedateById(string RENTALAGREEMENTID)
        {

            db.Configuration.ProxyCreationEnabled = false;

            RENTAL_AGREEMENT abc = new RENTAL_AGREEMENT();
            int ID = Convert.ToInt32(RENTALAGREEMENTID);
            try
            {
                abc = db.RENTAL_AGREEMENT.Find(ID);
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
        [Route("ExtendduedateDetails")]
        public IHttpActionResult PutjobMaster(RENTAL_AGREEMENT due)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                RENTAL_AGREEMENT dues = new RENTAL_AGREEMENT();
                dues = abc.RENTAL_AGREEMENT.Find(due.RENTALAGREEMENTID);
                if (dues != null)
                {
                    dues.RENTALAGREEMENTID = due.RENTALAGREEMENTID;
                    dues.DepositDueDate = due.DepositDueDate;

                }
                int i = this.abc.SaveChanges();

            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return User;
            }
            return Ok(due);
        }

        [Route("Getleaseexpiryreminder")]
        public List<dynamic> Getleaseexpiryreminder()
        {
            int clientid = 5;

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
           
            return leaseexpiryreminder(db.RENTAL_AGREEMENT.Where(zz => zz.CLIENTID == clientid).ToList());
  
        }
        private List<dynamic> leaseexpiryreminder(List<RENTAL_AGREEMENT> forbros)
        {
            List<dynamic> dynamicduedates = new List<dynamic>();
            INF370Entities db = new INF370Entities();

            foreach (RENTAL_AGREEMENT dd in forbros)
            {

                var usr = db.RENTAL_AGREEMENT.Where(zz => zz.RENTALAGREEMENTID == dd.RENTALAGREEMENTID).FirstOrDefault();
                var rent = db.RENTALAPPLICATIONs.ToList();
                var clnt = db.CLIENTs.ToList();

                dynamic dynamicduedate = new ExpandoObject();
                dynamicduedate.RENTALAGREEMENTID = dd.RENTALAGREEMENTID;
                dynamicduedate.DepositDueDate = dd.DepositDueDate;
                dynamicduedate.RENTALSTATUSID = dd.RENTALSTATUSID;
                //dynamicduedate.USERID = dd.USERID;
                dynamicduedate.CLIENTID = dd.CLIENTID;
                dynamicduedate.RENTALAPPLICATIONID = dd.RENTALAPPLICATIONID;
                dynamicduedate.PROPERTYID = dd.PROPERTYID;
                dynamicduedate.RENTALSTARTDATE = dd.RENTALSTARTDATE;
                dynamicduedate.RENTALENDDATE = dd.RENTALENDDATE;
                dynamicduedate.PAYMENTID = dd.DepositDueDate;

                dynamicduedate.NAME = clnt.Where(aa => aa.CLIENTID == usr.CLIENTID).Select(a => a.NAME);
                dynamicduedate.SURNAME = clnt.Where(aa => aa.CLIENTID == usr.CLIENTID).Select(a => a.SURNAME);
                dynamicduedate.PHONENUMBER = clnt.Where(aa => aa.CLIENTID == usr.CLIENTID).Select(a => a.PHONENUMBER);



                dynamicduedates.Add(dynamicduedate);
            }
            return dynamicduedates;
        }
        [Route("GetTerminationRequest")]
        public List<dynamic> GetTerminationRequest()
        {

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            return GetTerminationRequests(db.RENTAL_AGREEMENT.Where(zz => zz.RENTALSTATUSID == 4).ToList());

        }
        private List<dynamic> GetTerminationRequests(List<RENTAL_AGREEMENT> forbros)
        {
            List<dynamic> dynamicagreements = new List<dynamic>();
            INF370Entities db = new INF370Entities();
            foreach (RENTAL_AGREEMENT ra in forbros)
            {

                var usr = db.USERs.ToList();
                var clnt = db.CLIENTs.ToList();
                var prop = db.PROPERTies.ToList();
                dynamic dynamicagreement = new ExpandoObject();
                dynamicagreement.RENTALAGREEMENTID = ra.RENTALAGREEMENTID;
                dynamicagreement.RENTALSTATUSID = ra.RENTALSTATUSID;
               // dynamicagreement.USERID = ra.USERID;
                dynamicagreement.CLIENTID = ra.CLIENTID;
                dynamicagreement.RENTALAPPLICATIONID = ra.RENTALAPPLICATIONID;
                dynamicagreement.PROPERTYID = ra.PROPERTYID;
                dynamicagreement.RENTALSTARTDATE = ra.RENTALSTARTDATE;
                dynamicagreement.RENTALENDDATE = ra.RENTALENDDATE;
                dynamicagreement.NAME = clnt.Where(XX => XX.CLIENTID == ra.CLIENTID).Select(m => m.NAME);
                dynamicagreement.SURNAME = clnt.Where(XX => XX.CLIENTID == ra.CLIENTID).Select(m => m.SURNAME);
                dynamicagreement.EMAIL = clnt.Where(XX => XX.CLIENTID == ra.CLIENTID).Select(m => m.EMAIL);
                dynamicagreement.ADDRESS = prop.Where(XX => XX.PROPERTYID == ra.PROPERTYID).Select(m => m.ADDRESS);
             //   dynamicagreement.USERNAME = usr.Where(XX => XX.USERID == ra.USERID).Select(m => m.USERNAME);
                dynamicagreements.Add(dynamicagreement);
            }
            return dynamicagreements;
        }
        [Route("Getpaymetreminder")]
        public List<dynamic> Getpaymetreminder()
        {
            int clientid = 4;
            DateTime today;
            today = DateTime.Today;
            DateTime Duedate = DateTime.FromOADate(25);

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;

            return Getpaymetreminders(db.RENTAL_AGREEMENT.Where(zz => zz.CLIENTID == clientid ).ToList());

        }
        private List<dynamic> Getpaymetreminders(List<RENTAL_AGREEMENT> forbros)
        {
            List<dynamic> dynamicduedates = new List<dynamic>();
            INF370Entities db = new INF370Entities();

            foreach (RENTAL_AGREEMENT dd in forbros)
            {

                var usr = db.RENTAL_AGREEMENT.Where(zz => zz.RENTALAGREEMENTID == dd.RENTALAGREEMENTID).FirstOrDefault();
                var rent = db.RENTALAPPLICATIONs.ToList();
                var clnt = db.CLIENTs.ToList();

                dynamic dynamicduedate = new ExpandoObject();
                dynamicduedate.RENTALAGREEMENTID = dd.RENTALAGREEMENTID;
                dynamicduedate.DepositDueDate = dd.DepositDueDate;
                dynamicduedate.RENTALSTATUSID = dd.RENTALSTATUSID;
               // dynamicduedate.USERID = dd.USERID;
                dynamicduedate.CLIENTID = dd.CLIENTID;
                dynamicduedate.RENTALAPPLICATIONID = dd.RENTALAPPLICATIONID;
                dynamicduedate.PROPERTYID = dd.PROPERTYID;
                dynamicduedate.RENTALSTARTDATE = dd.RENTALSTARTDATE;
                dynamicduedate.RENTALENDDATE = dd.RENTALENDDATE;
                dynamicduedate.PAYMENTID = dd.DepositDueDate;

                dynamicduedate.NAME = clnt.Where(aa => aa.CLIENTID == usr.CLIENTID).Select(a => a.NAME);
                dynamicduedate.SURNAME = clnt.Where(aa => aa.CLIENTID == usr.CLIENTID).Select(a => a.SURNAME);
                dynamicduedate.PHONENUMBER = clnt.Where(aa => aa.CLIENTID == usr.CLIENTID).Select(a => a.PHONENUMBER);



                dynamicduedates.Add(dynamicduedate);
            }
            return dynamicduedates;
        }
        [HttpGet]
        [Route("GetUnassignedJobs")]
        public List<dynamic> GetUnassignedJobs()
        {

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            return GetUnassignedJob(db.JOBs.Include(ZZ => ZZ.RENTAL_AGREEMENT).Where(zz => zz.JOBTYPEID == 1 && zz.JOBSTATUSID == 1).ToList());

        }
        private List<dynamic> GetUnassignedJob(List<JOB> forbros)
        {
            List<dynamic> dynamicjobs = new List<dynamic>();
            INF370Entities db = new INF370Entities();
            foreach (JOB Jb in forbros)
            {

                var Rent = db.RENTAL_AGREEMENT.Where(zz => zz.RENTALAGREEMENTID == Jb.RENTALAGREEMENTID).FirstOrDefault();

                //List<PROPERTY> Prop = new List<PROPERTY>();
                var Prop = db.PROPERTies.ToList();
                var usr = db.USERs.ToList();
                var stat = db.JOBSTATUS.ToList();

                dynamic dynamicjob = new ExpandoObject();
                dynamicjob.JOBID = Jb.JOBID;
                dynamicjob.ADDRESS = Prop.Where(zz => zz.PROPERTYID == Rent.PROPERTYID).Select(x => x.ADDRESS).FirstOrDefault();
                dynamicjob.RENTALAGREEMENTID = Jb.RENTALAGREEMENTID;
                //dynamicjob.USERNAME = usr.Where(cc => cc.EMPLOYEEID == Jb.EMPLOYEEID).Select(a => a.USERNAME).FirstOrDefault();
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
                    objjob.EMPLOYEEID = job.EMPLOYEEID;
                    objjob.JOBSTATUSID = 2;
                 




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
        [Route("GetApplication")]
        public List<dynamic> GetApplication()
        {

            INF370Entities db = new INF370Entities();
    
            db.Configuration.ProxyCreationEnabled = false;
            return GetApplications(db.DOCUMENTs.Include(zz => zz.RENTALAPPLICATION).Where(zz => zz.RENTALAPPLICATION.RENTALAPPLICATIONSTATUSID == 1).ToList());

        }
        private List<dynamic> GetApplications(List<DOCUMENT> forbros)
        {
            List<dynamic> dynamicapplications = new List<dynamic>();
            INF370Entities db = new INF370Entities();
            foreach (DOCUMENT dc in forbros)
            {
                var docs = db.DOCUMENTs.ToList();
                var usr = db.USERs.ToList();
                var clnt = db.CLIENTs.ToList();
                var prop = db.PROPERTies.ToList();

              
                dynamic dynamicapplication = new ExpandoObject();

                dynamicapplication.DOCUMENTID = dc.DOCUMENTID;
                dynamicapplication.IDENTITYDOCUMENT = dc.IDENTITYDOCUMENT;
                dynamicapplication.RENTALAPPLICATIONID = dc.RENTALAPPLICATION.RENTALAGREEMENTID;
              //  dynamicapplication.USERID = dc.RENTALAPPLICATION.USERID;
                dynamicapplication.CLIENTID = dc.RENTALAPPLICATION.CLIENTID;
                dynamicapplication.PROPERTYID = dc.RENTALAPPLICATION.PROPERTYID;
                dynamicapplication.RENTALAGREEMENTID = dc.RENTALAPPLICATION.RENTALAGREEMENTID;
                dynamicapplication.RENTALAPPLICATIONSTATUSID = dc.RENTALAPPLICATION.RENTALAPPLICATIONSTATUSID; 
                dynamicapplication.APPLICATIONDATE = dc.RENTALAPPLICATION.APPLICATIONDATE;
                dynamicapplication.PREFERREDSTARTDATE = dc.RENTALAPPLICATION.PREFERREDSTARTDATE;
                dynamicapplication.NAME = clnt.Where(XX => XX.CLIENTID == dc.RENTALAPPLICATION.CLIENTID).Select(m => m.NAME);
                dynamicapplication.SURNAME = clnt.Where(XX => XX.CLIENTID == dc.RENTALAPPLICATION.CLIENTID).Select(m => m.SURNAME);
                dynamicapplication.EMAIL = clnt.Where(XX => XX.CLIENTID == dc.RENTALAPPLICATION.CLIENTID).Select(m => m.EMAIL);
                dynamicapplication.ADDRESS = prop.Where(XX => XX.PROPERTYID == dc.RENTALAPPLICATION.PROPERTYID).Select(m => m.ADDRESS);
                //dynamicapplication.USERNAME = usr.Where(XX => XX.USERID == dc.RENTALAPPLICATION.USERID).Select(m => m.USERNAME);
             
                dynamicapplications.Add(dynamicapplication);
            }
            return dynamicapplications;
        }

        [HttpGet]
        [Route("GetApplicationsDetailsById/{RENTALAPPLICATIONID}")]
        public IHttpActionResult GetApplicationsDetailsById(string RENTALAPPLICATIONID)
        {

            db.Configuration.ProxyCreationEnabled = false;

            RENTALAPPLICATION abc = new RENTALAPPLICATION();
            int ID = Convert.ToInt32(RENTALAPPLICATIONID);
            try
            {
                abc = db.RENTALAPPLICATIONs.Find(ID);
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
        [Route("Getagreement")]
        public List<dynamic> Getagreement()
        {
            int clientid = 2;

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;

            return Getagreement(db.RENTAL_AGREEMENT.Where(zz => zz.CLIENTID == clientid).ToList());

        }
        private List<dynamic> Getagreement(List<RENTAL_AGREEMENT> forbros)
        {
            List<dynamic> dynamicduedates = new List<dynamic>();
            INF370Entities db = new INF370Entities();

            foreach (RENTAL_AGREEMENT dd in forbros)
            {

                var usr = db.RENTAL_AGREEMENT.Where(zz => zz.RENTALAGREEMENTID == dd.RENTALAGREEMENTID).FirstOrDefault();
                var rent = db.RENTALAPPLICATIONs.ToList();
                var clnt = db.CLIENTs.ToList();
                var prp = db.PROPERTies.ToList();

                dynamic dynamicduedate = new ExpandoObject();
                dynamicduedate.RENTALAGREEMENTID = dd.RENTALAGREEMENTID;
                dynamicduedate.DepositDueDate = dd.DepositDueDate;
                dynamicduedate.RENTALSTATUSID = dd.RENTALSTATUSID;
             //   dynamicduedate.USERID = dd.USERID;
                dynamicduedate.CLIENTID = dd.CLIENTID;
                dynamicduedate.RENTALAPPLICATIONID = dd.RENTALAPPLICATIONID;
                dynamicduedate.PROPERTYID = dd.PROPERTYID;
                dynamicduedate.RENTALSTARTDATE = dd.RENTALSTARTDATE;
                dynamicduedate.RENTALENDDATE = dd.RENTALENDDATE;
                //dynamicduedate.PAYMENTID = dd.DepositDueDate; //How are DepositDueDate and PAYMENTID related?
                dynamicduedate.ADDRESS = prp.Where(aa => aa.PROPERTYID == usr.PROPERTYID).Select(a => a.ADDRESS);
                dynamicduedate.NAME = clnt.Where(aa => aa.CLIENTID == usr.CLIENTID).Select(a => a.NAME);
                dynamicduedate.SURNAME = clnt.Where(aa => aa.CLIENTID == usr.CLIENTID).Select(a => a.SURNAME);
                dynamicduedate.PHONENUMBER = clnt.Where(aa => aa.CLIENTID == usr.CLIENTID).Select(a => a.PHONENUMBER);



                dynamicduedates.Add(dynamicduedate);
            }
            return dynamicduedates;
        }
        [HttpPost]
        [Route("AddFileDetails")]
        public IHttpActionResult AddFile()
        {
            string result = "";
            try
            {
                INF370Entities objEntity = new INF370Entities();
                DOCUMENT objFile = new DOCUMENT();

                string fileName = null;
       
                var httpRequest = HttpContext.Current.Request;
              
                var postedFile = httpRequest.Files["FileUpload"];

           

           

                if (postedFile != null)
                {
                    fileName = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "-");
                    fileName = fileName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile.FileName);
                    var filePath = HttpContext.Current.Server.MapPath("~/Files/" + fileName);
                    postedFile.SaveAs(filePath);
                }
                //objFile.DOCUMENTTYPEID = 1;
                objFile.RENTALAPPLICATIONID = 9;
                objFile.IDENTITYDOCUMENT = fileName;
                objEntity.DOCUMENTs.Add(objFile);
                int i = objEntity.SaveChanges();
                if (i > 0)
                {
                    result = "File uploaded sucessfully";
                }
                else
                {
                    result = "File uploaded failed";
                }

            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return User;
            }
            return Ok(result);
        }


        [HttpGet]
        [Route("GetFile")]
        //download file api
        public HttpResponseMessage GetFile(string IDENTITYDocument)
        {

            //Create HTTP Response.
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);

            //Set the File Path.
            string filePath = System.Web.HttpContext.Current.Server.MapPath("~/Files/") + IDENTITYDocument + ".docx";

            //Check whether File exists.
            if (!File.Exists(filePath))
            {
                //Throw 404 (Not Found) exception if File not found.
                response.StatusCode = HttpStatusCode.NotFound;
                response.ReasonPhrase = string.Format("File not found: {0} .", IDENTITYDocument);
                throw new HttpResponseException(response);
            }

            //Read the File into a Byte Array.
            byte[] bytes = File.ReadAllBytes(filePath);

            //Set the Response Content.
            response.Content = new ByteArrayContent(bytes);

            //Set the Response Content Length.
            response.Content.Headers.ContentLength = bytes.LongLength;

            //Set the Content Disposition Header Value and FileName.
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            response.Content.Headers.ContentDisposition.FileName = IDENTITYDocument + ".docx";

            //Set the File Content Type.
            response.Content.Headers.ContentType = new MediaTypeHeaderValue(MimeMapping.GetMimeMapping(".docx"));
            return response;
        }

        [HttpGet]
        [Route("GetFileDetails")]
        public IHttpActionResult GetFile()
        {
            var url = HttpContext.Current.Request.Url;
            IEnumerable<DocDetailsVM> lstFile = new List<DocDetailsVM>();
            try
            {
                INF370Entities objEntity = new INF370Entities();

                lstFile = objEntity.DOCUMENTs.Select(a => new DocDetailsVM
                {
                    DOCUMENTID = a.DOCUMENTID,
            
                    IDENTITYDOCUMENT = a.IDENTITYDOCUMENT,
              
                }).ToList();
            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return User;
            }
            return Ok(lstFile);
        }

       
    }
}
