﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using INF370_API.Models;
using System.Web.Http.Cors;

namespace INF370_API.Controllers
{
    [RoutePrefix("Api/AddUserType")]
    //[EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AddUserTypeController : ApiController
    {

        INF370Entities1 db = new INF370Entities1();

        [HttpGet]
        [Route("GetAddUserTypes")]
        public IQueryable<USERTYPE> GetAddUserTypes()
        {
            INF370Entities1 db = new INF370Entities1();
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                return db.USERTYPEs;
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("GetGetAddUserTypeDetailsById/{UserTypeID}")]
        public IHttpActionResult GetAddUserTypeById(string AddUserTypeID)
        {

            db.Configuration.ProxyCreationEnabled = false;

            USERTYPE objEmp = new USERTYPE();
            int ID = Convert.ToInt32(AddUserTypeID);
            try
            {
                objEmp = db.USERTYPEs.Find(ID);
                if (objEmp == null)
                {
                    return NotFound();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return Ok(objEmp);
        }

        [HttpPost]
        [Route("InsertAddUserTypeDetails")]
        public IHttpActionResult PostOwner(USERTYPE data)
        {
            INF370Entities1 db = new INF370Entities1();
            db.Configuration.ProxyCreationEnabled = false;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                db.USERTYPEs.Add(data);
                db.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }



            return Ok(data);
        }


        [HttpPut]
        [Route("UpdateAddUserTypeDetails")]
        public IHttpActionResult PutOwnerMaster(USERTYPE AddUserType)
        {

            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                USERTYPE objEmp = new USERTYPE();
                objEmp = db.USERTYPEs.Find(AddUserType.USERTYPEID);
                if (objEmp != null)
                {
                    objEmp.USERTYPEDESCRIPTION = AddUserType.USERTYPEDESCRIPTION;



                }
                int i = this.db.SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }
            return Ok(AddUserType);
        }


        [HttpDelete]
        [Route("DeleteUserTypeDetails")]
        public IHttpActionResult DeleteOwner(int id)
        {
            INF370Entities1 db = new INF370Entities1();
            db.Configuration.ProxyCreationEnabled = false;


            EMPLOYEETYPE employeeTypeDetails = db.EMPLOYEETYPEs.Find(id);
            if (employeeTypeDetails == null)
            {
                return NotFound();
            }

            db.EMPLOYEETYPEs.Remove(employeeTypeDetails);
            db.SaveChanges();

            return Ok(employeeTypeDetails);
        }


    }
}
