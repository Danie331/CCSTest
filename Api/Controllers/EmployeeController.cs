using AutoMapper;
using InternalServices.Contract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dto = Api.ApiDto;
using Domain = DomainModels.CCSModels;
using System.Net.Mime;

namespace Api.Controllers
{
    [AllowAnonymous, Route("employees"), ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService,
                                  IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
        }

        [HttpGet, Route("{id}"), ProducesResponseType(200)]
        public async Task<ActionResult<Dto.Employee>> GetEmployee(int id)
        {
            var target = await _employeeService.GetEmployeeAsync(id);
            return Ok(_mapper.Map<Dto.Employee>(target));
        }

        [HttpGet, ProducesResponseType(200)]
        public async Task<ActionResult<List<Dto.Employee>>> GetEmployees()
        {
            var list = await _employeeService.GetEmployeesAsync();
            return Ok(_mapper.Map<List<Dto.Employee>>(list));
        }

        [HttpPost, Consumes(MediaTypeNames.Application.Json), ProducesResponseType(201)]
        public async Task<ActionResult<Dto.Employee>> AddEmployee(Dto.Employee employeeDto)
        {
            var employee = _mapper.Map<Domain.Employee>(employeeDto);
            var result = await _employeeService.CreateEmployeeAsync(employee);
            return Ok(_mapper.Map<Dto.Employee>(result));
        }

        [HttpPut, Route("{id}"), Consumes(MediaTypeNames.Application.Json), ProducesResponseType(200)]
        public async Task<ActionResult<Dto.Employee>> UpdateEmployee(Dto.Employee employeeDto)
        {
            var employee = _mapper.Map<Domain.Employee>(employeeDto);
            var result = await _employeeService.UpdateEmployeeAsync(employee);
            return Ok(_mapper.Map<Dto.Employee>(result));
        }

        [HttpDelete, Route("{id}"), Consumes(MediaTypeNames.Application.Json), ProducesResponseType(200)]
        public async Task<ActionResult<Dto.Employee>> DeleteEmployee(int id)
        {
            var result = await _employeeService.DeleteEmployeeAsync(id);
            return Ok(_mapper.Map<Dto.Employee>(result));
        }
    }
}
