﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using INF370_API.Models;
using System.Data.Entity;
using System.Dynamic;

namespace INF370_API.Controllers
{
    [RoutePrefix("Api/Apply")]
    public class ApplyForRentalController : ApiController
    {
        [HttpGet]
        [Route("Apply")]
        public List<dynamic> GetAvailableClients()
        {

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            return GetAvailableSlots(db.CLIENTs.Where(zz => zz.CLIENTID ==6).ToList());

        }
        private List<dynamic> GetAvailableSlots(List<CLIENT> forbros)
        {
            List<dynamic> dynamicjobs = new List<dynamic>();
            INF370Entities db = new INF370Entities();
            foreach (CLIENT Jb in forbros)
            {
                dynamic dynamicjob = new ExpandoObject();
                dynamicjob.Name = db.CLIENTs.Where(zz => zz.CLIENTID == Jb.CLIENTID).Select(zz => zz.NAME).FirstOrDefault();
                dynamicjob.Surname = db.CLIENTs.Where(zz => zz.CLIENTID == Jb.CLIENTID).Select(zz => zz.SURNAME).FirstOrDefault();
                dynamicjob.PhoneNumber = db.CLIENTs.Where(zz => zz.CLIENTID == Jb.CLIENTID).Select(zz => zz.PHONENUMBER).FirstOrDefault();
                dynamicjob.Email = db.CLIENTs.Where(zz => zz.CLIENTID == Jb.CLIENTID).Select(zz => zz.EMAIL).FirstOrDefault();
                dynamicjob.IDPassport = db.CLIENTs.Where(zz => zz.CLIENTID == Jb.CLIENTID).Select(zz => zz.ID_PASSPORT_NO__).FirstOrDefault();
                dynamicjob.Nationality = db.CLIENTs.Where(zz => zz.CLIENTID == Jb.CLIENTID).Select(zz => zz.NATIONALITY).FirstOrDefault();
                dynamicjob.DateofBirth = db.CLIENTs.Where(zz => zz.CLIENTID == Jb.CLIENTID).Select(zz => zz.DATE_OF_BIRTH).FirstOrDefault();
                dynamicjob.isStudent = db.CLIENTs.Where(zz => zz.CLIENTID == Jb.CLIENTID).Select(zz => zz.ISSTUDENT).FirstOrDefault();
                dynamicjob.ResidentialAddress = db.CLIENTs.Where(zz => zz.CLIENTID == Jb.CLIENTID).Select(zz => zz.RESIDENTIAL_ADDRESS).FirstOrDefault();
                dynamicjob.PostalAddress = db.CLIENTs.Where(zz => zz.CLIENTID == Jb.CLIENTID).Select(zz => zz.POSTAL_ADDRESS).FirstOrDefault();
                dynamicjob.NameOFEmployer = db.CLIENTs.Where(zz => zz.CLIENTID == Jb.CLIENTID).Select(zz => zz.NAME_OF_EMPLOYER).FirstOrDefault();
                dynamicjob.Occupation = db.CLIENTs.Where(zz => zz.CLIENTID == Jb.CLIENTID).Select(zz => zz.OCCUPATION).FirstOrDefault();
                dynamicjob.WorkAddress = db.CLIENTs.Where(zz => zz.CLIENTID == Jb.CLIENTID).Select(zz => zz.WORK_ADDRESS).FirstOrDefault();
                dynamicjob.WorkTel = db.CLIENTs.Where(zz => zz.CLIENTID == Jb.CLIENTID).Select(zz => zz.WORK_TEL__NO).FirstOrDefault();
                dynamicjob.GrossSalary = db.CLIENTs.Where(zz => zz.CLIENTID == Jb.CLIENTID).Select(zz => zz.GROSS_SALARY).FirstOrDefault();
                
                dynamicjobs.Add(dynamicjob);
            }
            return dynamicjobs;
        }
        [HttpPost]
        [Route("AddApplication")]

        public HttpResponseMessage Addapplication(Addbooking sd)
        {
            INF370Entities db = new INF370Entities();

            db.Configuration.ProxyCreationEnabled = false;

            //  var httpRequest = HttpContext.Current.Request;

            RENTALAPPLICATION application = new RENTALAPPLICATION();
         






            //Save to DB
            try
            {
                application.CLIENTID = sd.ClientID;

                //application.USERID = 2;
                //   booking.CLIENTID = Convert.ToInt32(httpRequest["CLIENTID"]);

            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Error With Application ");
            }


            try
            {

                db.RENTALAPPLICATIONs.Add(application);
                db.SaveChanges();

                


                db.SaveChanges();

            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Error With Application ");
            }


            //booking.BOOKINGID = getCreatedBookingID(booking.CLIENTID);
            return Request.CreateResponse(HttpStatusCode.Created);

        }

      
    }

}