using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using Microsoft.EntityFrameworkCore;
using MusicApp2._0.Models;
using MusicApp2._0.Models.GenericHelperModels;

namespace MusicApp2._0.Interfaces
{
    interface IAlbum
    {
        AlbumHelperModel GetAlbums();
        Album GetAlbum(int id);
        void UpdateAlbum(Album album);
        void SaveAlbum(Album album);
        void DeleteAlbum(int id, Album album);
        bool CheckIFAlbumExists(int id);
    }
}
