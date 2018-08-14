SET IDENTITY_INSERT [dbo].[SeatTypes] ON 

INSERT [dbo].[SeatTypes] ([SeatTypeId], [TypeName]) VALUES (1, N'vip')
INSERT [dbo].[SeatTypes] ([SeatTypeId], [TypeName]) VALUES (2, N'default')
SET IDENTITY_INSERT [dbo].[SeatTypes] OFF
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([Id], [Email], [Password], [FirstName], [LastName], [Role], [UserName]) VALUES (1, N'1@1.com', N'356A192B7913B04C54574D18C28D46E6395428AB', N'1', N'1', N'admin', N'1')
SET IDENTITY_INSERT [dbo].[Users] OFF
