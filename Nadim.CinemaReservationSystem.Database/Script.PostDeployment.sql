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
SET IDENTITY_INSERT [dbo].[Sessions] ON

INSERT [dbo].[Sessions] ([SessionId], [CinemaRoomId], [FilmId], [BeginTime]) VALUES (1, 1, 1, '2018-08-29T17:00:00')
INSERT [dbo].[Sessions] ([SessionId], [CinemaRoomId], [FilmId], [BeginTime]) VALUES (2, 1, 1, '2018-08-31T17:00:00')
SET IDENTITY_INSERT [dbo].[Sessions] OFF
SET IDENTITY_INSERT [dbo].[SessionSeatTypePrices] ON

INSERT [dbo].[SessionSeatTypePrices] ([SessionSeatTypePriceId], [SessionId], [SeatTypeId], [Price]) VALUES(1, 1, 1, 5)
INSERT [dbo].[SessionSeatTypePrices] ([SessionSeatTypePriceId], [SessionId], [SeatTypeId], [Price]) VALUES(2, 1, 2, 3)
INSERT [dbo].[SessionSeatTypePrices] ([SessionSeatTypePriceId], [SessionId], [SeatTypeId], [Price]) VALUES(3, 2, 1, 4)
INSERT [dbo].[SessionSeatTypePrices] ([SessionSeatTypePriceId], [SessionId], [SeatTypeId], [Price]) VALUES(4, 2, 2, 2)
SET IDENTITY_INSERT [dbo].[SessionSeatTypePrices] OFF
SET IDENTITY_INSERT [dbo].[SessionSeats]  ON

INSERT [dbo].[SessionSeats] ([SessionSeatId], [SessionId], [SeatId], [Booked], [LastTimeUpdated], [OrderId]) VALUES(1, 1, 1, 0, '2018-08-22T14:43:02', NULL)
INSERT [dbo].[SessionSeats] ([SessionSeatId], [SessionId], [SeatId], [Booked], [LastTimeUpdated], [OrderId]) VALUES(2, 1, 2, 0, '2018-08-22T14:43:02', NULL)
INSERT [dbo].[SessionSeats] ([SessionSeatId], [SessionId], [SeatId], [Booked], [LastTimeUpdated], [OrderId]) VALUES(3, 1, 3, 0, '2018-08-22T14:43:02', NULL)
INSERT [dbo].[SessionSeats] ([SessionSeatId], [SessionId], [SeatId], [Booked], [LastTimeUpdated], [OrderId]) VALUES(4, 1, 4, 0, '2018-08-22T14:43:02', NULL)
INSERT [dbo].[SessionSeats] ([SessionSeatId], [SessionId], [SeatId], [Booked], [LastTimeUpdated], [OrderId]) VALUES(5, 2, 1, 0, '2018-08-22T14:43:02', NULL)
INSERT [dbo].[SessionSeats] ([SessionSeatId], [SessionId], [SeatId], [Booked], [LastTimeUpdated], [OrderId]) VALUES(6, 2, 2, 0, '2018-08-22T14:43:02', NULL)
INSERT [dbo].[SessionSeats] ([SessionSeatId], [SessionId], [SeatId], [Booked], [LastTimeUpdated], [OrderId]) VALUES(7, 2, 3, 0, '2018-08-22T14:43:02', NULL)
INSERT [dbo].[SessionSeats] ([SessionSeatId], [SessionId], [SeatId], [Booked], [LastTimeUpdated], [OrderId]) VALUES(8, 2, 4, 0, '2018-08-22T14:43:02', NULL)
SET IDENTITY_INSERT [dbo].[SessionSeats]  OFF