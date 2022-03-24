using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MusicApp2._0.Models
{
    public class Song
    {
        public int Id { get; set; }
        public string Title { get; set; }
        [DisplayName("Artist")]
        public int ArtistId { get; set; }
        public int Year { get; set; }
        public string Writer { get; set; }
        [DisplayName("Genre")]
        public int GenreId { get; set; }
        public Genre Genre { get; set; }
        public Artist Artist { get; set; }
        public Album Album { get; set; }
        public int AlbumId { get; set; }
    }
}
