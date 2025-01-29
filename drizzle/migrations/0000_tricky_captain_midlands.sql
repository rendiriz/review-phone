CREATE TABLE "tests" (
	"id" varchar PRIMARY KEY DEFAULT gen_ulid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "idx_tests_search" ON "tests" USING bm25 (id, name, created_at, updated_at) WITH (key_field='id');