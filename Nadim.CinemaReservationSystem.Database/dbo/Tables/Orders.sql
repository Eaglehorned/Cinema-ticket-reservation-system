CREATE TABLE [dbo].[Orders]
(
	[OrderId] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
    [UserId] INT FOREIGN KEY REFERENCES [dbo].[Users]([UserId]) NOT NULL 
)
