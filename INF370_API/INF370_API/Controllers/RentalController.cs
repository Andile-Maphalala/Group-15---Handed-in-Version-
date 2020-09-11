using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using INF370_API.Models;
using System.Web.Http.Cors;
using System.Data.Entity;
using System.Data;
using System.Dynamic;

namespace INF370_API.Controllers
{
    [RoutePrefix("Api/Rental")]
    //[EnableCors(origins: "*", headers: "*", methods: "*")]

    public class RentalController : ApiController
    {
        INF370Entities db = new INF370Entities();

        //[HttpGet]
        //[Route("getPropertyByProvince/{Province}")]
        //public IHttpActionResult GetEmployeeTypeById(string Province)
        //{

        //    db.Configuration.ProxyCreationEnabled = false;

        //    EMPLOYEETYPE objEmp = new EMPLOYEETYPE();
        //    int ID = Convert.ToInt32(Province);
        //    try
        //    {
        //        objEmp = db.EMPLOYEETYPEs.Find(ID);
        //        if (objEmp == null)
        //        {
        //            return NotFound();
        //        }

        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }

        //    return Ok(objEmp);
        //}

        //[HttpGet]
        //[Route("getPropertyByProvince/{Province}")]
        //public dynamic getPropertyByProvinceID(string Province)
        //{


        //}


        List<PROPERTY> properties = new List<PROPERTY>();
        [Route("getPropertyByProvince/{Province}")]
        [HttpGet]
        public List<dynamic> getPropertyByProvince(string Province)
        {
            var province = db.PROVINCEs.Where(xx => xx.PROVINCENAME == Province).FirstOrDefault();
            

            //dynamic properties = new ExpandoObject();
            if (province != null)
            {
                var city = db.CITies.Where(xx => xx.PROVINCEID == province.PROVINCEID).ToList();
                var area = (from pd in city
                            join od in db.AREAs on pd.CITYID equals od.CITYID

                            select new
                            {
                                od
                            }).ToList();

              properties= 
                 (from x in db.PROPERTies.AsEnumerable()
                                                     join y in area.AsEnumerable()
                                       on x.AREAID equals y.od.AREAID
                                                   //  where x.id.Equals(id)
                                                     select new PROPERTY
                                                     {PROPERTYID=x.PROPERTYID,
                                                         ADDITIONALINFO=x.ADDITIONALINFO,
                                                         PROPERTYDESCRIPTION =x.PROPERTYDESCRIPTION,
                                                         ADDRESS=x.ADDRESS
                                                     }).ToList();
                //db.PROPERTies.Join(area, x => x.AREAID, s => s.od.AREAID, ((x, s) => new )).ToList();




                //(from pd in area
                // join od in db.PROPERTies on pd.od.AREAID equals od.AREAID

                // select new
                // {
                //     od
                // }).ToList();
                //    properties = db.PROPERTies.Include(cc => cc.AREA).Where(vv => vv.AREAID == area.AREAID).ToList();

                // properties = db.PROPERTies.Any(aa=>aa.AREAID==area.).ToList();

                // var results = db.PROPERTies.Where(r => area.Contains(r.AREAID));

            }

        
         
            List<dynamic> toReturn = new List<dynamic>();
            foreach (PROPERTY property in properties)
            {

               
               
                dynamic dynamicProperty = new ExpandoObject();

                dynamicProperty.PROPERTYID = property.PROPERTYID;
                dynamicProperty.ADDITIONALINFO = property.ADDITIONALINFO;
                dynamicProperty.PROPERTYDESCRIPTION = property.PROPERTYDESCRIPTION;
                dynamicProperty.ADDRESS = property.ADDRESS;
                




                toReturn.Add(dynamicProperty);
                
            }
            if (properties.Count == 0)
            {
                dynamic setInvalid = new ExpandoObject();
                setInvalid.isValid = "false";
                toReturn.Add(setInvalid);

            }

            return toReturn;
           




        }

        //[HttpGet]
        //[Route("getPropertyByProvince/{Province}")]
        //public IHttpActionResult getPropertyByProvinceID(string Province)
        //{

        //    db.Configuration.ProxyCreationEnabled = false;

        //    List<PROPERTY> objEmp = new List<PROPERTY>();

        //    var province = db.PROVINCEs.Where(xx => xx.PROVINCENAME == Province).FirstOrDefault();
        //    var city = db.CITies.Where(xx => xx.PROVINCEID == province.PROVINCEID).ToList();          
        //    var area = (from pd in city
        //             join od in db.AREAs on pd.CITYID equals od.CITYID
                     
