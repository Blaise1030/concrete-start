CREATE TABLE `oauth_table` (
	`id` text PRIMARY KEY NOT NULL,
	`provider_id` text,
	`provider_user_id` text,
	`user_id` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
