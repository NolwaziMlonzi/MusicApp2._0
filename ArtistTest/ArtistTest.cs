using Microsoft.AspNetCore.Mvc;
using musicapp2._0.Models;
using MusicApp2._0.Controllers;
using MusicApp2._0.WebService;
using System;
using System.Collections.Generic;
using Xunit;

namespace ArtistTest
{
    public class ArtistTest
    {

        ArtistController _controller;
        ArtistService _service;

        [Fact]
        public void GetAllTest()
        {
            //Arrange
            //Act
            var result = _controller.GetArtists();
            //Assert
            Assert.IsType<OkObjectResult>(result.Result);

            var list = result.Result;

            Assert.IsType<List<Artist>>(list.Value);



            var listBooks = list.Value as List<Artist>;

            Assert.Equal(5, listBooks.Count);
        }
    }

}
