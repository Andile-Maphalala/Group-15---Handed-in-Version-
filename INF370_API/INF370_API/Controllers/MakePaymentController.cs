using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using INF370_API.Models;
using System.Data.Entity;
using System.Dynamic;

namespace INF370_API.Controllers
{
    [RoutePrefix("api/MakePayment")]
    public class MakePaymentController : ApiController
    {
        //    [Route("getMD5Hash")]
        //    [HttpPost]
        //    public string getMD5Hash(dynamic stringX)
        //    {
        //        string newStr = stringX.hashString;
        //        newStr = newStr.Replace('$', '&');
        //        using (System.Security.Cryptography.MD5 md5 = System.Security.Cryptography.MD5.Create())
        //        {
        //            byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(newStr);
        //            byte[] hashBytes = md5.ComputeHash(inputBytes);

        //            // Convert the byte array to hexadecimal string
        //            StringBuilder sb = new StringBuilder();
        //            for (int i = 0; i < hashBytes.Length; i++)
        //            {
        //                sb.Append(hashBytes[i].ToString("X2"));
        //            }
        //            return sb.ToString().ToLower();
        //        }

        //    }
        //    [HttpGet]
        //    [Route("GetProperties/{ClientID}")]
        //    public List<dynamic> GetProperties(string ClientID)
        //    {
        //        var clientid = Convert.ToInt32(ClientID);
        //       INF370Entities4 db = new INF370Entities4();
        //        db.Configuration.ProxyCreationEnabled = false;
        //        return GetProperties(db.RENTAL_AGREEMENT.Include(zz => zz.PROPERTY).Include(zz => zz.CLIENT).Where(zz => zz.CLIENTID == clientid).ToList());

        //    }
        //    private List<dynamic> GetProperties(List<RENTAL_AGREEMENT> forbros)
        //    {
        //        List<dynamic> dynamicjobs = new List<dynamic>();
        //        INF370Entities4 db = new INF370Entities4();
        //        foreach (RENTAL_AGREEMENT Jb in forbros)
        //        {

        //            dynamic dynamicjob = new ExpandoObject();

        //            var Property=db.PROPERTies.Where(zz=>zz.PROPERTYID==Jb.PROPERTYID).Select(zz=>zz.ADDRESS);
        //            dynamicjob.PropertyAddress= db.PROPERTies.Where(zz => zz.PROPERTYID == Jb.PROPERTYID).Select(zz => zz.ADDRESS);
        //            dynamicjob.ReferenceNo = Jb.REFERENCE_NO;
        //            dynamicjob.AmountDue = Jb.AMOUNTDUE;
        //            dynamicjobs.Add(dynamicjob);

        //            //List<dynamic> RentalDetails = new List<dynamic>();
        //            //foreach (var Details in Jb)
        //            //{
        //            //    dynamic dynamiDetails = new ExpandoObject();
        //            //    dynamiDetails.AmountDue = Jb.AMOUNTDUE;
        //            //}
        //        }
        //        return dynamicjobs;
        //    }

        //    //[HttpGet]
        //    //[Route("GetAmountDue/{ReferenceNo}")]
        //    //public dynamic GetAmount(string ReferenceNo)
        //    //{

        //    //    INF370Entities4 db = new INF370Entities4();
        //    //    db.Configuration.ProxyCreationEnabled = false;
        //    //    return GetAmount(db.RENTAL_AGREEMENT.Include(zz => zz.PROPERTY).Include(zz => zz.CLIENT).Where(zz => zz.REFERENCE_NO == ReferenceNo).FirstOrDefault());

        //    //}
        //    //private dynamic GetAmount(RENTAL_AGREEMENT forbros)
        //    //{
        //    //    dynamic dynamicjob = new ExpandoObject();
        //    //    dynamicjob = forbros.AMOUNTDUE;
        //    //    List<dynamic> dynamicjobs = new List<dynamic>();
        //    //    INF370Entities4 db = new INF370Entities4();
        //    //    foreach (RENTAL_AGREEMENT Jb in forbros)
        //    //    {

        //    //        dynamic dynamicjob = new ExpandoObject();
        //    //     var Property = db.PROPERTies.Where(zz => zz.PROPERTYID == Jb.PROPERTYID).Select(zz => zz.ADDRESS);
        //    //        dynamicjob.PropertyAddress = db.PROPERTies.Where(zz => zz.PROPERTYID == Jb.PROPERTYID).Select(zz => zz.ADDRESS);
        //    //        dynamicjob.ReferenceNo = Jb.REFERENCE_NO;
        //    //        dynamicjob.AmountDue = Jb.AMOUNTDUE;

        //    //    List<dynamic> RentalDetails = new List<dynamic>();
        //    //    foreach (var Details in Jb)
        //    //    {
        //    //        dynamic dynamiDetails = new ExpandoObject();
        //    //        dynamiDetails.AmountDue = Jb.AMOUNTDUE;
        //    //    }
        //    //    }
        //    //    return dynamicjob;
        //    //}
        //}
        //}


    }
}