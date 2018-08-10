CREATE TABLE [dbo].[Films]
(
	[FilmId] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
    [Name] NVARCHAR(50) NOT NULL UNIQUE, 
    [StartDate] DATETIME NOT NULL, 
    [EndDate] DATETIME NOT NULL, 
    [Duration] INT NOT NULL, 
    [Description] NVARCHAR(200) NOT NULL,
)
