using DomainModels.CCSModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace InternalServices.Contract
{
    public interface IEmployeeService
    {
        Task<Employee> CreateEmployeeAsync(Employee employee);
        Task<Employee> GetEmployeeAsync(int employeeId);
        Task<Employee> UpdateEmployeeAsync(Employee employee);
        Task<Employee> DeleteEmployeeAsync(int employeeId);
        Task<IEnumerable<Employee>> GetEmployeesAsync();
    }
}
