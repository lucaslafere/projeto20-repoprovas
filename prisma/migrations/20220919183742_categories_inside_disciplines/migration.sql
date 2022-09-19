-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "disciplinesId" INTEGER;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_disciplinesId_fkey" FOREIGN KEY ("disciplinesId") REFERENCES "disciplines"("id") ON DELETE SET NULL ON UPDATE CASCADE;
