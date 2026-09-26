import sqlite3
DB_NAME="stocksense.db"
def get_connection():
    return sqlite3.connect(DB_NAME)
def create_tables():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sku TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            category TEXT,
            quantity INTEGER DEFAULT 0,
            min_stock INTEGER DEFAULT 0,
            price REAL DEFAULT 0
        )
    """)

    conn.commit()
    conn.close()


if __name__ == "__main__":
    create_tables()
    print("Database and tables created successfully.")

