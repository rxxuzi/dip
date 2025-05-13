-- データベースの作成
CREATE DATABASE dip CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- ユーザーが存在しない場合は作成し、権限を付与
CREATE USER IF NOT EXISTS 'user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON dip.* TO 'user'@'localhost';
FLUSH PRIVILEGES;