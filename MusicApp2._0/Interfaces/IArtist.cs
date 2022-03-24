using MusicApp2._0.Models;
using MusicApp2._0.Models.GenericHelperModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicApp2._0.Interfaces
{
    interface IArtist
    {
        //static ArtistHelperModel GetArtists();
        Artist GetArtist(int id);
        void UpdateArtist(Artist artist);
        void SaveArtist(Artist artist);
        void DeleteArtist(int id, Artist artist);
        bool CheckIFArtistExists(int id);
    }
}
