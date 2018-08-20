SET IDENTITY_INSERT [dbo].[SeatTypes] ON 

INSERT [dbo].[SeatTypes] ([SeatTypeId], [TypeName]) VALUES (1, N'vip')
INSERT [dbo].[SeatTypes] ([SeatTypeId], [TypeName]) VALUES (2, N'default')
SET IDENTITY_INSERT [dbo].[SeatTypes] OFF
SET IDENTITY_INSERT [dbo].[Cinemas] ON 

INSERT [dbo].[Cinemas] ([CinemaId], [City], [Name]) VALUES (1, N'Minsk', N'House of cinema')
SET IDENTITY_INSERT [dbo].[Cinemas] OFF
SET IDENTITY_INSERT [dbo].[CinemaRooms] ON 

INSERT [dbo].[CinemaRooms] ([CinemaRoomId], [CinemaId], [Name]) VALUES (1, 1, N'1')
SET IDENTITY_INSERT [dbo].[CinemaRooms] OFF
SET IDENTITY_INSERT [dbo].[Seats] ON 

INSERT [dbo].[Seats] ([SeatId], [Row], [Column], [SeatTypeId], [CinemaRoomId]) VALUES (1, 0, 0, 1, 1)
INSERT [dbo].[Seats] ([SeatId], [Row], [Column], [SeatTypeId], [CinemaRoomId]) VALUES (2, 0, 1, 1, 1)
INSERT [dbo].[Seats] ([SeatId], [Row], [Column], [SeatTypeId], [CinemaRoomId]) VALUES (3, 1, 0, 2, 1)
INSERT [dbo].[Seats] ([SeatId], [Row], [Column], [SeatTypeId], [CinemaRoomId]) VALUES (4, 1, 1, 2, 1)
SET IDENTITY_INSERT [dbo].[Seats] OFF
SET IDENTITY_INSERT [dbo].[Films] ON 

INSERT [dbo].[Films] ([FilmId], [Name], [StartDate], [EndDate], [Duration], [Description]) VALUES (1, N'Slender man', '2018-08-21T00:00:00', '2018-09-21T00:00:00', 5400, N'Scary movie')
SET IDENTITY_INSERT [dbo].[Films] OFF
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([UserId], [Email], [Password], [FirstName], [LastName], [Role], [UserName]) VALUES (1, N'1@1.com', N'356A192B7913B04C54574D18C28D46E6395428AB', N'1', N'1', N'admin', N'1')
INSERT [dbo].[Users] ([UserId], [Email], [Password], [FirstName], [LastName], [Role], [UserName]) VALUES (2, N'2@2.com', N'DA4B9237BACCCDF19C0760CAB7AEC4A8359010B0', N'2', N'2', N'user', N'2')
SET IDENTITY_INSERT [dbo].[Users] OFF
