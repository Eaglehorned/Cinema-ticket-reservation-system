CREATE TABLE [dbo].[Cinemas]
(
	[CinemaId] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
    [City] NVARCHAR(100) NOT NULL, 
    [Name] NVARCHAR(50) NOT NULL, 
	CONSTRAINT [uq_Cinema] UNIQUE ([City],[Name]),
)
