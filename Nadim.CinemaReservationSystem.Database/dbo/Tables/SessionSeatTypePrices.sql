CREATE TABLE [dbo].[SessionSeatTypePrices]
(
	[SessionSeatTypePriceId] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
    [SessionId] INT NOT NULL FOREIGN KEY REFERENCES [dbo].[Sessions]([SessionId]), 
    [SeatTypeId] INT NOT NULL FOREIGN KEY REFERENCES [dbo].[SeatTypes]([SeatTypeId]),
    [Price] MONEY NOT NULL
	CONSTRAINT [uq_seatPrice] UNIQUE ([SessionId],[SeatTypeId]),
)
