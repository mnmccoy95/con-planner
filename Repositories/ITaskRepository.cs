using con_planner.Models;

namespace con_planner.Repositories
{
    public interface ITaskRepository
    {
        void Add(Task task);
        void Delete(int taskId);
        Task GetTaskById(int taskId);
        void Update(Task task);
    }
}