CREATE TABLE [dbo].[Seats]
(
	[SeatId] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
    [Row] INT NOT NULL, 
    [Column] INT NOT NULL, 
    [Type] NVARCHAR(50) NOT NULL, 
    [Price] INT NOT NULL,
    [CinemaRoomId] INT NOT NULL FOREIGN KEY REFERENCES [dbo].[CinemaRooms]([CinemaRoomId]), 
    [booked] BIT NOT NULL,
)
