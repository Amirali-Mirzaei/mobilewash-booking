export async function sendTelegramMessage(message: string) {
  const config = useRuntimeConfig();

  console.log("========== TELEGRAM CONFIG ==========");
  console.log({
    hasToken: !!config.telegramBotToken,
    chatId1: config.telegramChatId1,
    chatId2: config.telegramChatId2,
  });
  console.log("=====================================");

  if (!config.telegramBotToken) {
    throw createError({
      statusCode: 500,
      statusMessage: "Telegram bot token is missing.",
    });
  }

  const chatIds = [
    config.telegramChatId1,
    config.telegramChatId2,
  ].filter((id): id is string => Boolean(id));

  if (chatIds.length === 0) {
    throw createError({
      statusCode: 500,
      statusMessage: "No Telegram chat configured.",
    });
  }

  const url = `https://api.telegram.org/bot${config.telegramBotToken}/sendMessage`;

  console.log("Telegram URL:", url);
  console.log("Chat IDs:", chatIds);
  console.log("Message:", message);

  try {
    const responses = await Promise.allSettled(
      chatIds.map((chatId) =>
        $fetch(url, {
          method: "POST",
          body: {
            chat_id: chatId,
            text: message,
            parse_mode: "HTML",
            disable_web_page_preview: true,
          },
        })
      )
    );

    console.log("Telegram responses:", responses);

    const failed = responses.find(
      (r) => r.status === "rejected"
    );

    if (failed && failed.status === "rejected") {
      throw failed.reason;
    }

  } catch (error: any) {

    console.error("========== TELEGRAM ERROR ==========");
    console.error(error);
    console.error("status:", error?.status);
    console.error("statusCode:", error?.statusCode);
    console.error("data:", error?.data);
    console.error("response:", error?.response?._data);
    console.error("===================================");

    throw createError({
      statusCode: 500,
      statusMessage: "Failed to send booking notification.",
    });
  }
}