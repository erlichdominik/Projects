using PokemonApp.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PokemonApp.Models.DTOs;

namespace PokemonApp.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        public DbSet<PokemonFavourite> PokemonFavourites { get; set; }
        public DbSet<PokemonStat> PokemonStats { get; set; }
        public DbSet<PokemonAbility> PokemonAbilities { get; set; }
        public DbSet<TestClass> TestClasses { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<TestClass>(opt =>
            {
                opt.HasKey(t => t.Id);
                opt.Property(t => t.Id).ValueGeneratedOnAdd();
                opt.Property(t => t.Value).IsRequired();
            });

            builder.Entity<PokemonFavourite>(opt =>
            {
                opt.HasKey(p => p.Id);
                opt.Property(p => p.Id).IsRequired().ValueGeneratedOnAdd();
                opt.Property(p => p.Height).IsRequired();
                opt.Property(p => p.Height).IsRequired();
                opt.Property(p => p.Name).IsRequired();
                opt.Property(p => p.Weight).IsRequired();
                opt.Property(p => p.Sprite).IsRequired().HasMaxLength(100);
                opt.HasMany(p => p.PokemonAbilities).WithOne(pa => pa.Pokemon).HasForeignKey(p => p.PokemonFavouriteId);
                opt.HasMany(p => p.PokemonStats).WithOne(ps => ps.Pokemon).HasForeignKey(p => p.PokemonFavouriteId);

            });

            builder.Entity<PokemonStat>(opt =>
            {
                opt.HasKey(p => p.Id);
                opt.Property(p => p.Id).ValueGeneratedOnAdd().IsRequired();

                opt.Property(p => p.Name).IsRequired().HasMaxLength(50);
                opt.Property(p => p.Value).IsRequired().HasMaxLength(50);
                //opt.Property(p => p.Pokemon).IsRequired();
                //opt.HasOne(p => p.Pokemon).WithMany(pf => pf.PokemonStats).HasForeignKey(p => p.PokemonFavouriteId);
            });

            builder.Entity<PokemonAbility>(opt =>
            {
                opt.HasKey(p => p.Id);
                opt.Property(p => p.Id).ValueGeneratedOnAdd().IsRequired();

                opt.Property(p => p.Name).IsRequired().HasMaxLength(50);
                //opt.HasOne(p => p.Pokemon).WithMany(pf => pf.PokemonAbilities).HasForeignKey(p => p.PokemonFavouriteId);
            });
        }
    }
}
