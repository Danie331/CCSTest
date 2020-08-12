using DataRepository.DataContext.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataRepository.DataContext.Configuration
{
    public class EmployeeEntityTypeConfiguration : IEntityTypeConfiguration<Employee>
    {
        public void Configure(EntityTypeBuilder<Employee> entity)
        {
            entity.Property(e => e.EmployedDate).HasColumnType("date");

            entity.Property(e => e.EmployeeNum)
                .IsRequired()
                .HasMaxLength(16);

            entity.Property(e => e.TerminatedDate).HasColumnType("date");

            entity.HasOne(d => d.Person)
                .WithMany(p => p.Employee)
                .HasForeignKey(d => d.PersonId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Employee_Person");
        }
    }
}
