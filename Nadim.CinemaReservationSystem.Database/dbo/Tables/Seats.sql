CREATE TABLE [dbo].[Seats]
(
	[SeatId] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
    [Row] INT NOT NULL, 
    [Column] INT NOT NULL, 
    [SeatTypeId] INT NOT NULL FOREIGN KEY REFERENCES [dbo].[SeatTypes]([SeatTypeId]), 
    [CinemaRoomId] INT NOT NULL FOREIGN KEY REFERENCES [dbo].[CinemaRooms]([CinemaRoomId]) 
)
