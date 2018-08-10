CREATE TABLE [dbo].[SessionSeatTypePrices]
(
	[SessionSeatTypePriceId] INT NOT NULL PRIMARY KEY, 
    [SessionId] INT NOT NULL FOREIGN KEY REFERENCES [dbo].[Sessions]([SessionId]), 
    [SeatTypeId] INT NOT NULL FOREIGN KEY REFERENCES [dbo].[SeatTypes]([SeatTypeId]),
    [Price] INT NOT NULL
)
