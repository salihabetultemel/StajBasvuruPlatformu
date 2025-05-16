import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import knowledgeBase from '../../../../lib/chat/knowledgeBase.json';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Örnek benzerlik fonksiyonu (embedding kullanılmadan basit eşleşme için)
function keywordMatch(input: string, item: any): number {
  const question = input.toLowerCase();
  const haystack = `${item.question} ${item.answer} ${item.topic ?? ''}`.toLowerCase();
  return haystack.includes(question) ? 1 : 0.5;
}

// En ilgili 5 bilgi parçasını seç
function getTopRelevantItems(input: string, count: number = 5) {
  const scored = knowledgeBase.map(item => ({
    ...item,
    score: keywordMatch(input, item),
  }));
  return scored
    .filter(i => i.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
}

export async function POST(req: Request) {
  const userInput = await req.text();

  if (!userInput || userInput.trim().length < 2) {
    return NextResponse.json({ reply: 'Lütfen daha açıklayıcı bir soru sorun.' }, { status: 400 });
  }

  // En alakalı verileri al
  const relevantItems = getTopRelevantItems(userInput);
  const context = relevantItems.map((item, index) => {
    return `Bilgi ${index + 1} - Kaynak: ${item.source}\n${item.question ? `Soru: ${item.question}\nCevap: ${item.answer}` : item.text}\n`;
  }).join('\n');

  const chatCompletion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `Sen Balıkesir Üniversitesi Bilgisayar Mühendisliği öğrencilerine staj süreçleri hakkında yardımcı olan bir danışmansın. Cevaplarını sadece aşağıdaki bilgiler ışığında ver. Bilgi dışında yorum yapma. Bilgi net değilse "bölüm staj sayfasını inceleyin" de.\n\n${context}`,
      },
      {
        role: 'user',
        content: userInput,
      },
    ],
    temperature: 0.3,
  });

  const reply = chatCompletion.choices[0]?.message?.content ?? 'Cevap üretilemedi.';
  return NextResponse.json({ reply });
}

export async function GET() {
  return NextResponse.json({ message: 'Chat API çalışıyor.' });
}
