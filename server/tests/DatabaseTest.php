<?php
use PHPUnit\Framework\TestCase;

require_once './config/Database.php';

class DatabaseTest extends TestCase
{
    private $db;

    protected function setUp(): void
    {
        // Set up a test database connection before each test
        $dsn = "mysql:host=localhost;port=3306;dbname=test_epignosis_db;charset=utf8mb4";
        $username = "root";
        $password = "123456";

        try {
            $this->db = new Database($dsn, $username, $password);
        } catch (PDOException $e) {
            $this->fail("Connection failed: " . $e->getMessage());
        }
    }

    public function testQuery()
    {
        // Insert some test data into the test database
        $this->db->query("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)", ['test person', 'test email', 'test password', 'employee']);

        // Perform the query to get the inserted data
        $result = $this->db->query("SELECT username, password,email, role FROM users WHERE username = ?", ['test person']);

        // Assert that the query result is not empty
        $this->assertNotEmpty($result);

        // Assert that the query result contains the expected data
        $expectedData = [
            [
                'username' => 'test person',
                'email' => 'test email',
                'password' => 'test password',
                'role' => 'employee',
            ],
        ];

        // Check if each row in the result is equal to the expected data
        $this->assertEquals($expectedData, $result);
    }
}