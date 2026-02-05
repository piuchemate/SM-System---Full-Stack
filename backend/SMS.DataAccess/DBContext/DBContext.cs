using Microsoft.EntityFrameworkCore;
using SMS.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMS.DataAccess.DBContext
{
    public class SMSystemDbContext : DbContext
    {
        public SMSystemDbContext(DbContextOptions<SMSystemDbContext> options)
           : base(options) { }

        public DbSet<Student> Student { get; set; } = null!;
        //public IEnumerable<Student> Student { get; set; }
    }
}
