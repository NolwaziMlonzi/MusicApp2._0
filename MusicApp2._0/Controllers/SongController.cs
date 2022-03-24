using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusicApp2._0.Data;
using MusicApp2._0.Models;
using MusicApp2._0.Models.GenericHelperModels;
using MusicApp2._0.WebService;
using Newtonsoft.Json;

namespace MusicApp2._0.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SongController : ControllerBase
    {
        private readonly SongService service;
        public SongController(MusicDbContext context)
        {
            service = new(context);
        }

        // GET: api/Song
        [HttpGet]
        public SongHelperModel GetSongs()
        {
            try
            {
                return service.GetSongs(); 
            }
            catch (Exception ex)
            {
                throw new(ex.Message.ToString());
            }
        }

        // GET: api/Song/5
        [HttpGet("{id}")]
        public ActionResult<Song> GetSong(int id)
        {
            try
            {
                var song = service.GetSong(id);

                if (song == null)
                {
                    return NotFound();
                }

                return song;
            }
            catch (Exception ex)
            {
                throw new(ex.Message.ToString());
            }

        }

        // PUT: api/Song/5
        [HttpPut("{id}")]
        public IActionResult PutSong(int id, Song song)
        {
            if (id != song.Id)
            {
                return BadRequest();
            }



            try
            {
                service.UpdateSong(song);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SongExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(song);
        }

        // POST: api/Song
        [HttpPost]
        public ActionResult<Song> PostSong(Song song)
        {
            try
            {
                service.SaveSong(song);
            }
            catch (Exception ex)
            {
                throw new(ex.Message.ToString());
            }

            return CreatedAtAction("GetSong", new { id = song.Id }, song);
        }

        // DELETE: api/Song/5
        [HttpDelete("{id}")]
        public IActionResult DeleteSong(int id)
        {
            try
            {
                var song = service.GetSong(id);
                if (song == null)
                {
                    return NotFound();
                }
                service.DeleteSong(id, song);
                return Ok(song);
            }
            catch (Exception ex)
            {
                throw new(ex.Message.ToString());
            }
        }
        private bool SongExists(int id)
        {
            return service.CheckIFSongExists(id);
        }
    }
}
