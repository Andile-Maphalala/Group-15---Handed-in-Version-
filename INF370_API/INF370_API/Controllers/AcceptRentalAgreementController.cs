using System;
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
    [RoutePrefix("Api/AcceptRentalAgreement")]

    public class AcceptRentalAgreementController : ApiController
    {
        INF370Entities db = new INF370Entities();


        [HttpGet]
            [Route("ApprovedApplication/{ClientID}")]
            public List<dynamic> GetApprovedApplications(int ClientID)
            {

                INF370Entities db = new INF370Entities();
                db.Configuration.ProxyCreationEnabled = false;
                return GetApprovedApplications(db.RENTALAPPLICATIONs.Where(zz => zz.CLIENTID == ClientID && zz.RENTALAPPLICATIONSTATUSID==1).ToList());

            }
            private List<dynamic> GetApprovedApplications(List<RENTALAPPLICATION> forbros)
            {
                List<dynamic> dynamicjobs = new List<dynamic>();
                INF370Entities db = new INF370Entities();
                foreach (RENTALAPPLICATION Jb in forbros)
                {
                    dynamic dynamicjob = new ExpandoObject();
                    dynamicjob.ApplicationDate = Jb.APPLICATIONDATE;
                    dynamicjob.PropertyReference = Jb.PROPERTYID;
                    dynamicjob.ApplicationNum = Jb.RENTALAPPLICATIONID;
                  
                    dynamicjobs.Add(dynamicjob);
                }
                return dynamicjobs;
            }
        [HttpGet]
        [Route("GetRentalAgreementdetails/{RentalApplicationID}")]
        public List<dynamic> GetRentalAgreementdetails(int RentalApplicationID)
        {

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            return GetRentalAgreementdetails(db.RENTALAPPLICATIONs.Where(zz => zz.RENTALAPPLICATIONID == RentalApplicationID).Include(zz=>zz.PROPERTY).ToList());

        }
        private List<dynamic> GetRentalAgreementdetails(List<RENTALAPPLICATION> forbros)
        {
            List<dynamic> dynamicjobs = new List<dynamic>();
            INF370Entities db = new INF370Entities();
            foreach (RENTALAPPLICATION Jb in forbros)
            {
                dynamic dynamicjob = new ExpandoObject();
                dynamicjob.PropertyID = Jb.PROPERTYID;
                dynamicjob.PropertyAddress = db.PROPERTies.Where(zz => zz.PROPERTYID == Jb.PROPERTYID).Select(zz => zz.ADDRESS);
                dynamicjob.Name = db.CLIENTs.Where(zz => zz.CLIENTID == Jb.CLIENTID).Select(zz => zz.NAME);
                dynamicjob.Surname = db.CLIENTs.Where(zz => zz.CLIENTID == Jb.CLIENTID).Select(zz => zz.SURNAME);
                dynamicjob.RentalAmount = db.RENTALAMOUNTs.Where(zz => zz.PROPERTYID == Jb.PROPERTYID).Select(zz => zz.AMOUNT);

                dynamicjobs.Add(dynamicjob);
            }
            return dynamicjobs;
        }

  
            [HttpPost]
            [Route("AddRentalAgreement")]
            public HttpResponseMessage AddRentalAgreement(AddRentalAgreement sd)
            {


                //  var httpRequest = HttpContext.Current.Request;

                RENTAL_AGREEMENT rentalAgreement = new RENTAL_AGREEMENT();
                 Random random = new Random();


           


            //Save to DB
            try
                {

                rentalAgreement.CLIENTID = sd.ClientID;
                rentalAgreement.PROPERTYID = sd.PropertyID;
                rentalAgreement.RENTALSTATUSID = 1;
                rentalAgreement.REFERENCE_NO = random.Next(100000, 999999).ToString();
                rentalAgreement.AMOUNTDUE = db.RENTALAMOUNTs.Where(zz => zz.PROPERTYID == sd.PropertyID).Select(zz => zz.AMOUNT).FirstOrDefault();
             
                rentalAgreement.RENTALSTARTDATE = db.RENTALAPPLICATIONs.Where(xx=>xx.CLIENTID==sd.RentalApplicationID).Select(ss=>ss.PREFERREDSTARTDATE).FirstOrDefault();
                rentalAgreement.RENTALENDDATE = DateTime.Now.AddYears(1);

                //change status of rental application to accepted here |||

            }
            catch (Exception e)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Error With Booking ");
                }

          

            try
            {
                db.RENTAL_AGREEMENT.Add(rentalAgreement);
                db.SaveChanges();

            }
                catch (Exception e)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Error With Rental ");
                }


                //booking.BOOKINGID = getCreatedBookingID(booking.CLIENTID);
                return Request.CreateResponse(HttpStatusCode.Created);

            }

            public int getCreatedBookingID()
            {

                var toReturn = db.BOOKINGs.Skip(db.BOOKINGs.Count() - 1).FirstOrDefault();

                return 1;
            }
        }
    }



