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
    public class AlbumService : IAlbum
    {
        private readonly MusicDbContext db;
        public AlbumService(MusicDbContext context)
        {
            db = context;
        }
        public AlbumHelperModel GetAlbums()
        {
            AlbumHelperModel allAlbums = new AlbumHelperModel
            {
                AlbumsList = db.Album.Include("Artist").Include("Genre").ToList()
            };
            return allAlbums;
        }
        public Album GetAlbum(int id)
        {
            Album album = db.Album.Find(id);
            return album;
        }
        public void UpdateAlbum(Album album)
        {
            db.Entry(album).State = EntityState.Modified;
            db.SaveChanges();
        }
        public void SaveAlbum(Album album)
        {
            db.Album.Add(album);
            db.SaveChanges();
        }
        public void DeleteAlbum(int id, Album album)
        {
            db.Album.Remove(album);
            db.SaveChanges();
        }
        public bool CheckIFAlbumExists(int id)
        {
            return db.Album.Any(e => e.AlbumId == id);
        }
    }
}
