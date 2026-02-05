using SMS.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMS.Service.SMSService
{
    public interface ISMSService
    {
        public Task<AllStudents> GetAllStudents();
    }
}
