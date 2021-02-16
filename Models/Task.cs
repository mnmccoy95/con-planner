using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace con_planner.Models
{
    public class Task
    {
        public int Id { get; set; }
        public int CosplayId { get; set; }
        public Cosplay Cosplay { get; set; }
        public string Name { get; set; }
        public bool? Complete { get; set; }
    }
}
