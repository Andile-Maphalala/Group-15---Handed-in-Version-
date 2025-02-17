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
    
    public partial class FEEDBACK
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public FEEDBACK()
        {
            this.COMPLAINTs = new HashSet<COMPLAINT>();
            this.JOBs = new HashSet<JOB>();
        }
    
        public int FEEDBACKID { get; set; }
        public Nullable<int> JOBID { get; set; }
        public int COMPLAINTID { get; set; }
        public string FEEDBACKCOMMENT { get; set; }
        public Nullable<System.DateTime> DATE { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<COMPLAINT> COMPLAINTs { get; set; }
        public virtual COMPLAINT COMPLAINT { get; set; }
        public virtual JOB JOB { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<JOB> JOBs { get; set; }
    }
}
