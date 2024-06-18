ALTER TABLE `user` ADD `totpSecret` text;--> statement-breakpoint
ALTER TABLE `user` ADD `isTotpEnabled` integer DEFAULT false NOT NULL;