import os

import psycopg2
from dotenv import load_dotenv

load_dotenv()

db_config = {
    "dbname": os.getenv("POSTGRES_DB"),
    "user": os.getenv("POSTGRES_USER"),
    "password": os.getenv("POSTGRES_PASSWORD"),
    "host": os.getenv("DB_HOST", "localhost"),
    "port": os.getenv("DB_PORT", 5432),
}

def execute_sql_file(cursor, sql_file_path):
    """Reads and executes an SQL file."""
    with open(sql_file_path, "r") as sql_file:
        sql_commands = sql_file.read()
        cursor.execute(sql_commands)

def create_tables_in_order(sql_directory):
    """Executes SQL files in a specific order."""
    try:
        connection = psycopg2.connect(**db_config)  # type: ignore
        connection.autocommit = True
        cursor = connection.cursor()


        sql_files_in_order = [
            "categories.sql",
            "users.sql",
            "tasks.sql"
        ]

        for sql_file in sql_files_in_order:
            sql_file_path = os.path.join(sql_directory, sql_file)
            if os.path.exists(sql_file_path):
                print(f"Executing: {sql_file_path}")
                execute_sql_file(cursor, sql_file_path)
                print(f"Tables created successfully from {sql_file}")
            else:
                print(f"File not found: {sql_file_path}")

        cursor.close()
        connection.close()

    except (Exception, psycopg2.DatabaseError) as error:
        print(f"Error executing SQL file: {error}")

sql_directory = "db/"

create_tables_in_order(sql_directory)