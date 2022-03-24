using MusicApp2._0.Models;
using MusicApp2._0.Models.GenericHelperModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicApp2._0.Interfaces
{
    interface IGenre
    {
        GenreHelperModel GetGenres();
        Genre GetGenre(int id);
        void UpdateGenre(Genre genre);
        void SaveGenre(Genre genre);
        void DeleteGenre(int id, Genre genre);
        bool CheckIFGenreExists(int id);
    }
}
