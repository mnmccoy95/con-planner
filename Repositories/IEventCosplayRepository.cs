using con_planner.Models;

namespace con_planner.Repositories
{
    public interface IEventCosplayRepository
    {
        void Add(EventCosplay eventCosplay);
        void Delete(int eventCosplayId);
        EventCosplay GetById(int eventCosplayId);
    }
}