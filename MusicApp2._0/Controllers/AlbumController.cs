using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using musicapp2._0.Models.GenericHelperModels;
using MusicApp2._0.Data;
using MusicApp2._0.Models;
using MusicApp2._0.WebService;
using Newtonsoft.Json;

namespace MusicApp2._0.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlbumController : ControllerBase
    {
        private readonly AlbumService service;
        public AlbumController(MusicDbContext context)
        {
            service = new(context);
        }

        // GET: api/Album
        [HttpGet]
        public Models.GenericHelperModels.AlbumHelperModel GetAlbums()
        {
            try
            {
                return service.GetAlbums();
            }
            catch (Exception ex)
            {
                throw new(ex.Message.ToString());
            }
        }

        // GET: api/Album/5
        [HttpGet("{id}")]
        public ActionResult<Album> GetAlbum(int id)
        {
            try
            {
                var album = service.GetAlbum(id);

                if (album == null)
                {
                    return NotFound();
                }

                return album;
            }
            catch (Exception ex)
            {
                throw new(ex.Message.ToString());
            }

        }

        // PUT: api/Album/5
        [HttpPut("{id}")]
        public IActionResult PutAlbum(int id, Album album)
        {
            if (id != album.AlbumId)
            {
                return BadRequest();
            }



            try
            {
                service.UpdateAlbum(album);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlbumExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(album);
        }

        // POST: api/Album
        [HttpPost]
        public ActionResult<Album> PostAlbum(Album album)
        {
            try
            {
                service.SaveAlbum(album);
            }
            catch (Exception ex)
            {
                throw new(ex.Message.ToString());
            }

            return CreatedAtAction("GetAlbum", new { id = album.AlbumId }, album);
        }

        // DELETE: api/Album/5
        [HttpDelete("{id}")]
        public IActionResult DeleteAlbum(int id)
        {
            try
            {
                var album = service.GetAlbum(id);
                if (album == null)
                {
                    return NotFound();
                }
                service.DeleteAlbum(id, album);
                return Ok(id);
            }
            catch (Exception ex)
            {
                throw new(ex.Message.ToString());
            }
        }
        private bool AlbumExists(int id)
        {
            return service.CheckIFAlbumExists(id);
        }
    }
}
