using Microsoft.EntityFrameworkCore;
using MusicApp2._0.Data;
using MusicApp2._0.Interfaces;
using MusicApp2._0.Models.GenericHelperModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MusicApp2._0.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace MusicApp2._0.WebService
{
    public class SongService : ISong
    {
        private readonly MusicDbContext db;
        public SongService(MusicDbContext context)
        {
            db = context;
        }
        public SongHelperModel GetSongs()
        {
            SongHelperModel result = new();
            result.SongsList = db.Songs
                .Include("Artist")
                .Include("Genre")
                .Include("Album")
                .ToList();


            return result;
        }
        public Song GetSong(int id)
        {
            Song song = db.Songs.Find(id);
            return song;
        }
        public void UpdateSong(Song song)
        {
            db.Entry(song).State = EntityState.Modified;
            db.SaveChanges();
        }
        public void SaveSong(Song song)
        {
            db.Songs.Add(song);
            db.SaveChanges();
        }
        public void DeleteSong(int id, Song song)
        {
            db.Songs.Remove(song);
            db.SaveChanges();
        }
        public bool CheckIFSongExists(int id)
        {
            return db.Songs.Any(e => e.Id == id);
        }
    }
}
