CREATE TABLE IF NOT EXISTS `to_do_items` (
      `id` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
      `item_name` VARCHAR(255) NOT NULL,
      `completed` TINYINT DEFAULT 0,
      `deleted` TINYINT DEFAULT 0,
      `date` DATE NOT NULL
    );