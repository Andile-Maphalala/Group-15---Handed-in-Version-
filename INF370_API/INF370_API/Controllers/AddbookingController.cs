using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using INF370_API.Models;
using System.Web;

namespace INF370_API.Controllers
{
 [RoutePrefix("Api/AddBooking")]
    public class AddbookingController : ApiController
    {
        INF370Entities db = new INF370Entities();
        [HttpPost]
        [Route("AddBooking")]
        public HttpResponseMessage Addbooking(Addbooking sd)
        {


            //  var httpRequest = HttpContext.Current.Request;

            BOOKING booking = new BOOKING();
            EMPLOYEEDATETIMESLOT bookingUpdate = new EMPLOYEEDATETIMESLOT();






            //Save to DB
            try
            {
                booking.CLIENTID = sd.ClientID;
                booking.PROPERTYID = sd.PropertyID;
                booking.USERID = 2;
                //   booking.CLIENTID = Convert.ToInt32(httpRequest["CLIENTID"]);

            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Error With Booking ");
            }


            try
            {

                db.BOOKINGs.Add(booking);
                db.SaveChanges();

                bookingUpdate = db.EMPLOYEEDATETIMESLOTs.Find(sd.EmployeeDateTimeSlotID);
                int value = int.Parse(db.BOOKINGs
                            .OrderByDescending(p => p.BOOKINGID)
                            .Select(r => r.BOOKINGID)
                            .First().ToString());
                bookingUpdate.BOOKINGID = value;
                bookingUpdate.EMPLOYEESLOTSTAUSID = 2;


                db.SaveChanges();

            }
            catch (Exception )
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Error With Booking "); ;
            }


            //booking.BOOKINGID = getCreatedBookingID(booking.CLIENTID);
            return Request.CreateResponse(HttpStatusCode.Created);

        }

        public int getCreatedBookingID()
        {

            var toReturn = db.BOOKINGs.Skip(db.BOOKINGs.Count() - 1).FirstOrDefault();

            return 1;
        }
    
    [HttpPost]
    [Route("UpdateBooking")]
    public HttpResponseMessage Updatebooking(UpdateBooking sd)
    {


        

        EMPLOYEEDATETIMESLOT bookingUpdate = new EMPLOYEEDATETIMESLOT();

        try
        {


            bookingUpdate = db.EMPLOYEEDATETIMESLOTs.Find(sd.BookingID);
            bookingUpdate.BOOKINGID = null;
            bookingUpdate.EMPLOYEESLOTSTAUSID = 1;


            db.SaveChanges();

        }
        catch (Exception e)
        {
            return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Error With Booking ");
        }


        //booking.BOOKINGID = getCreatedBookingID(booking.CLIENTID);
        return Request.CreateResponse(HttpStatusCode.Created);

    }

    public int getCreateddBookingID()
    {

        var toReturn = db.BOOKINGs.Skip(db.BOOKINGs.Count() - 1).FirstOrDefault();

        return 1;
    }
}
}

