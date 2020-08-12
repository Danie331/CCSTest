using AutoMapper;
using DataRepository.Contract;
using DataRepository.DataContext;
using DomainModels.CCSModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Data = DataRepository.DataContext.Models;

namespace DataRepository.Core
{
    class EmployeeRepository : IEmployeeRepository
    {
        private readonly IMapper _mapper;
        private readonly CCSTestContext _testContext;
        public EmployeeRepository(CCSTestContext testContext,
                                    IMapper mapper)
        {
            _testContext = testContext;
            _mapper = mapper;
        }

        public async Task<int> AddEmployeeAsync(Employee employee)
        {
            try
            {
                var employeeDto = _mapper.Map<Data.Employee>(employee);
                var personDto = employeeDto.Person;

                _testContext.Entry(personDto).State = EntityState.Added;
                _testContext.Entry(employeeDto).State = EntityState.Added;

                await _testContext.SaveChangesAsync();

                return employeeDto.EmployeeId;
            }
            catch (Exception ex)
            {
                // Log ex
                throw;
            }
        }

        public async Task<int> DeleteEmployeeAsync(int id)
        {
            try
            {
                var record = await _testContext.Employee.FirstAsync(e => e.EmployeeId == id);
                record.TerminatedDate = DateTime.Now.Date;
                await _testContext.SaveChangesAsync();

                return record.EmployeeId;
            }
            catch (Exception ex)
            {
                // Log ex
                throw;
            }
        }

        public async Task<Employee> GetEmployeeAsync(int id)
        {
            try
            {
                var record = await _testContext.Employee.Include(x => x.Person).AsNoTracking().FirstAsync(e => e.EmployeeId == id);

                return _mapper.Map<Employee>(record);
            }
            catch (Exception ex)
            {
                // Log ex
                throw;
            }
        }

        public async Task<IEnumerable<Employee>> GetEmployeesAsync()
        {
            try
            {
                var records = await _testContext.Employee.Include(x => x.Person).AsNoTracking().ToListAsync();

                return _mapper.Map<IEnumerable<Employee>>(records);
            }
            catch (Exception ex)
            {
                // Log ex
                throw;
            }
        }

        public async Task<int> UpdateEmployeeAsync(Employee employee)
        {
            try
            {
                var employeeDto = _mapper.Map<Data.Employee>(employee);
                var employeeRecord = (await _testContext.Employee.Include(x => x.Person).FirstAsync(p => p.EmployeeId == employeeDto.EmployeeId));

                var entity = _mapper.Map(employee, employeeRecord, typeof(Employee), typeof(Data.Employee));

                _testContext.Entry(entity).State = EntityState.Modified;

                await _testContext.SaveChangesAsync();

                return employeeDto.EmployeeId;
            }
            catch (Exception ex)
            {
                // Log ex
                throw;
            }
        }
    }
}
