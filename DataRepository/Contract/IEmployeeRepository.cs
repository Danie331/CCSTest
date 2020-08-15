using DomainModels.CCSModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataRepository.Contract
{
    public interface IEmployeeRepository
    {
        Task<int> AddEmployeeAsync(Employee employee);
        Task<int> UpdateEmployeeAsync(Employee employee);
        Task<int> DeleteEmployeeAsync(int id);
        Task<IEnumerable<Employee>> GetEmployeesAsync();
        Task<Employee> GetEmployeeAsync(int id);
    }
}
