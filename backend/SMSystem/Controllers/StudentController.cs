using Microsoft.AspNetCore.Mvc;
using SMS.BusinessService.SMSBusinessService;

namespace SMSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : Controller
    {
        private readonly ILogger<StudentController> _logger;
        private readonly ISMSBusinessService _smsBusinessService;
        public StudentController(ILogger<StudentController> logger, ISMSBusinessService smsBusinessService)
        {
            _logger = logger;
            _smsBusinessService = smsBusinessService;
        }


        [HttpGet]
        public IActionResult Index()
        {
            var resp = _smsBusinessService.GetAllStudents();
            return Ok(resp);
        }
    }
}
