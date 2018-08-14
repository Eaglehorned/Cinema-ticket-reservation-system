CREATE TABLE [dbo].[SessionSeats]
(
	[SessionSeatId] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[SessionId] INT NOT NULL FOREIGN KEY REFERENCES [dbo].[Sessions]([SessionId]),
	[SeatId] INT NOT NULL FOREIGN KEY REFERENCES [dbo].[Seats]([SeatId]), 
    [Booked] BIT NOT NULL,

)
