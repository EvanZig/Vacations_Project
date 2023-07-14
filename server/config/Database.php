<?php

class Database
{
    public $connection;

    public function __construct()
    {
        $dsn = "mysql:host=localhost;port=3306;dbname=epignosis_db;charset=utf8mb4";
        $username = "root";
        $password = "123456";
        try {
            $this->connection = new PDO($dsn, $username, $password);
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
    public function query($query, $parameters = array())
    {
        $statement = $this->connection->prepare($query);
        $statement->execute($parameters);

        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }
}

$db = new Database();

$users = $db->query("SELECT * from users");

// foreach ($users as $user) {
//     echo "<li>" . $user['role'] . "</li>";
// }