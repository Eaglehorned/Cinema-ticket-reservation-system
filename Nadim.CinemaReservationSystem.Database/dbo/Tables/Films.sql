CREATE TABLE [dbo].[Films]
(
	[FilmId] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
    [Name] NVARCHAR(50) NOT NULL UNIQUE, 
    [BeginDate] DATETIME NOT NULL, 
    [EndDate] DATETIME NOT NULL, 
    [DurationSeconds] INT NOT NULL,

)
