using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using ContactsWebAPI.Models;

namespace ContactsWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ContactController(IConfiguration configuration) 
        {

            _configuration = configuration;

        }
        [HttpGet]

        public JsonResult Get()
        {
            string query = @"
                      Select ContactId, ContactFirstName,ContactLastName, ContactEmailAddress from dbo.Contacts";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ContactAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon=new SqlConnection(sqlDataSource)) 
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]

        public JsonResult Post([FromBody]Contact con) 
        {

            string query = @"
                     insert into dbo.Contacts 
                            (contactFirstName, contactLastName,contactEmailAddress)
                        values
                        (   
                             '" + con.contactFirstName + @"' 
                            ,'" + con.contactLastName + @"'
                            ,'" + con.contactEmailAddress  + @"'
                        )
                       ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ContactAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");
        }
        [HttpPut]

        public JsonResult PUT(Contact con)
        {

            string query = @"
                     update dbo.Contacts set
                             contactFirstName = '" + con.contactFirstName + @"'
                            ,contactLastName = '" +   con.contactLastName + @"'
                            ,contactEmailAddress = '" + con.contactEmailAddress + @"'
                        
                            where ContactId = " + con.contactId + @"
                                
                       ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ContactAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]

        public JsonResult Delete (int id)
        {

            string query = @"
                     delete from dbo.Contacts
                            where ContactId = " + id + @"
                                
                       ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ContactAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Deleted Successfully");
        }
    }
}