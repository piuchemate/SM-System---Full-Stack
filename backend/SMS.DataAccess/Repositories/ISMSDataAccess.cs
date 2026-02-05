using SMS.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMS.DataAccess.Repositories
{
    public interface ISMSDataAccess
    {
       public AllStudents GetAllStudents();
    }
}
