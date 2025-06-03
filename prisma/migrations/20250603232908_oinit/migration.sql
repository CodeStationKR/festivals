-- CreateTable
CREATE TABLE "festivals" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "studentsName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "festivals_pkey" PRIMARY KEY ("id")
);
