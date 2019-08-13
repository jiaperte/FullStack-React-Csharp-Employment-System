using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using BackEnd.Data;
using BackEnd.Models;

namespace BackEnd.Controllers
{
    public class EmployeesController : ApiController
    {
        private EmployeeManagementEntities db = new EmployeeManagementEntities();

        // GET: api/Employees
        public IQueryable<EmployeeDTO> GetEmployees()
        {
            var employees = from e in db.Employees
                            select new EmployeeDTO()
                            {
                                EmployeeID = e.EmployeeID,
                                EmployeeNumber = e.EmployeeNumber,
                                FirstName = e.FirstName,
                                LastName = e.LastName,
                                RoleName = e.Role.RoleName,
                                DateJoined = e.DateJoined,
                                Extension = e.Extension 
                            };
            return employees;
        }

        // GET: api/Employees/5
        [ResponseType(typeof(EmployeeDTO))]
        public IHttpActionResult GetEmployee(long id)
        {
            var employee = db.Employees.Include(e => e.Role).Select(e =>
              new EmployeeDTO()
              {
                  EmployeeID = e.EmployeeID,
                  EmployeeNumber = e.EmployeeNumber,
                  FirstName = e.FirstName,
                  LastName = e.LastName,
                  RoleName = e.Role.RoleName,
                  DateJoined = e.DateJoined,
                  Extension = e.Extension
              }
            ).FirstOrDefault(e => e.EmployeeID == id);
            if(employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }

        // PUT: api/Employees/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEmployee(long id, Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != employee.EmployeeID)
            {
                return BadRequest();
            }

            db.Entry(employee).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Employees
        [ResponseType(typeof(Employee))]
        public IHttpActionResult PostEmployee(Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Employees.Add(employee);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = employee.EmployeeID }, employee);
        }

        // DELETE: api/Employees/5
        [ResponseType(typeof(Employee))]
        public IHttpActionResult DeleteEmployee(long id)
        {
            Employee employee = db.Employees.Find(id);
            if (employee == null)
            {
                return NotFound();
            }

            db.Employees.Remove(employee);
            db.SaveChanges();

            return Ok(employee);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EmployeeExists(long id)
        {
            return db.Employees.Count(e => e.EmployeeID == id) > 0;
        }
    }
}