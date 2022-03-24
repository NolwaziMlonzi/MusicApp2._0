using MusicApp2._0.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MusicApp2._0.Models
{
    public class Genre
    {
        public int GenreId { get; set; }

        [Required(ErrorMessage = "Genre Name field is required.")]
        public string Name { get; set; }
        public string Description { get; set; }
        public List<Album> Albums { get; set; }
    }
}
