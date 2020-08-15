using DataRepository.Contract;
using DomainModels.CCSModels;
using InternalServices.Contract;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InternalServices.Core
{
    class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public async Task<Employee> CreateEmployeeAsync(Employee employee)
        {
            var id = await _employeeRepository.AddEmployeeAsync(employee);
            return await _employeeRepository.GetEmployeeAsync(id);
        }

        public async Task<Employee> DeleteEmployeeAsync(int employeeId)
        {
            var id = await _employeeRepository.DeleteEmployeeAsync(employeeId);
            return await _employeeRepository.GetEmployeeAsync(id);
        }

        public Task<Employee> GetEmployeeAsync(int employeeId)
        {
            return _employeeRepository.GetEmployeeAsync(employeeId);
        }

        public Task<IEnumerable<Employee>> GetEmployeesAsync()
        {
            return _employeeRepository.GetEmployeesAsync();
        }

        public async Task<Employee> UpdateEmployeeAsync(Employee employee)
        {
            var id = await _employeeRepository.UpdateEmployeeAsync(employee);
            return await _employeeRepository.GetEmployeeAsync(id);
        }
    }
}
