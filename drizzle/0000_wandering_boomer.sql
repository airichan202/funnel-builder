CREATE TABLE `events` (
	`id` text PRIMARY KEY NOT NULL,
	`funnel_id` text NOT NULL,
	`page_id` text,
	`visitor_id` text,
	`event_type` text NOT NULL,
	`meta` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`funnel_id`) REFERENCES `funnels`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`page_id`) REFERENCES `pages`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `funnels` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `funnels_slug_unique` ON `funnels` (`slug`);--> statement-breakpoint
CREATE TABLE `pages` (
	`id` text PRIMARY KEY NOT NULL,
	`funnel_id` text NOT NULL,
	`step_order` integer NOT NULL,
	`title` text NOT NULL,
	`json_blocks` text NOT NULL,
	`settings` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`funnel_id`) REFERENCES `funnels`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `templates` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`thumbnail` text,
	`json_blocks` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);