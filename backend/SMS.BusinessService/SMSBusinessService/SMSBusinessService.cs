using Microsoft.Extensions.Logging;
using SMS.Common.Models;
using SMS.Service.SMSService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMS.BusinessService.SMSBusinessService
{
    public class SMSBusinessService : ISMSBusinessService
    {
        private readonly ISMSService _smsService;
        private readonly ILogger<SMSBusinessService> _logger;
        public SMSBusinessService(ISMSService smsService, ILogger<SMSBusinessService> logger)
        {
            _smsService = smsService;
            _logger = logger;
        }

        public async Task<AllStudents> GetAllStudents()
        {
            return await _smsService.GetAllStudents();
        }
    }
}
