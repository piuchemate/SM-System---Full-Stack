using SMS.Common.Models;
using SMS.DataAccess.DBContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMS.DataAccess.Repositories
{
    public class SMSDataAccess : ISMSDataAccess
    {
        private readonly SMSystemDbContext _dbSMSystem;
        public SMSDataAccess(SMSystemDbContext dbSMSystem)
        {
            _dbSMSystem = dbSMSystem;
        }

        public AllStudents GetAllStudents()
        {
            AllStudents studList = new AllStudents();

            var resp = _dbSMSystem.Student.Select(s => new Student
            {
                Id = s.Id,
                StudentId = s.StudentId,
                FirstName = s.FirstName,
                LastName = s.LastName,
                DateOfBirth = s.DateOfBirth
            }).ToList();

            studList.Students = resp;

            return studList;
        }
    }
}
