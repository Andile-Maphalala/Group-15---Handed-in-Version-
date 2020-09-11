using INF370_API.Models;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace INF370_API.Controllers
{
    [RoutePrefix("Api/Location")]
    public class LocationController : ApiController
    {
        INF370Entities db = new INF370Entities();

       //City||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
        
        [HttpGet]
        [Route("GetCities")]
        public IQueryable<CITY> GetCities()
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                return db.CITies;
            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return User;
            }
        }

        [HttpGet]
        [Route("GetCityDetailsById/{CityID}")]
        public IHttpActionResult GetCityDetailsById(string CityID)
        {

            db.Configuration.ProxyCreationEnabled = false;

            CITY objEmp = new CITY();
            int ID = Convert.ToInt32(CityID);
            try
            {
                objEmp = db.CITies.Find(ID);
                if (objEmp == null)
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

            return Ok(objEmp);
        }

        [HttpPost]
        [Route("InsertCityDetails")]
        public IHttpActionResult PostOwner(CITY data)
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                db.CITies.Add(data);
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


        [HttpPut]
        [Route("UpdateCityDetails")]
        public IHttpActionResult PutOwnerMaster(CITY City)
        {

            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                CITY objEmp = new CITY();
                objEmp = db.CITies.Find(City.CITYID);
                if (objEmp != null)
                {
                    objEmp.CITYNAME = City.CITYNAME;
                    objEmp.PROVINCEID = City.PROVINCEID;



                }
                int i = this.db.SaveChanges();

            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return User;
            }
            return Ok(City);
        }


        [HttpDelete]
        [Route("DeleteCityDetails")]
        public IHttpActionResult DeleteOwner(int id)
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;


            CITY CityDetails = db.CITies.Find(id);
            if (CityDetails == null)
            {
                return NotFound();
            }

            db.CITies.Remove(CityDetails);
            db.SaveChanges();

            return Ok(CityDetails);
        }


        //Province||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

        [HttpGet]
        [Route("GetProvinces")]
        public IQueryable<PROVINCE> GetProvinces()
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                return db.PROVINCEs;
            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return User;
            }
        }

        [HttpGet]
        [Route("GetProvinceDetailsById/{ProvinceID}")]
        public IHttpActionResult GetProvinceDetailsById(string ProvinceID)
        {

            db.Configuration.ProxyCreationEnabled = false;
            PROVINCE objEmp = new PROVINCE();
            int ID = Convert.ToInt32(ProvinceID);
            try
            {
                objEmp = db.PROVINCEs.Find(ID);
                if (objEmp == null)
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

            return Ok(objEmp);
        }

        [HttpPost]
        [Route("InsertProvinceDetails")]
        public IHttpActionResult PostOwner(PROVINCE data)
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                db.PROVINCEs.Add(data);
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


        [HttpPut]
        [Route("UpdateProvinceDetails")]
        public IHttpActionResult PutOwnerMaster(PROVINCE Province)
        {

            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                PROVINCE objEmp = new PROVINCE();
                objEmp = db.PROVINCEs.Find(Province.PROVINCEID);
                if (objEmp != null)
                {
                    objEmp.PROVINCENAME = Province.PROVINCENAME;



                }
                int i = this.db.SaveChanges();

            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return User;
            }
            return Ok(Province);
        }


        [HttpDelete]
        [Route("DeleteProvinceDetails")]
        public IHttpActionResult DeleteProvince(int id)
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;


            PROVINCE ProvinceDetails = db.PROVINCEs.Find(id);
            if (ProvinceDetails == null)
            {
                return NotFound();
            }

            db.PROVINCEs.Remove(ProvinceDetails);
            db.SaveChanges();

            return Ok(ProvinceDetails);
        }

        //Area||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

        [HttpGet]
        [Route("GetAreas")]
        public IQueryable<AREA> GetAreas()
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                return db.AREAs;
            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return User;
            }
        }

        [HttpGet]
        [Route("GetAreaDetailsById/{AreaID}")]
        public IHttpActionResult GetAreaDetailsById(string AreaID)
        {

            db.Configuration.ProxyCreationEnabled = false;
            AREA objEmp = new AREA();
            int ID = Convert.ToInt32(AreaID);
            try
            {
                objEmp = db.AREAs.Find(ID);
                if (objEmp == null)
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

            return Ok(objEmp);
        }

        [HttpPost]
        [Route("InsertAreaDetails")]
        public IHttpActionResult PostOwner(AREA data)
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                db.AREAs.Add(data);
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


        [HttpPut]
        [Route("UpdateAreaDetails")]
        public IHttpActionResult PutOwnerMaster(AREA Area)
        {

            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                AREA objEmp = new AREA();
                objEmp = db.AREAs.Find(Area.AREAID);
                if (objEmp != null)
                {
                    objEmp.AREANAME = Area.AREANAME;
                    objEmp.CITYID = Area.CITYID;



                }
                int i = this.db.SaveChanges();

            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return User;
            }
            return Ok(Area);
        }


        [HttpDelete]
        [Route("DeleteAreaDetails")]
        public IHttpActionResult DeleteArea(int id)
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;


            AREA AreaDetails = db.AREAs.Find(id);
            if (AreaDetails == null)
            {
                return NotFound();
            }

            db.AREAs.Remove(AreaDetails);
            db.SaveChanges();

            return Ok(AreaDetails);
        }
    }
}
