using Microsoft.EntityFrameworkCore;
using MusicApp2._0.Data;
using MusicApp2._0.Interfaces;
using MusicApp2._0.Models.GenericHelperModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MusicApp2._0.Models;

namespace MusicApp2._0.WebService
{
    public class GenreService : IGenre
    {
        private readonly MusicDbContext db;
        public GenreService(MusicDbContext context)
        {
            db = context;
        }
        public GenreHelperModel GetGenres()
        {
            GenreHelperModel allGenres = new GenreHelperModel
            {
                GenreList = db.Genre.ToList()
            };
            return allGenres;
        }
        public Genre GetGenre(int id)
        {
            Genre genre = db.Genre.Find(id);
            return genre;
        }
        public void UpdateGenre(Genre genre)
        {
            db.Entry(genre).State = EntityState.Modified;
            db.SaveChanges();
        }
        public void SaveGenre(Genre genre)
        {
            db.Genre.Add(genre);
            db.SaveChanges();
        }
        public void DeleteGenre(int id, Genre genre)
        {
            db.Genre.Remove(genre);
            db.SaveChanges();
        }
        public bool CheckIFGenreExists(int id)
        {
            return db.Genre.Any(e => e.GenreId == id);
        }
    }
}
