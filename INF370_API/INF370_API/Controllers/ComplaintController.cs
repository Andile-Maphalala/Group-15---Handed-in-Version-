﻿using System;
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
using System.IO;
using System.Drawing;
using System.Drawing.Imaging;

namespace INF370_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ComplaintController : ApiController
    {
        INF370Entities db = new INF370Entities();

        [Route("api/Complaint/GetAllComplaints")]
        [HttpGet]
        public List<dynamic> GetAllComplaints()
        {
            db.Configuration.ProxyCreationEnabled = false;
            try
            {

                List<COMPLAINT> comList = db.COMPLAINTs.ToList();
                List<dynamic> ComplaintList = new List<dynamic>();



                foreach (var com in comList)
                {

                    dynamic myCom = new ExpandoObject();

                    myCom.ComplaintID = com.COMPLAINTID;
                    COMPLAINTSTATU status = db.COMPLAINTSTATUS.Where(zz => zz.COMPLAINTSTATUSID == com.COMPLAINTSTATUSID).FirstOrDefault();
                    myCom.ComplaintStatus = status.COMPLAINTSTATUS_NAME;
                    myCom.Date = com.DATE;
                    myCom.Details = com.DETAILS;
                    myCom.Photo = com.PHOTO;
                    string filePath = HttpContext.Current.Server.MapPath("~/Images/" + com.PHOTO);
                    using (FileStream fileStream = new FileStream(filePath, FileMode.Open))
                    {
                        using (var memoryStream = new MemoryStream())
                        {
                            fileStream.CopyTo(memoryStream);
                            Bitmap image = new Bitmap(1, 1);
                            image.Save(memoryStream, ImageFormat.Png);

                            byte[] byteImage = memoryStream.ToArray();
                            string base64String = Convert.ToBase64String(byteImage);
                            myCom.Photo = "data:image/png;base64," + base64String;
                        }
                    }


                    ComplaintList.Add(myCom);
                }

                //return db.Products.ToList();
                return ComplaintList;
            }
            catch (Exception)
            {
                throw;
            }
        }

        [Route("api/Complaint/GetUnassignedComplaints")]
        [HttpGet]
        public List<dynamic> GetUnassignedComplaints()
        {
            db.Configuration.ProxyCreationEnabled = false;
            try
            {

                List<COMPLAINT> comList = db.COMPLAINTs.ToList();
                List<dynamic> ComplaintList = new List<dynamic>();



                foreach (var com in comList)
                {
                    if (com.COMPLAINTSTATUSID == 1)
                    {


                        dynamic myCom = new ExpandoObject();

                        myCom.ComplaintID = com.COMPLAINTID;
                        COMPLAINTSTATU status = db.COMPLAINTSTATUS.Where(zz => zz.COMPLAINTSTATUSID == com.COMPLAINTSTATUSID).FirstOrDefault();
                        myCom.ComplaintStatus = status.COMPLAINTSTATUS_NAME;
                        myCom.Date = com.DATE;
                        myCom.Details = com.DETAILS;
                        myCom.Photo = com.PHOTO;
                        string filePath = HttpContext.Current.Server.MapPath("~/Images/" + com.PHOTO);
                        using (FileStream fileStream = new FileStream(filePath, FileMode.Open))
                        {
                            using (var memoryStream = new MemoryStream())
                            {
                                fileStream.CopyTo(memoryStream);
                                Bitmap image = new Bitmap(1, 1);
                                image.Save(memoryStream, ImageFormat.Png);

                                byte[] byteImage = memoryStream.ToArray();
                                string base64String = Convert.ToBase64String(byteImage);
                                myCom.Photo = "data:image/png;base64," + base64String;
                            }
                        }


                        ComplaintList.Add(myCom);
                    }
                }

                //return db.Products.ToList();
                return ComplaintList;
            }
            catch (Exception)
            {
                throw;
            }
        }

        [Route("api/Complaint/AddComplaint")]
        [HttpPost]
        public HttpResponseMessage AddCOmplaint()
        {
 
            var httpRequest = HttpContext.Current.Request;
            string imageName = "";
            try
            {
                ////Upload Image
                ////var postedFile = httpRequest.Files["Image"];

                //string postedFile = complaint.Photo.tostring();
                ////int len = postedFile.le
                ////Create custom filename
                //imageName = new String(Path.GetFileNameWithoutExtension(postedFile).Take(postedFile.Length).ToArray()).Replace(" ", "-") + Path.GetExtension(postedFile);
                //imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile);
                //var filePath = HttpContext.Current.Server.MapPath("~/Images/" + imageName);
                //postedFile.SaveAs(filePath);

                //Upload Image
                var postedFile = httpRequest.Files["Image"];
                //Create custom filename
                imageName = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(postedFile.FileName.Length).ToArray()).Replace(" ", "-") + Path.GetExtension(postedFile.FileName);
                imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile.FileName);
                var filePath = HttpContext.Current.Server.MapPath("~/Images/" + imageName);
                postedFile.SaveAs(filePath);

            }
            catch
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "No image was added");
            }

            COMPLAINT conplaint = new COMPLAINT();
            //Save to DB
            try
            {
                int userID = Convert.ToInt16(httpRequest["UserID"]);
                RENTAL_AGREEMENT rent = db.RENTAL_AGREEMENT.Where(zz => zz.USERID == userID).FirstOrDefault();
                conplaint.RENTALAGREEMENTID = Convert.ToInt16(rent.USERID);
                conplaint.DETAILS = httpRequest["Details"];
                conplaint.COMPLAINTSTATUSID = 1;
                conplaint.DATE = DateTime.Now;
                conplaint.PHOTO = imageName;

                //conplaint.RENTALAGREEMENTID = Convert.ToInt16(complaint.RentalID);
                //conplaint.DETAILS = complaint.Details;
                //conplaint.COMPLAINTSTATUSID = 1;
                //conplaint.DATE = DateTime.Now;
                //conplaint.PHOTO = imageName;



            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Error With Complaint Details");
            }


            try
            {
                db.COMPLAINTs.Add(conplaint);
                db.SaveChanges();

            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e.Message);
                
            }

            return Request.CreateResponse(HttpStatusCode.Created);
        }

       

        

        



            [Route("api/Complaint/DeleteComplaint/{ID}")]
        [HttpPost]
        public IHttpActionResult DeleteComplaint(int ID)
        {
            db.Configuration.ProxyCreationEnabled = false;
            COMPLAINT Delete = new COMPLAINT();
            Delete = db.COMPLAINTs.Where(zz => zz.COMPLAINTID == ID).FirstOrDefault();
            if (Delete == null)
            {
                return NotFound();
            }
            db.COMPLAINTs.Remove(Delete);
            db.SaveChanges();

            return Ok(Delete);
        }


        [Route("api/Complaint/UpdateComplaint")]
        [HttpPost]
        public HttpResponseMessage UpdateComplaint()
        {

            var httpRequest = HttpContext.Current.Request;
            string imageName = "";
            try
            {
                ////Upload Image
                ////var postedFile = httpRequest.Files["Image"];

                //string postedFile = complaint.Photo.tostring();
                ////int len = postedFile.le
                ////Create custom filename
                //imageName = new String(Path.GetFileNameWithoutExtension(postedFile).Take(postedFile.Length).ToArray()).Replace(" ", "-") + Path.GetExtension(postedFile);
                //imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile);
                //var filePath = HttpContext.Current.Server.MapPath("~/Images/" + imageName);
                //postedFile.SaveAs(filePath);

                //Upload Image
                var postedFile = httpRequest.Files["Image"];
                if (postedFile != null)
                {
                    //Create custom filename
                    imageName = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(postedFile.FileName.Length).ToArray()).Replace(" ", "-") + Path.GetExtension(postedFile.FileName);
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile.FileName);
                    var filePath = HttpContext.Current.Server.MapPath("~/Images/" + imageName);
                    postedFile.SaveAs(filePath);
                }

            }
            catch
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "No image was added");
            }

            COMPLAINT conplaint = new COMPLAINT();
            //Save to DB
            try
            {
                var ID = Convert.ToInt16(httpRequest["ComplaintID"]);
                COMPLAINT update = db.COMPLAINTs.Where(zz => zz.COMPLAINTID == ID).FirstOrDefault();



                update.DETAILS = httpRequest["Details"];
                update.DATE = DateTime.Now;
                if (imageName == null)
                {
                    update.PHOTO = imageName;
                }



            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Error With Complaint Details");
            }


            try
            {
                db.SaveChanges();

            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e.Message);

            }

            return Request.CreateResponse(HttpStatusCode.Created);
        }


        [Route("api/Complaint/GetComplaintById/{ID}")]
        [HttpGet]
        public dynamic getComplaintById(int ID)
        {
            db.Configuration.ProxyCreationEnabled = false;
            COMPLAINT com = new COMPLAINT();
            dynamic myCom = new ExpandoObject();
            try
            {
                com = db.COMPLAINTs.Find(ID);

               

                myCom.ComplaintID = com.COMPLAINTID;
                COMPLAINTSTATU status = db.COMPLAINTSTATUS.Where(zz => zz.COMPLAINTSTATUSID == com.COMPLAINTSTATUSID).FirstOrDefault();
                myCom.ComplaintStatus = status.COMPLAINTSTATUS_NAME;
                myCom.Date = com.DATE;
                myCom.Details = com.DETAILS;
                myCom.Photo = com.PHOTO;
                string filePath = HttpContext.Current.Server.MapPath("~/Images/" + com.PHOTO);
                using (FileStream fileStream = new FileStream(filePath, FileMode.Open))
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        fileStream.CopyTo(memoryStream);
                        Bitmap image = new Bitmap(1, 1);
                        image.Save(memoryStream, ImageFormat.Png);

                        byte[] byteImage = memoryStream.ToArray();
                        string base64String = Convert.ToBase64String(byteImage);
                        myCom.Photo = "data:image/png;base64," + base64String;
                    }
                }
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Error With Complaint Details");
            }
            return myCom;
        }


        [HttpGet]
        [Route("api/Complaint/GetAllEmployees")]
        public List<EMPLOYEE> GetAllEmployees()
        {
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                return db.EMPLOYEEs.Where(zz => zz.EMPLOYEETYPEID == 3).ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("api/Complaint/Assign")]
        public dynamic Assign(dynamic Employee)
        {
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                int EmployeeID = Convert.ToInt16(Employee.EMPLOYEEID);
                int ComplaintID = Convert.ToInt16(Employee.ComplaintID);

                COMPLAINT com = db.COMPLAINTs.Where(zz => zz.COMPLAINTID == ComplaintID).FirstOrDefault();
                com.EMPLOYEEID = EmployeeID;
                db.SaveChanges();
            }
            catch (Exception)
            {
                return false;
            }

            return true;
        }



        //[Route("api/Complaint/DeleteComplaint/{ID}")]
        //[HttpPost]
        //public IHttpActionResult DeleteComplaint(int ID)
        //{
        //    db.Configuration.ProxyCreationEnabled = false;
        //    COMPLAINT Delete = new COMPLAINT();
        //    Delete = db.COMPLAINTs.Where(zz => zz.COMPLAINTID == ID).FirstOrDefault();
        //    if (Delete == null)
        //    {
        //        return NotFound();
        //    }
        //    db.COMPLAINTs.Remove(Delete);
        //    db.SaveChanges();

        //    return Ok(Delete);
        //}


    }
}
