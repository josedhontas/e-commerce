import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    // Simular validação de evento do webhook
    const event = {
      type: body.type || "checkout.session.completed",
      data: body.data || { object: {} },
    };

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;

      // Aqui você pode simular a recuperação dos itens do pedido
      const sessionWithLineItems = {
        line_items: session.line_items || [],
      };

      // ATUALIZAR PEDIDO
      await prismaClient.order.update({
        where: {
          id: session.metadata.orderId, // Certifique-se de que o ID do pedido está disponível
        },
        data: {
          status: "PAYMENT_CONFIRMED", // Atualiza o status do pedido
        },
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Erro ao processar o webhook:", error);
    return NextResponse.json({ error: "Failed to process webhook" }, { status: 400 });
  }
};

export const GET = async () => {
  // Mock data
  const mockData = {
    id: "12345",
    status: "PAYMENT_CONFIRMED",
    items: [
      { id: "item1", name: "Product 1", quantity: 2, price: 100 },
      { id: "item2", name: "Product 2", quantity: 1, price: 200 },
    ],
  }; 
 
  return NextResponse.json(mockData);
};