CREATE TABLE [dbo].[Tickets]
(
	[TicketId] INT NOT NULL PRIMARY KEY, 
    [UserId] INT FOREIGN KEY REFERENCES [dbo].[Users]([UserId]) NOT NULL, 
    [SessionSeatId] INT FOREIGN KEY REFERENCES [dbo].[SessionSeats]([SessionSeatId]) NOT NULL
)
