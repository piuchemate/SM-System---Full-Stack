using SMS.Common.Models;
using SMS.DataAccess.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMS.Service.SMSService
{
    public class SMSService : ISMSService
    {
        private readonly ISMSDataAccess _smsDataAccess;
        public SMSService(ISMSDataAccess smsDataAccess)
        {
            _smsDataAccess = smsDataAccess;
        }

        public Task<AllStudents> GetAllStudents()
        {
            throw new NotImplementedException();
        }
    }
}
