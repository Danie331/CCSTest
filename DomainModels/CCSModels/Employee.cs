using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModels.CCSModels
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public Person Person { get; set; }
        public string EmployeeNum { get; set; }
        public DateTime EmployedDate { get; set; }
        public DateTime? TerminatedDate { get; set; }
    }
}
