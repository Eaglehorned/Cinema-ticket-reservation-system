CREATE TABLE [dbo].[Users] (
    [Id]       TINYINT        NOT NULL,
    [Username] NVARCHAR (MAX) NULL,
    [Password] NVARCHAR (MAX) NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([Id] ASC)
);

