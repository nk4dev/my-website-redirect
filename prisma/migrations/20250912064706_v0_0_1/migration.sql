-- CreateTable
CREATE TABLE "public"."Urls" (
    "id" TEXT NOT NULL,
    "original" TEXT NOT NULL,
    "shorter" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Urls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Urls_id_key" ON "public"."Urls"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Urls_original_key" ON "public"."Urls"("original");

-- CreateIndex
CREATE UNIQUE INDEX "Urls_shorter_key" ON "public"."Urls"("shorter");
