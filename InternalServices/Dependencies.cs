using InternalServices.Contract;
using InternalServices.Core;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace InternalServices
{
    public static class Dependencies
    {
        public static void RegisterServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IEmployeeService, EmployeeService>();

            DataRepository.Dependencies.RegisterRepository(services, configuration);
        }
    }
}
