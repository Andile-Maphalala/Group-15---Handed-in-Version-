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
    
    public partial class PAYMENT
    {
        public int PAYMENTID { get; set; }
        public int RENTALAGREEMENTID { get; set; }
        public int PAYMENTTYPEID { get; set; }
        public Nullable<int> PAYMENT_REFERENCE_NO { get; set; }
        public Nullable<decimal> PAYMENT_AMOUNT { get; set; }
        public Nullable<System.DateTime> PAYMENTDATETIME { get; set; }
    
        public virtual PAYMENTTYPE PAYMENTTYPE { get; set; }
        public virtual RENTAL_AGREEMENT RENTAL_AGREEMENT { get; set; }
    }
}
