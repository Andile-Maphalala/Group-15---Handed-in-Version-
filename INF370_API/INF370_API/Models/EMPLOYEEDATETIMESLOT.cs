//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace INF370_API.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class EMPLOYEEDATETIMESLOT
    {
        public int EMPLOYEEDATETIMESLOTID { get; set; }
        public int EMPLOYEEID { get; set; }
        public int EMPLOYEESLOTSTAUSID { get; set; }
        public int DATETIMESLOTID { get; set; }
        public Nullable<int> BOOKINGID { get; set; }
    
        public virtual BOOKING BOOKING { get; set; }
        public virtual DATETIMESLOT DATETIMESLOT { get; set; }
        public virtual EMPLOYEE EMPLOYEE { get; set; }
        public virtual EMPLOYEESLOTSTATU EMPLOYEESLOTSTATU { get; set; }
    }
}
