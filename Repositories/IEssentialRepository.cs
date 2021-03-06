using con_planner.Models;
using System.Collections.Generic;

namespace con_planner.Repositories
{
    public interface IEssentialRepository
    {
        void Add(Essential essential);
        void Delete(int essentialId);
        Essential GetByEssentialId(int essentialId);
        List<Essential> GetByUserId(int userId);
        void Update(Essential essential);
    }
}