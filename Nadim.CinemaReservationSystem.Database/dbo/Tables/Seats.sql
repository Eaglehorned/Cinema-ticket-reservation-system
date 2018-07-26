CREATE TABLE [dbo].[Seats]
(
	[SeatId] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
    [Row] INT NOT NULL, 
    [Column] INT NOT NULL, 
    [Type] NVARCHAR(20) NOT NULL, 
    [Price] SMALLMONEY NOT NULL,
    [CinemaRoomId] INT NOT NULL FOREIGN KEY REFERENCES [dbo].[CinemaRooms]([CinemaRoomId]), 
    [Booked] BIT NOT NULL,
)
