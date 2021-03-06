using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using con_planner.Models;

namespace con_planner.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Cosplay> Cosplays { get; set; }
        public DbSet<Budget> Budgets { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Essential> Essentials { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<EventEssential> EventEssentials { get; set; }
        public DbSet<EventCosplay> EventCosplays { get; set; }
        public DbSet<Hotel> Hotels { get; set; }
    }
}