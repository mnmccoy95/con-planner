using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace con_planner.Models
{
    public class Budget
    {
        public int Id { get; set; }
        public int EventId { get; set; }
        public Event Event { get; set; }
        public decimal Allowance { get; set; }
        public decimal Food { get; set; }
        public decimal Merch { get; set; }
        public decimal Travel { get; set; }
        public bool? HotelAdd { get; set; }
        public bool? BadgeAdd { get; set; }
    }
}
