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
    public class ArtistController : ControllerBase
    {
        private readonly ArtistService service;
        public ArtistController(MusicDbContext context)
        {
            service = new(context);
        }

        // GET: api/Artist
        [HttpGet]
        public async Task<Models.GenericHelperModels.ArtistHelperModel> GetArtists()
        {
            try
            {
                return await service.GetArtists();
            }
            catch(Exception ex)
            {
                throw new (ex.Message.ToString());
            }
        }

        // GET: api/Artist/5
        [HttpGet("{id}")]
        public ActionResult<Artist> GetArtist(int id)
        {
            try
            {
                var artist = service.GetArtist(id);

                if (artist == null)
                {
                    return NotFound();
                }

                return artist;
            }
            catch (Exception ex)
            {
                throw new(ex.Message.ToString());
            }

        }

        // PUT: api/Artist/5
        [HttpPut("{id}")]
        public IActionResult PutArtist(int id, Artist artist)
        {
            if (id != artist.ArtistId)
            {
                return BadRequest();
            }

            

            try
            {
                 service.UpdateArtist(artist);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArtistExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(artist);
        }

        // POST: api/Artist
        [HttpPost]
        public ActionResult<Artist> PostArtist(Artist artist)
        {
            try
            {
                service.SaveArtist(artist);
            }
            catch (Exception ex)
            {
                throw new(ex.Message.ToString());
            }

            return CreatedAtAction("GetArtist", new { id = artist.ArtistId }, artist);
        }

        // DELETE: api/Artist/5
        [HttpDelete("{id}")]
        public IActionResult DeleteArtist(int id)
        {
            try
            {
                var artist = service.GetArtist(id);
                if (artist == null)
                {
                    return NotFound();
                }
                service.DeleteArtist(id, artist);
                return Ok(id);
            }
            catch (Exception ex)
            {
                throw new(ex.Message.ToString());
            }          
        }
        private bool ArtistExists(int id)
        {
            return service.CheckIFArtistExists(id);
        }
    }
}
