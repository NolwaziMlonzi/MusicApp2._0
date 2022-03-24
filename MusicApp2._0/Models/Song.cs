using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace musicapp2._0.Models
{
    public class Song
    {
        public int Id { get; set; }
        public string Title { get; set; }
        [DisplayName("Artist")]
        [ForeignKey("Artist")]
        public int? ArtistId { get; set; }
        public int Year { get; set; }
        public string Writer { get; set; }
        [DisplayName("Genre")]
        [ForeignKey("Genre")]
        public int? GenreId { get; set; }
        public virtual Genre Genre { get; set; }
        public virtual Artist Artist { get; set; }
        public virtual Album Album { get; set; }
        [ForeignKey("Album")]
        public int? AlbumId { get; set; }
    }
}
