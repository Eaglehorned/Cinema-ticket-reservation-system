CREATE TABLE [dbo].[Sessions]
(
	[SessionId] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
    [CinemaRoomId] INT NOT NULL FOREIGN KEY REFERENCES [dbo].[CinemaRooms]([CinemaRoomId]), 
    [FilmId] INT NOT NULL FOREIGN KEY REFERENCES [dbo].[Films]([FilmId]), 
    [BeginTime] DATETIME NOT NULL ,
)
