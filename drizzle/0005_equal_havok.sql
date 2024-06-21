ALTER TABLE `user` ADD `created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL;--> statement-breakpoint
ALTER TABLE `verificationToken` ADD `created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL;