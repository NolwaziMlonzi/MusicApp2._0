using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MusicApp2._0.Models
{
    public class Artist
    {
        public int ArtistId { get; set; }

        [Required(ErrorMessage = "Name field is required.")]
        public string Name { get; set; }

        public static explicit operator Artist(ValueTask<Artist> v)
        {
            throw new NotImplementedException();
        }
        //public List<Album> Albums { get; set; }
    }
}