        //             select new
        //             {od.AREAID
        //             }).FirstOrDefault();

        //    try
        //    {
        //        objEmp =db.PROPERTies.Include(cc=>cc.AREA).Where(vv=>vv.AREAID== area.AREAID).ToList();
        //        if (objEmp == null||objEmp.Count()==0)
        //        {
        //            return NotFound();
        //        }

        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }

        //    return Ok(objEmp);
        //}


        [HttpGet]
        [Route("getPropertyByCity/{City}")]
        public List<dynamic> getPropertyByCity(string City)
        {

            db.Configuration.ProxyCreationEnabled = false;

            List<PROPERTY> objEmp = new List<PROPERTY>();

          
            var city = db.CITies.Where(xx => xx.CITYNAME == City).ToList();
            if (city != null)
            {
                var area = (from pd in city
                            join od in db.AREAs on pd.CITYID equals od.CITYID

                            select new
                            {
                                od
                            }).ToList();


                properties =
                   (from x in db.PROPERTies.AsEnumerable()
                    join y in area.AsEnumerable()
    on x.AREAID equals y.od.AREAID
                    //  where x.id.Equals(id)
                    select new PROPERTY
                    {
                        PROPERTYID = x.PROPERTYID,
                        ADDITIONALINFO = x.ADDITIONALINFO,
                        PROPERTYDESCRIPTION = x.PROPERTYDESCRIPTION,
                        ADDRESS = x.ADDRESS

                    }).ToList();

            }
                //objEmp = db.PROPERTies.Include(cc => cc.AREA).Where(vv => vv.AREAID == area.AREAID).ToList();
            //    if (objEmp == null)
            //    {
            //        return NotFound();
            //    }

            //}
            //catch (Exception)
            //{
            //    throw;
            //}

            //return Ok(objEmp);



            List<dynamic> toReturn = new List<dynamic>();
            foreach (PROPERTY property in properties)
            {
                dynamic dynamicProperty = new ExpandoObject();

                dynamicProperty.PROPERTYID = property.PROPERTYID;
                dynamicProperty.ADDITIONALINFO = property.ADDITIONALINFO;
                dynamicProperty.PROPERTYDESCRIPTION = property.PROPERTYDESCRIPTION;
                dynamicProperty.ADDRESS = property.ADDRESS;






                toReturn.Add(dynamicProperty);
            }
            if (properties.Count == 0)
            {
                dynamic setInvalid = new ExpandoObject();
                setInvalid.isValid = "false";
                toReturn.Add(setInvalid);
            }
            return toReturn;

        }


        [HttpGet]
        [Route("getPropertyByArea/{Area}")]
        public List<dynamic> getPropertyByArea(string Area)
        {

            db.Configuration.ProxyCreationEnabled = false;

            List<PROPERTY> objEmp = new List<PROPERTY>();

           
                var area= db.AREAs.Where(xx => xx.AREANAME ==Area).FirstOrDefault();
            if (area != null)
            {

                properties = db.PROPERTies.Include(cc => cc.AREA).Where(vv => vv.AREAID == area.AREAID).ToList();
            }

            List<dynamic> toReturn = new List<dynamic>();
                foreach (PROPERTY property in properties)
                {
                    dynamic dynamicProperty = new ExpandoObject();

                    dynamicProperty.ADDITIONALINFO = property.ADDITIONALINFO;
                    dynamicProperty.PROPERTYDESCRIPTION = property.PROPERTYDESCRIPTION;
                    dynamicProperty.ADDRESS = property.ADDRESS;
                dynamicProperty.PROPERTYID = property.PROPERTYID;






                toReturn.Add(dynamicProperty);
                }
                if (properties.Count == 0)
                {
                    dynamic setInvalid = new ExpandoObject();
                    setInvalid.isValid = "false";
                    toReturn.Add(setInvalid);
                }



        



            return toReturn;

          


        }



        [HttpGet]
        [Route("getPropertyByReference/{Reference}")]
        public dynamic getPropertyByReference(int Reference)
        {

            db.Configuration.ProxyCreationEnabled = false;

            PROPERTY objEmp = new PROPERTY();


            //var area = db.AREAs.Where(xx => xx.AREANAME == Reference).FirstOrDefault();

            try
            {
                objEmp = db.PROPERTies.Find(Reference);


                //objEmp = db.PROPERTies.Where(vv => vv.PROPERTYID ==Reference).ToList();
                if (objEmp == null)
                {
                    dynamic setInvalid = new ExpandoObject();
                    setInvalid.isValid = "false";
                    return setInvalid;
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

    }
}
