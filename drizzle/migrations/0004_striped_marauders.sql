CREATE TYPE "public"."brand_type_status" AS ENUM('active', 'inactive', 'archived', 'deleted');--> statement-breakpoint
CREATE TABLE "brand_types" (
	"brand_type_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(50) NOT NULL,
	"name" varchar(50) NOT NULL,
	"status" "brand_type_status" NOT NULL,
	"description" text,
	"metadata" json,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "brand_types_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "brands_to_brand_types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"brand_id" uuid NOT NULL,
	"brand_type_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "brands_to_brand_types" ADD CONSTRAINT "brands_to_brand_types_brand_id_brands_brand_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("brand_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "brands_to_brand_types" ADD CONSTRAINT "brands_to_brand_types_brand_type_id_brand_types_brand_type_id_fk" FOREIGN KEY ("brand_type_id") REFERENCES "public"."brand_types"("brand_type_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_brand_types_search" ON "brand_types" USING bm25 (brand_type_id, slug, name, status, description, metadata, created_at, updated_at) WITH (key_field='brand_type_id');--> statement-breakpoint
CREATE INDEX "idx_brands_to_brand_types_search" ON "brands_to_brand_types" USING bm25 (id, brand_id, brand_type_id) WITH (key_field='id');