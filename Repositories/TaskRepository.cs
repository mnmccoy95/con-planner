using con_planner.Data;
using con_planner.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace con_planner.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private ApplicationDbContext _context;

        public TaskRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Models.Task GetTaskById(int taskId)
        {
            return _context.Tasks.FirstOrDefault(c => c.Id == taskId);
        }

        public void Add(Models.Task task)
        {
            _context.Add(task);
            _context.SaveChanges();
        }

        public void Update(Models.Task task)
        {
            _context.Entry(task).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int taskId)
        {
            var task = GetTaskById(taskId);

            _context.Tasks.Remove(task);
            _context.SaveChanges();
        }
    }
}
