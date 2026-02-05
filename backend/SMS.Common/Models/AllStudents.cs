using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SMS.Common.Models;


namespace SMS.Common.Models
{
    public class AllStudents
    {
       
       public List<Student> Students { get; set; } = new List<Student>();
    }

    public class Student
    {
        public Guid Id { get; set; }
        public int StudentId { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public DateTime DateOfBirth { get; set; }
    }
}
