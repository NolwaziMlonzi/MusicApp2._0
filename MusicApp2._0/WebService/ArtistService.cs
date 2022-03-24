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
    public class ArtistService : IArtist
    {
        private static MusicDbContext db;
        public ArtistService(MusicDbContext context)
        {
            db = context;
        }
         public async Task<ArtistHelperModel> GetArtists()
        {
            ArtistHelperModel allArtists = new ArtistHelperModel
            {
                ArtistsList = await db.Artists.ToListAsync()
            };
            return allArtists;
        }
        public Artist GetArtist(int id)
        {
            Artist artist = db.Artists.Find(id);
            return artist;
        }
        public void UpdateArtist(Artist artist)
        {
            db.Entry(artist).State = EntityState.Modified;
            db.SaveChanges();
        }
        public void SaveArtist(Artist artist)
        {
            db.Artists.Add(artist);
            db.SaveChanges();
        }
        public void DeleteArtist(int id, Artist artist)
        {
            db.Artists.Remove(artist);
            db.SaveChanges();
        }
        public bool CheckIFArtistExists(int id)
        {
            return db.Artists.Any(e => e.ArtistId == id);
        }
    }
}
