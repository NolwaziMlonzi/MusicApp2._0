using Microsoft.EntityFrameworkCore;
using MusicApp2._0.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicApp2._0.Data
{
    public class MusicDbContext : DbContext
    {
        public MusicDbContext(DbContextOptions<MusicDbContext> options) :
            base(options)
        {

        }
        public DbSet<Album> Album { get; set; }
        public DbSet<Artist> Artists { get; set; }
        public DbSet<Genre> Genre { get; set; }
        public DbSet<Song> Songs { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
    }
}
