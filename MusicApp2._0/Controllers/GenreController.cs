using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusicApp2._0.Data;
using MusicApp2._0.Models;
using MusicApp2._0.WebService;

namespace MusicApp2._0.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenreController : ControllerBase
    {
        private readonly GenreService service;
        public GenreController(MusicDbContext context)
        {
            service = new(context);
        }

        // GET: api/Genre
        [HttpGet]
        public Models.GenericHelperModels.GenreHelperModel GetGenres()
        {
            try
            {
                return service.GetGenres();
            }
            catch (Exception ex)
            {
                throw new(ex.Message.ToString());
            }
        }

        // GET: api/Genre/5
        [HttpGet("{id}")]
        public ActionResult<Genre> GetGenre(int id)
        {
            try
            {
                var genre = service.GetGenre(id);

                if (genre == null)
                {
                    return NotFound();
                }

                return genre;
            }
            catch (Exception ex)
            {
                throw new(ex.Message.ToString());
            }

        }

        // PUT: api/Genre/5
        [HttpPut("{id}")]
        public IActionResult PutGenre(int id, Genre genre)
        {
            if (id != genre.GenreId)
            {
                return BadRequest();
            }



            try
            {
                service.UpdateGenre(genre);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GenreExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(genre);
        }

        // POST: api/Genre
        [HttpPost]
        public ActionResult<Genre> PostGenre(Genre genre)
        {
            try
            {
                service.SaveGenre(genre);
            }
            catch (Exception ex)
            {
                throw new(ex.Message.ToString());
            }

            return CreatedAtAction("GetGenre", new { id = genre.GenreId }, genre);
        }

        // DELETE: api/Genre/5
        [HttpDelete("{id}")]
        public IActionResult DeleteGenre(int id)
        {
            try
            {
                var genre = service.GetGenre(id);
                if (genre == null)
                {
                    return NotFound();
                }
                service.DeleteGenre(id, genre);
                return Ok(id);
            }
            catch (Exception ex)
            {
                throw new(ex.Message.ToString());
            }
        }
        private bool GenreExists(int id)
        {
            return service.CheckIFGenreExists(id);
        }
    }
}
