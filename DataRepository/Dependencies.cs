using DataRepository.Contract;
using DataRepository.Core;
using DataRepository.DataContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DataRepository
{
    public static class Dependencies
    {
        public static void RegisterRepository(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();

            services.AddDbContext<CCSTestContext>(options => options.UseSqlServer(configuration.GetConnectionString("CCS")));
        }
    }
}
