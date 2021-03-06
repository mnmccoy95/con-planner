﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace con_planner.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirebaseUserId { get; set; }
        public string Email { get; set; }
        public List<Cosplay> Cosplays { get; set; }
        public List<Event> Events { get; set; }
        public List<Essential> Essentials { get; set; }
    }
}
