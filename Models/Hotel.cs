using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace con_planner.Models
{
    public class Hotel
    {
        public int Id { get; set; }
        public decimal Cost { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public int Zip { get; set; }
        public bool? Purchased { get; set; }
        public int EventId { get; set; }
        public int People { get; set; }
        public Event Event { get; set; }
    }
}
