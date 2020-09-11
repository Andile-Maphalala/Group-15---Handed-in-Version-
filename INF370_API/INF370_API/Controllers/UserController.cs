using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using INF370_API.Models;
using System.Dynamic;
using System.Web.Cors;
using System.Web;
using INF370_API.ViewModels;
using System.Data.Entity;
using System.Web.Http.Cors;
using System.Text;
using System.Security.Cryptography;

namespace INF370_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UserController : ApiController
    {

        //    dynamic response = new ExpandoObject();
        //    response.Name = rental.Customer.Name;
        //                response.Cell = rental.Customer.Cell;
        //                response.Email = rental.Customer.Email;
        //                response.RentalID = rental.RentalID;
        //                response.RentalDate = rental.Date;
        //                List<dynamic> TheList = new List<dynamic>();
        //                foreach (var line in rentalLine)
        //                {
        //                    dynamic item = new ExpandoObject();
        //    item.Description = line.Rentable.Description;
        //                    item.PricePerDay = line.Rentable.PricePerDay;
        //                    item.StartDate = line.StartDate;
        //                    item.EndDate = line.EndDate;
        //                    item.Days = line.EndDate - line.StartDate;
        //                    item.LinePrice = item.PricePerDay* item.Days;
        //    TheList.Add(item);
        //                }
        //response.RentalLines = TheList;
        INF370Entities db = new INF370Entities();

        [Route("api/User/GetAllUsers")]
        [HttpGet]
        public List<dynamic> GetAllUsers()
        {
            db.Configuration.ProxyCreationEnabled = false;
            //List<CLIENT> List = new List<CLIENT>();
            //List = db.CLIENTs.Include(z => z.USER).ToList();

            try
            {
                List<dynamic> ClientList = new List<dynamic>();
                foreach (var x in db.USERs.Include(zz => zz.USERTYPE))
                {
                    dynamic clientUser = new ExpandoObject();
                    //clientUser.UserID = x.USERID;
                    clientUser.Username = x.USERNAME;
                    if (x.USERTYPEID == 2)
                    {
                        CLIENT client = db.CLIENTs.Where(zz => zz.USERID == x.USERID).FirstOrDefault();
                        //clientUser.ClientID = client.CLIENTID;
                        clientUser.Name = client.NAME;
                        clientUser.Surname = client.SURNAME;
                        clientUser.PhoneNo = client.PHONENUMBER;
                        clientUser.Email = client.EMAIL;
                        clientUser.UserType = x.USERTYPE.USERTYPEDESCRIPTION;
                    }
                    else if (x.USERTYPEID == 1)
                    {
                        EMPLOYEE emp = db.EMPLOYEEs.Where(zz => zz.USERID == x.USERID).FirstOrDefault();
                        clientUser.Name = emp.NAME;
                        clientUser.Surname = emp.SURNAME;
                        clientUser.PhoneNo = emp.PHONE_NUMBER;
                        clientUser.Email = "Nothing";
                        clientUser.UserType = x.USERTYPE.USERTYPEDESCRIPTION;
                    }

                    ClientList.Add(clientUser);
                }


                return ClientList;
            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return User;
            }
        }




        //List<ClientUser> ClientList = new List<ClientUser>();
        //        foreach(var x in db.USERs)
        //        {
        //            ClientUser clientuser = new ClientUser();
        //clientuser.USERID = x.USERID;
        //            clientuser.Username = x.USERNAME;
        //            clientuser.Password = x.PASSWORD;
        //            clientuser.NAME = x.CLIENT.NAME;
        //            clientuser.SURNAME = x.CLIENT.SURNAME;
        //            clientuser.PHONENUMBER = x.CLIENT.PHONENUMBER;
        //            clientuser.EMAIL = x.CLIENT.EMAIL;
        //            clientuser.PASSPORTNO = x.CLIENT.ID_PASSPORT_NO__;
        //            clientuser.NATIONALITY = x.CLIENT.NATIONALITY;
        //            clientuser.DATE_OF_BIRTH = x.CLIENT.DATE_OF_BIRTH;
        //            clientuser.ISSTUDENT = x.CLIENT.ISSTUDENT;
        //            clientuser.RESIDENTIAL_ADDRESS = x.CLIENT.RESIDENTIAL_ADDRESS;
        //            clientuser.POSTAL_ADDRESS = x.CLIENT.POSTAL_ADDRESS;
        //            clientuser.NAME_OF_EMPLOYER = x.CLIENT.NAME_OF_EMPLOYER;
        //            clientuser.OCCUPATION = x.CLIENT.OCCUPATION;
        //            clientuser.WORK_ADDRESS = x.CLIENT.WORK_ADDRESS;
        //            clientuser.WORK_TEL_NO = x.CLIENT.WORK_TEL__NO;
        //            clientuser.GROSS_SALARY = x.CLIENT.GROSS_SALARY;
        //            ClientList.Add(clientuser);






        //        bool uExists = UserExists(user.UserName);
        //        db.Configuration.ProxyCreationEnabled = false;

        //            NatUser cUser = new NatUser();
        //        cUser.UserRoleID = 1;
        //            var hash = GenerateHash(ApplySomeSalt(user.UserPassword));
        //        cUser.UserPassword = hash;
        //            cUser.UserName = user.UserName;
        //            cUser.UserPasswordChangeRequest = false;

        //            if (uExists == false)
        //            {
        //                    //Adding new user

        //                try
        //                {
        //                    db.NatUsers.Add(cUser);
        //                    db.SaveChanges();
        //                }
        //                catch(Exception e)
        //                {

        //                }
        //var response = Request.CreateResponse(HttpStatusCode.OK, cUser);
        //                return response;
        //            } else
        //            {
        //                var response = Request.CreateResponse(HttpStatusCode.BadRequest, "user Exists");
        //                return response;
        //            }

        [Route("api/User/doesUserExist/{usrName}")]
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
        [Route("api/User/AddUser")]
        [HttpPost]
        public dynamic AddUser(dynamic myUser)
        {


            CLIENT client = new CLIENT();
            USER user = new USER();


            //Save to DB
            try
            {

                user.USERNAME = myUser.Username;
                var hash = GenerateHash(ApplySomeSalt(myUser.Password));
                user.PASSWORD = hash;
                user.USERTYPEID = 2;
                db.USERs.Add(user);
                db.SaveChanges();
                USER createdUser = new USER();

                createdUser = db.USERs.Where(zz => zz.USERNAME == user.USERNAME).FirstOrDefault();
                client.USERID = createdUser.USERID;
                client.NAME = myUser.Name;
                client.SURNAME = myUser.Surname;
                client.EMAIL = myUser.Email;
                client.PHONENUMBER = myUser.PhoneNo;
                client.ID_PASSPORT_NO__ = myUser.PassportNo;
                client.NATIONALITY = myUser.Nationality;
                client.DATE_OF_BIRTH = myUser.DOB;
                client.ISSTUDENT = myUser.IsStudent;
                client.RESIDENTIAL_ADDRESS = myUser.Residental;
                client.POSTAL_ADDRESS = myUser.Postal;
                client.NAME_OF_EMPLOYER = myUser.Employer;
                client.OCCUPATION = myUser.Occupation;
                client.WORK_ADDRESS = myUser.WorkAddress;
                client.WORK_TEL__NO = myUser.WorkTel;
                client.GROSS_SALARY = myUser.GrossSalary;
                db.CLIENTs.Add(client);
                db.SaveChanges();

            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Error With client Details");
            }
            return Request.CreateResponse(HttpStatusCode.Created);

        }

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

        [Route("api/User/GetUserByID/{ID}")]
        [HttpGet]
        public dynamic GetUserByID(int ID)
        {
            dynamic myUser = new ExpandoObject();
            CLIENT client = new CLIENT();
            client = db.CLIENTs.Where(zz => zz.USERID == ID).FirstOrDefault();
            try
            {
                myUser.Name = client.NAME;
                myUser.Surname = client.SURNAME;
                myUser.Email = client.EMAIL;
                myUser.PhoneNo = client.PHONENUMBER;
                myUser.PassportNo = client.ID_PASSPORT_NO__;
                myUser.Nationality = client.NATIONALITY;
                myUser.DOB = client.DATE_OF_BIRTH;
                myUser.IsStudent = client.ISSTUDENT;
                myUser.Residental = client.RESIDENTIAL_ADDRESS;
                myUser.Postal = client.POSTAL_ADDRESS;
                myUser.Employer = client.NAME_OF_EMPLOYER;
                myUser.Occupation = client.OCCUPATION;
                myUser.WorkAddress = client.WORK_ADDRESS;
                myUser.WorkTel = client.WORK_TEL__NO;
                myUser.GrossSalary = client.GROSS_SALARY;

                return myUser;
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Error With client Details");
            }

        }

        [Route("api/User/UpdateUser")]
        [HttpPost]
        public dynamic UpdateUser(dynamic myUser)
        {

            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            CLIENT client = new CLIENT();



            //Save to DB
            try
            {
                int UserID = myUser.ID;
                client = db.CLIENTs.Where(zz => zz.USERID == UserID).FirstOrDefault();

                client.NAME = myUser.Name;
                client.SURNAME = myUser.Surname;
                client.EMAIL = myUser.Email;
                client.PHONENUMBER = myUser.PhoneNo;
                client.ID_PASSPORT_NO__ = myUser.PassportNo;
                client.NATIONALITY = myUser.Nationality;
                client.DATE_OF_BIRTH = myUser.DOB;
                client.ISSTUDENT = myUser.IsStudent;
                client.RESIDENTIAL_ADDRESS = myUser.Residental;
                client.POSTAL_ADDRESS = myUser.Postal;
                client.NAME_OF_EMPLOYER = myUser.Employer;
                client.OCCUPATION = myUser.Occupation;
                client.WORK_ADDRESS = myUser.WorkAddress;
                client.WORK_TEL__NO = myUser.WorkTel;
                client.GROSS_SALARY = myUser.GrossSalary;

                try
                {
                    db.SaveChanges();
                }
                catch (Exception e)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Error With updating details");
                }


            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Error With client Details");
            }
            return Request.CreateResponse(HttpStatusCode.Created);

        }


        [Route("api/User/Deactivate")]
        [HttpPost]
        public dynamic Deactivate(dynamic myUser)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            CLIENT client = new CLIENT();
            DEACTIVATEDUSER deactivate = new DEACTIVATEDUSER();

            try
            {
                deactivate.DEACTIVATE_REASON = myUser.Reason;
                deactivate.DEACTIVATE_DATETIME = DateTime.Now;
                deactivate.USERID = Convert.ToInt16(myUser.UserID);

                db.DEACTIVATEDUSERs.Add(deactivate);
                db.SaveChanges();

            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Error With updating details");
            }

            return Request.CreateResponse(HttpStatusCode.Created);

        }

        [Route("api/User/CheckUsername/{myUser}")]
        [HttpGet]
        public dynamic CheckUsername(string myUser)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            USER user = new USER();

            try
            {
                string Username = myUser;
                user = db.USERs.Where(zz => zz.USERNAME == Username).FirstOrDefault();


            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Error With updating details");
            }

            dynamic Check = new ExpandoObject();
            if (user != null)
            {
                Check.Found = true;
                return Check;
            }
            else
            {
                Check.Found = false;
                return Check;
            }

        }


    }


}



