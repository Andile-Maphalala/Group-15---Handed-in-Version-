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
    
    public partial class JOBTASK
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public JOBTASK()
        {
            this.PURCHASELINEs = new HashSet<PURCHASELINE>();
        }
    
        public int JOBTASKID { get; set; }
        public Nullable<int> JOBID { get; set; }
        public Nullable<int> PURCHASELINEID { get; set; }
        public string DESCRIPTION { get; set; }
    
        public virtual JOB JOB { get; set; }
        public virtual PURCHASELINE PURCHASELINE { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PURCHASELINE> PURCHASELINEs { get; set; }
    }
}
