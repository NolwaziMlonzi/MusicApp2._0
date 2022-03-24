using Microsoft.AspNetCore.Mvc;
using MusicApp2._0.Models;
using MusicApp2._0.Models.GenericHelperModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicApp2._0.Interfaces
{
    interface ISong
    {
        SongHelperModel GetSongs();
        Song GetSong(int id);
        void UpdateSong(Song artist);
        void SaveSong(Song artist);
        void DeleteSong(int id, Song artist);
        bool CheckIFSongExists(int id);
    }
}
