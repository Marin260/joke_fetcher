export const create_chuck_table = `
CREATE TABLE IF NOT EXISTS chuck_user (
	id				SERIAL PRIMARY KEY,
	first_name		varchar(20) NOT NULL,
	last_name		varchar(40)	NOT NULL,
	email			varchar(50)	UNIQUE NOT NULL,
	salt			varchar(256) NOT NULL,
	password        varchar(256) NOT NULL
			
);
`;
