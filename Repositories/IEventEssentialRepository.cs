using con_planner.Models;

namespace con_planner.Repositories
{
    public interface IEventEssentialRepository
    {
        void Add(EventEssential eventEssential);
        void Delete(int eventEssentialId);
        EventEssential GetById(int eventEssentialId);
    }
}