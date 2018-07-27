﻿CREATE TABLE [dbo].[Users]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
    [Email] NVARCHAR(100) NOT NULL UNIQUE, 
    [Password] NVARCHAR(100) NOT NULL, 
    [FirstName] NVARCHAR(50) NOT NULL, 
    [LastName] NVARCHAR(50) NOT NULL, 
    [Role] NVARCHAR(10) NOT NULL, 
    [UserName] NVARCHAR(50) NOT NULL UNIQUE,
)
