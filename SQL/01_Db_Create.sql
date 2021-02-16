USE [master]

IF db_id('con-planner') IS NULL
  CREATE DATABASE [con-planner]
GO

USE [con-planner]
GO


DROP TABLE IF EXISTS [Users];
DROP TABLE IF EXISTS [Events];
DROP TABLE IF EXISTS [Cosplays];
DROP TABLE IF EXISTS [Items];
DROP TABLE IF EXISTS [Essentials];
DROP TABLE IF EXISTS [EventCosplays];
DROP TABLE IF EXISTS [EventEssentials];
DROP TABLE IF EXISTS [Budgets];
DROP TABLE IF EXISTS [Tasks];
GO

CREATE TABLE [Users] (
  [Id] integer PRIMARY KEY IDENTITY,
  [FirebaseUserId] NVARCHAR(28) NOT NULL,
  [Email] nvarchar(555) NOT NULL,

  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId),
  CONSTRAINT UQ_Email UNIQUE(Email)
)

CREATE TABLE [Events] (
	[Id] integer PRIMARY KEY IDENTITY,
	[UserId] integer NOT NULL,
	[Name] nvarchar(555) NOT NULL,
	[Address] nvarchar(555),
	[State] nvarchar(2),
	[Zip] nvarchar(5),
	[StartDate] datetime,
	[EndDate] datetime,
	[BadgeStatus] BIT,
	[BadgePrice] DECIMAL(19, 2),

	CONSTRAINT [FK_Events_Users] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
)

CREATE TABLE [Cosplays] (
	[Id] integer PRIMARY KEY IDENTITY,
	[Character] nvarchar(555) NOT NULL,
	[Series] nvarchar(555) NOT NULL,
	[UserId] integer NOT NULL,

	CONSTRAINT [FK_Cosplays_Users] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
)

CREATE TABLE [Essentials] (
	[Id] integer PRIMARY KEY IDENTITY,
	[Name] nvarchar(555) NOT NULL,
	[UserId] integer NOT NULL,

	CONSTRAINT [FK_Essentials_Users] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
)

CREATE TABLE [Items] (
	[Id] integer PRIMARY KEY IDENTITY,
	[CosplayId] integer NOT NULL,
	[Name] nvarchar(555) NOT NULL,
	[Complete] BIT,
	[Making] BIT,
	[Cost] DECIMAL(19, 2),

	CONSTRAINT [FK_Items_Cosplays] FOREIGN KEY ([CosplayId]) REFERENCES [Cosplays] ([Id])
)

CREATE TABLE [EventCosplays] (
	[Id] integer PRIMARY KEY IDENTITY,
	[EventId] integer NOT NULL,
	[CosplayId] integer NOT NULL,

	CONSTRAINT [FK_EventCosplays_Events] FOREIGN KEY ([EventId]) REFERENCES [Events] ([Id]),
	CONSTRAINT [FK_EventCosplays_Cosplays] FOREIGN KEY ([CosplayId]) REFERENCES [Cosplays] ([Id])
)

CREATE TABLE [EventEssentials] (
	[Id] integer PRIMARY KEY IDENTITY,
	[EventId] integer NOT NULL,
	[EssentialId] integer NOT NULL,

	CONSTRAINT [FK_EventEssentials_Events] FOREIGN KEY ([EventId]) REFERENCES [Events] ([Id]),
	CONSTRAINT [FK_EventEssentials_Essentials] FOREIGN KEY ([EssentialId]) REFERENCES [Essentials] ([Id])
)

CREATE TABLE [Budgets] (
	[Id] integer PRIMARY KEY IDENTITY,
	[EventId] integer NOT NULL,
	[Allowance] DECIMAL(19,2),
	[Food] DECIMAL(19,2),
	[Merch] DECIMAL(19,2),
	[Travel] DECIMAL(19,2),
	[HotelAdd] BIT,
	[PerPerson] BIT,
	[BadgeAdd] BIT,

	CONSTRAINT [FK_Budgets_Events] FOREIGN KEY ([EventId]) REFERENCES [Events]([Id])
)

CREATE TABLE [Tasks] (
	[Id] integer PRIMARY KEY IDENTITY,
	[CosplayId] integer NOT NULL,
	[Name] nvarchar(555) NOT NULL,
	[Complete] BIT,

	CONSTRAINT [FK_Tasks_Cosplays] FOREIGN KEY ([CosplayId]) REFERENCES [Cosplays]([Id])
)


GO