using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace con_planner.Models
{
    public class Essential
    {
        public int Id { get; set; }
        public string Character { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
