﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModels.CCSModels
{
    public class Person
    {
        public int PersonId { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public DateTime BirthDate { get; set; }
    }
}
