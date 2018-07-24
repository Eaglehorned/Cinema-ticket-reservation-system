CREATE TABLE [dbo].[CinemaRooms]
(
	[CinemaRoomId] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
    [CinemaId] INT NOT NULL FOREIGN KEY REFERENCES [dbo].[Cinemas]([CinemaId]), 
    [Number] INT NOT NULL, 
)
