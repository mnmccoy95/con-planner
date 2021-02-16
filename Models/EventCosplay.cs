using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace con_planner.Models
{
    public class EventCosplay
    {
        public int Id { get; set; }
        public int CosplayId { get; set; }
        public int EventId { get; set; }
        public Cosplay Cosplay { get; set; }
        public Event Event { get; set; }
    }
}
