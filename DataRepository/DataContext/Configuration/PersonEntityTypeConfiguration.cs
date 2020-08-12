using DataRepository.DataContext.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataRepository.DataContext.Configuration
{
    public class PersonEntityTypeConfiguration : IEntityTypeConfiguration<Person>
    {
        public void Configure(EntityTypeBuilder<Person> entity)
        {
            entity.Property(e => e.BirthDate).HasColumnType("date");

            entity.Property(e => e.FirstName)
                .IsRequired()
                .HasMaxLength(128);

            entity.Property(e => e.LastName)
                .IsRequired()
                .HasMaxLength(128);
        }
    }
}
