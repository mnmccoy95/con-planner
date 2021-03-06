CREATE TABLE Hotels (
[Id] int IDENTITY(1,1) NOT NULL,
[Cost] DECIMAL(19,2),
[Address] NVARCHAR(555),
[City] NVARCHAR(555),
[State] NVARCHAR(2),
[Zip] NVARCHAR(5),
[Purchased] BIT,
[EventId] int,
[People] int,
PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Hotels_Events] FOREIGN KEY ([EventId]) REFERENCES [dbo].[Events] ([Id])
)