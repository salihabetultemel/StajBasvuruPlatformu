import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

const HF_API_URL = "https://api-inference.huggingface.co/models/impira/layoutlm-document-qa";
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY!;

// 👇 Yeni Type tanımı
type FAQItem = {
  question: string;
  answer: string;
  tags?: string[];
};

export async function POST(req: Request) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 saniyelik timeout

  try {
    const userMessage = await req.text();
    const filePath = path.join(process.cwd(), 'lib', 'chat', 'chat_knowledge_full.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const faqData = JSON.parse(fileContent);

    const normalizedMessage = userMessage.toLowerCase();

    // 👇 Burada tip cast yapıyoruz
    const matchedItem = (faqData as FAQItem[]).find((item) => {
      const questionMatch = item.question.toLowerCase().includes(normalizedMessage);
      const tagMatch = item.tags?.some((tag) =>
        normalizedMessage.includes(tag.toLowerCase())
      );
      return questionMatch || tagMatch;
    });

    const fallbackText =
      'Bu konuda elimde bilgi bulunmuyor. Danışman hocanıza veya mfstaj@balikesir.edu.tr adresine danışabilirsiniz.';

    const baseAnswer = matchedItem ? matchedItem.answer : fallbackText;

    // Hugging Face prompt'u oluştur
    const prompt = `Aşağıdaki cevabı daha doğal, yardımsever ve samimi bir sohbet diliyle açıkla:\n\nCevap: ${baseAnswer}\n\nYeni Cevap:`;

    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
      signal: controller.signal, // Timeout sinyali
    });

    clearTimeout(timeoutId); // Timeout işlemini temizle

    if (!response.ok) throw new Error("Hugging Face API yanıt vermedi");

    const result = await response.json();
    const generatedText =
      result?.[0]?.generated_text?.split("Yeni Cevap:")[1]?.trim() || baseAnswer;

    return NextResponse.json({ reply: generatedText });
  } catch {
    console.error("Chat API error"); // artık catch içinde error parametresi vermiyoruz
    return NextResponse.json(
      { reply: "Bir hata oluştu. Lütfen tekrar deneyin." },
      { status: 500 }
    );
  }
}
