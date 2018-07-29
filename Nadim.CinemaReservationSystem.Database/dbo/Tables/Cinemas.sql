﻿CREATE TABLE [dbo].[Cinemas]
(
	[CinemaId] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
    [City] NVARCHAR(100) NOT NULL, 
    [Name] NVARCHAR(50) NOT NULL, 
    [VipSeatPrice] MONEY NULL, 
    [DefaultSeatPrice] MONEY NOT NULL
)
