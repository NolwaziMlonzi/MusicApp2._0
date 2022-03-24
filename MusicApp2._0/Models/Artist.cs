using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace musicapp2._0.Models
{
    public class Artist
    {
        public int ArtistId { get; set; }

        [Required(ErrorMessage = "Name field is required.")]
        public string Name { get; set; }
         public virtual List<Album> Albums { get; set; }
    }
}
