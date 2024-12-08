-- CreateEnum
CREATE TYPE "TransactionCard" AS ENUM ('NUBANK', 'NUBANK_PJ', 'BANCO_DO_BRASIL', 'PICPAY', 'MERCADO_PAGO');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "paymentCard" "TransactionCard";
