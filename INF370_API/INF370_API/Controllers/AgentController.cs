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
namespace INF370_API.Controllers
{
    
    [RoutePrefix("api/Agent")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AgentController : ApiController
    {
        INF370Entities db = new INF370Entities();

        [Route("GetAgents")]
        [HttpGet]
        public List<AGENT> GetAgents()
        {
            try
            {
                return db.AGENTs.ToList();
            }
            catch(Exception)
            {
                throw;
            }
        }

        [Route("GetAgentByID/{ID}")]
        [HttpGet]
        public AGENT GetAgentByID(int ID)
        {
            db.Configuration.ProxyCreationEnabled = false;
            AGENT AgentObj = new AGENT();
            try
            {
                AgentObj = db.AGENTs.Find(ID);
            }
            catch (Exception)
            {
                throw;
            }
            return AgentObj;
        }

        [Route("Test/{ID}")]
        [HttpGet]
        public dynamic Test(int ID)
        {
            bool error = false;
            db.Configuration.ProxyCreationEnabled = false;
            AGENT AgentObj = new AGENT();
            try
            {
                AgentObj = db.AGENTs.Find(ID);
                var name = AgentObj.AGENT_ID;
            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }



        [Route("UpdateAgent")]
        [HttpPost]
        public IHttpActionResult UpdateAgent(AGENT agent)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            AGENT objAgent = new AGENT();
            try
            {
                objAgent = db.AGENTs.Find(agent.AGENT_ID);
                if (objAgent != null)
                { 
                    objAgent.NAME = agent.NAME;
                    objAgent.SURNAME = agent.SURNAME;
                    objAgent.PHONE_NUMBER = agent.PHONE_NUMBER;
                    objAgent.EMAIL = agent.EMAIL;
                    objAgent.COMPANY = objAgent.COMPANY;


                }
                try
                {
                    db.SaveChanges();
                }
                catch (Exception e)
                {
                    throw;
                }


            }
            catch (Exception)
            {
                throw;
            }

            return Ok(objAgent);
        }

        [Route("DeleteAgent/{ID}")]
        [HttpPost]
        public IHttpActionResult DeleteAgent(int ID)
        {
            db.Configuration.ProxyCreationEnabled = false;
            AGENT Delete = new AGENT();
            Delete = db.AGENTs.Where(zz => zz.AGENT_ID == ID).FirstOrDefault();
            if (Delete == null)
            {
                return NotFound();
            }
            db.AGENTs.Remove(Delete);
            db.SaveChanges();

            return Ok(Delete);
        }

        [HttpPost]
        [Route("AddAgent")]
        public IHttpActionResult AddAgnet(AGENT agent)
        {
            db.Configuration.ProxyCreationEnabled = false;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                db.AGENTs.Add(agent);
                db.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }



            return Ok(agent);
        }

      


        [HttpPost]
        [Route("Assign")]
        public IHttpActionResult AssignAgnet(dynamic property)
        {
            db.Configuration.ProxyCreationEnabled = false;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                PROPERTY myproperty = new PROPERTY();
                int PropertyID = Convert.ToInt16(property.PROPERTYID);
                myproperty = db.PROPERTies.Find(PropertyID);
                if (property == null)
                {
                    return NotFound();
                }
                myproperty.AGENT_ID = Convert.ToInt16(property.AGENT_ID);
                db.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }



            return Ok(property);
        }





        [HttpGet]
        [Route("AllPropertyDetails")]
        public List<dynamic> GetProperty()
        {
            try
            {

                List<PROPERTY> properties = db.PROPERTies.Where(zz => zz.AGENT_ID == null).ToList();
                List<dynamic> PropertyList = new List<dynamic>();
                AREA area = new AREA();
                PROPERTYTYPE proptype = new PROPERTYTYPE();
                if (properties != null)
                {
                    foreach (var property in properties)
                    {
                        dynamic objprop = new ExpandoObject();
                        objprop.PROPERTYID = property.PROPERTYID;
                        proptype = db.PROPERTYTYPEs.Where(zz => zz.PROPERTYTYPEID == property.PROPERTYTYPEID).FirstOrDefault();
                        objprop.PROPERTYTYPE = proptype.PROPERTTYPEDESCRIPTION;
                        area = db.AREAs.Where(zz => zz.AREAID == property.AREAID).FirstOrDefault();
                        objprop.AREA = area.AREANAME;
                        objprop.ADDRESS = property.ADDRESS;
                        PropertyList.Add(objprop);
                    }

                   

                }
                return PropertyList;
            }

            catch (Exception)
            {
                throw;
            }
        }


    }
}
