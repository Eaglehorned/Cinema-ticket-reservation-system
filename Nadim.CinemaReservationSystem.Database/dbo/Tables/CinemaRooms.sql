CREATE TABLE [dbo].[CinemaRooms]
(
	[CinemaRoomId] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
    [CinemaId] INT NOT NULL FOREIGN KEY REFERENCES [dbo].[Cinemas]([CinemaId]), 
    [Name] NVARCHAR(50) NOT NULL, 
	CONSTRAINT [uq_CinemaRoomInCinema] UNIQUE ([CinemaId],[Name]),
)
