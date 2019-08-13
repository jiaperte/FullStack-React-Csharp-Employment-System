using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEnd.Models
{
    public class EmployeeDTO
    {
        public long EmployeeID { get; set; }
        public int EmployeeNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public System.DateTime DateJoined { get; set; }
        public Nullable<short> Extension { get; set; }
        public string RoleName { get; set;  }
    }
}