using INF370_API.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Drawing.Imaging;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
namespace INF370_API.Controllers
{
    public class LoginController : ApiController
    {
        INF370Entities db = new INF370Entities();
        //[HttpPost]
        //[Route("InsertLoginDetails")]
        //public IHttpActionResult PostLogin(USER data)
        //{
        //INF370Entities6 db = new INF370Entities6();
        //    db.Configuration.ProxyCreationEnabled = false;

        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }
        //    try
        //    {
        //        db.USERs.Add(data);
        //        db.SaveChanges();
        //    }
  


        //    return Ok(data);
        //}

        //public see if user exists
        //function to determine if Username already exists (used when registering new clients and employees)
        [Route("api/Login/doesUserExist/{usrName}")]
        [HttpGet]
        public string doesUserExist(string usrName)
        {
            INF370Entities db = new INF370Entities();

            foreach (USER usr in db.USERs)
            {
                if (usr.USERNAME == usrName)
                {
                    return "true";
                }
            }
            return "false";
        }


        [Route("api/Login/ClientLogin")]
        [HttpPost]
        public dynamic ClientLogin([FromBody] USER usr)
        {
            //check if user exists
            USER checkUserExist = db.USERs.Where(usrw => usrw.USERNAME == usr.USERNAME).FirstOrDefault();
            if (checkUserExist == null)
            {
                dynamic retEmptyUser = new ExpandoObject();
                retEmptyUser.Message = "Invalid User!";
                return retEmptyUser;
            }

            var hash = GenerateHash(ApplySomeSalt(usr.PASSWORD));
            USER usrr = db.USERs.Where(usrw => usrw.USERNAME == usr.USERNAME && usrw.PASSWORD == hash)
                             .Include(zz => zz.USERTYPE)

                             .FirstOrDefault();
            if (usrr != null && usrr.USERTYPEID==2)
            {
               CLIENT clientDetails = db.CLIENTs.Where(zz => zz.USERID == usrr.USERID).FirstOrDefault();
                var hasApplied = db.RENTALAPPLICATIONs.Where(cc => cc.CLIENTID == clientDetails.CLIENTID &&cc.RENTALAPPLICATIONSTATUSID==2).ToList();

                
                dynamic iUser = new ExpandoObject();
                iUser.ClientID = clientDetails.CLIENTID;
                iUser.UserID = clientDetails.USERID;
                iUser.username = usrr.USERNAME;
                iUser.ClientName = clientDetails.NAME;
                iUser.ClientSurname = clientDetails.SURNAME;
                iUser.ClientCellNumber = clientDetails.PHONENUMBER;
                iUser.ClientEmail = clientDetails.EMAIL;
                if(hasApplied.Count()>0)
                {
                    iUser.hasApplied = true;
                }
                else
                {
                    iUser.hasApplied = false;
                }
                
                //add new columns for verification


                return iUser;
            }
            else
            {
                dynamic User = new ExpandoObject();
                User.Message = "Invalid Password!";
                return User;
            }
        }


              // ------------------- HASING OF PASSWORD --------------------------------------
        public static string ApplySomeSalt(string input)
        {
            return input + "tepszgjoowiwccuvckqinnimxxjbbmukxompumnmyugjnwehrnldjsdjygjo";
        }

        public static string GenerateHash(string inputString)
        {
            SHA256 sha256 = SHA256Managed.Create();
            byte[] bytes = Encoding.UTF8.GetBytes(inputString);
            byte[] hash = sha256.ComputeHash(bytes);
            return GetStringFromHash(hash);
        }

        public static string RandomString(int length)
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        private static string GetStringFromHash(byte[] hash)
        {
            StringBuilder result = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                result.Append(hash[i].ToString("X2"));
            }
            return result.ToString();
        }

    }

    }
    
