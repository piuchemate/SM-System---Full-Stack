using SMS.Common.Models;
using SMS.DataAccess.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMS.Service.SMSService
{
    public class StudentService : ISMSService
    {

        private readonly ISMSDataAccess _smsDataAccess;
        public StudentService(ISMSDataAccess smsDataAccess)
        {
            _smsDataAccess = smsDataAccess;
        }

        public async Task<AllStudents> GetAllStudents()
        {
            return _smsDataAccess.GetAllStudents();
        }
    }
}
