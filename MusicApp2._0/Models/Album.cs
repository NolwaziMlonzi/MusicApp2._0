
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace musicapp2._0.Models
{
    public class Album
    {
        public int AlbumId { get; set; }
        [DisplayName("Genre")]
        [ForeignKey("Genre")]
        public int? GenreId { get; set; }
        [DisplayName("Artist")]
        [ForeignKey("Artist")]
        public int? ArtistId { get; set; }

        [Required(ErrorMessage = "Album Title field is required.")]
        public string Title { get; set; }
        public decimal Price { get; set; }
        public  Genre Genre { get; set; }
        public Artist Artist { get; set; }

    }
}
