using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using musicapp2._0.Models;
using MusicApp2._0.Controllers;
using MusicApp2._0.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicApp2._0.Controllers.Tests
{
    [TestClass()]
    public class ArtistControllerTests
    {
        [TestMethod()]
        public void GetArtistsTest()
        { 
            // Arrange
            var mockRepo = new Mock<MusicDbContext>();
            mockRepo.Setup(repo => repo.Artists).Returns((Microsoft.EntityFrameworkCore.DbSet<Models.Artist>)Multiple());
            var controller = new ArtistController(mockRepo.Object);

            // Act
            var result = controller.GetArtists();

            // Assert
            var model = Assert.<IEnumerable<Artist>>(result);
            Assert.Equal(3, result.Count());
        }

        private static IEnumerable<Artist> Multiple()
        {
            var r = new List<Artist>();
            r.Add(new Artist()
            {
                ArtistId = 1,
                Name = "Miley Cyrus"
            });
            r.Add(new Artist()
            {
                ArtistId = 2,
                Name = "Madonna"
            });
            r.Add(new Artist()
            {
                ArtistId = 3,
                Name = "Katty Perry"
            });
            return r;
        }
    }
}