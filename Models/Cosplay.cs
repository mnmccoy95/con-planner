using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace con_planner.Models
{
    public class Cosplay
    {
        public int Id { get; set; }
        public string Character { get; set; }
        public string Series { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
