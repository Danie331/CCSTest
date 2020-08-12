/*
 Pre-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be executed before the build script.	
 Use SQLCMD syntax to include a file in the pre-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the pre-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/

create database CCSTest
GO

use [CCSTest]
GO

create table dbo.Person
(
	PersonId int primary key identity(1,1),
	LastName nvarchar(128) not null,
	FirstName nvarchar(128) not null,
	BirthDate date not null
)
GO

create table dbo.Employee
(
	EmployeeId int primary key identity(1,1),
	PersonId int not null,
	constraint FK_Employee_Person foreign key (PersonId) references dbo.Person(PersonId),
	EmployeeNum nvarchar(16) not null,
	EmployedDate date not null,
	TerminatedDate date null
)
GO