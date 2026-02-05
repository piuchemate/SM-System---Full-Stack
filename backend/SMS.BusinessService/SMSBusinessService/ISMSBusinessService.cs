using SMS.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMS.BusinessService.SMSBusinessService
{
    public interface ISMSBusinessService
    {
        public Task<AllStudents> GetAllStudents();
    }
}
