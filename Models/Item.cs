using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace con_planner.Models
{
    public class Item
    {
        public int Id { get; set; }
        public int CosplayId { get; set; }
        public Cosplay Cosplay { get; set; }
        public string Name { get; set; }
        public bool? Complete { get; set; }
        public bool? Making { get; set; }
        public decimal Cost { get; set; }
    }
}
