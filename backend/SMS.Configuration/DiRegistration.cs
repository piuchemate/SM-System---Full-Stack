using Microsoft.Extensions.DependencyInjection;
using SMS.BusinessService.SMSBusinessService;
using SMS.DataAccess.Repositories;
using SMS.Service.SMSService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SMS.Configuration
{
    public static class DiRegistration
    {
        public static void RegisterDiAppServices(this IServiceCollection services)
        {
            services.AddScoped<ISMSBusinessService, SMSBusinessService>();
            services.AddScoped<ISMSService, StudentService>();
            services.AddScoped<ISMSDataAccess, SMSDataAccess>();
        }
    }
}