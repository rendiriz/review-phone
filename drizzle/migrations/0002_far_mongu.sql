CREATE TYPE "public"."brand_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TABLE "brands" (
	"brand_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"country" varchar(255) NOT NULL,
	"image" text,
	"status" "brand_status" NOT NULL,
	"description" text,
	"metadata" json,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "brands_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE INDEX "idx_brands_search" ON "brands" USING bm25 (brand_id, slug, name, country, image, status, description, metadata, created_at, updated_at) WITH (key_field='brand_id');